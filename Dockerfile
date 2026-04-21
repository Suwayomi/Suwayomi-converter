# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1.3.11 AS base
WORKDIR /usr/src/app

FROM base AS install
RUN sed -i 's/Types: deb/Types: deb deb-src/' /etc/apt/sources.list.d/debian.sources \
    && apt-get update \
    && apt-get build-dep -y vips \
    && apt-get install -y --no-install-recommends curl ca-certificates

# build libvips
RUN curl -fsSL 'https://github.com/libvips/libvips/releases/download/v8.17.3/vips-8.17.3.tar.xz' -o vips.tar.xz \
    && tar xf vips.tar.xz \
    && cd vips-8.17.3 \
    && meson setup build --prefix /usr/local --buildtype=release \
    && cd build \
    && meson compile \
    && meson install \
    && ldconfig

# install dependencies into temp directory
RUN mkdir -p /temp/dev /temp/prod
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile
RUN cd /temp/dev/node_modules/sharp && bun run build
# install with --production (exclude devDependencies)
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production
RUN cd /temp/prod/node_modules/sharp && bun run build

FROM base AS runtime-base
RUN apt-get update && apt-get install -y --no-install-recommends libvips && rm -rf /var/lib/apt/lists/*
COPY --from=install /usr/local/lib /usr/local/lib
COPY --from=install /usr/local/bin/vips /usr/local/bin/vips
RUN ldconfig

FROM runtime-base AS prerelease
# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# [optional] tests & build
ENV NODE_ENV=production

# copy production dependencies and source code into final image
FROM runtime-base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/index.ts .
COPY --from=prerelease /usr/src/app/src ./src
COPY --from=prerelease /usr/src/app/package.json .

# run the app
USER bun
EXPOSE 5678/tcp
ENTRYPOINT [ "bun", "run", "index.ts" ]
