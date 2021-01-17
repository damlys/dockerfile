# Development

```console
$ npm install
$ npm run build
$ npm run format
$ npm run lint
$ npm run test

$ alias dockerfile="node $(pwd)/src-cjs/bin/dockerfile.js"
```

## Versioning

```console
$ npm \
  --no-git-tag-version \
  version [major|minor|patch|...]
```

## Distribution

```console
$ npm publish
```

## Automation

This project uses GitHub Actions.

Workflow requires `NPM_TOKEN` secret.

See [.github/workflows/cd.yaml](../.github/workflows/cd.yaml)
file.
