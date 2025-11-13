# Suwayomi-converter

an image converter designed to work with [Suwayomi-server](https://github.com/Suwayomi/Suwayomi-Server)'s server.downloadConversions and server.serveConversions settings

it is built using [sharp](https://www.npmjs.com/package/sharp) and allows all of the default build [conversions](https://sharp.pixelplumbing.com/api-output/) and [resizing](https://sharp.pixelplumbing.com/api-resize/)

## Example:

to convert all images to webp with preset=drawing, effort=6 and resize to a max width of 1080, and using the [defaults](https://sharp.pixelplumbing.com/api-output/#webp) for all other options

```toml
server.downloadConversions = {
    "default"={
        target="http://192.168.1.131:3001/?out=webp&format=(\"preset\":\"drawing\",\"effort\":6)&resize=(\"width\":1080,\"withoutEnlargement\":true)"
    }
}
```

## Devs:

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.3.0. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
