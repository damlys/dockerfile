# Development

```console
$ npm install
$ npm run format
$ npm run build
$ npm run lint
$ npm run test

$ alias dockerfile="$(pwd)/src-cjs/bin/dockerfile.js"
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

See [.github/workflows/ci.yaml](../.github/workflows/ci.yaml)
file.
