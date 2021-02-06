# Development

```console
$ npm install
$ npm run build
$ npm run format
$ npm run lint
$ npm run test

$ alias dockerfile="node $(pwd)/dist/bin/main.js"
```

## Versioning

Bump `MINOR` version:

```console
$ npm version preminor --ignore-scripts --git-tag-version=false
```

Bump `MAJOR` version:

```console
$ npm version premajor --ignore-scripts --git-tag-version=false
```

## Distribution

```console
$ npm publish
```

## Automation

This project uses GitHub Actions.

Workflow requires `NPM_TOKEN` secret.

See [.github/workflows/continuous-delivery.yaml](../.github/workflows/continuous-delivery.yaml)
file.
