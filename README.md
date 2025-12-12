# Suwayomi-converter

an image converter designed to work with [Suwayomi-server](https://github.com/Suwayomi/Suwayomi-Server)'s server.downloadConversions and server.serveConversions settings

it is built using [sharp](https://www.npmjs.com/package/sharp) and allows all of the default build [conversions](https://sharp.pixelplumbing.com/api-output/) and [resizing](https://sharp.pixelplumbing.com/api-resize/)

## Example:

to convert all images to webp with preset=drawing, effort=6, resize to a max width of 1080 and max height of 16383 (the webp maximum), and using the [defaults](https://sharp.pixelplumbing.com/api-output/#webp) for all other options

```toml
server.downloadConversions = {
    "default"={
        target="http://localhost:5678/?out=webp&format=(\"preset\":\"drawing\",\"effort\":6,\"quality\":90)&resize=(\"width\":1080,\"height\":16383,\"withoutEnlargement\":true,\"fit\":\"inside\")"
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
