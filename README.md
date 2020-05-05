# `dockerfile`

Using Node.js and NPM to develop a software and Docker
to deliver it somewhere as image?

Have tons of `docker-compose.*.yml` files, scripts,
hacks and still don't know how to manage `Dockerfile`
simply and properly?

Use this tool and Keep It Simple Stupid :-)

```console
$ cat package.json
{
  "name": "@damlys/dockerfile",
  "version": "0.0.0"
}

$ dockerfile image
damlys/dockerfile:0.0.0

$ dockerfile compose
{
  "version": "3.7",
  "services": {
    "service0": {
      "image": "damlys/dockerfile:0.0.0",
      "build": {
        "context": ".",
        "dockerfile": "Dockerfile",
        "args": {
          "PACKAGE_NAME": "@damlys/dockerfile",
          "PACKAGE_VERSION": "0.0.0"
        }
      }
    }
  }
}
```

Btw. full example is [here](https://github.com/damlys/dockerfile/tree/master/docs/example).

## Getting started

How to get, configure and use the `dockerfile` tool.

### Requirements

Node.js and NPM are required to install
and use the package:

```console
$ node
$ npm
```

To build a Docker image you'll also need a working
Docker Engine and following commands:

```console
$ docker
$ docker-compose
```

### Installation

Install it globally:

```console
$ npm install --global @damlys/dockerfile
$ dockerfile version
```

Install it in a project (preferred):

```console
$ npm install --save-dev @damlys/dockerfile
$ ./node_modules/.bin/dockerfile version
```

### Configuration

The `dockerfile` tool can be configured with
a `package.json` file. See the example
and descriptions:

```json
{
  "name": "@some-scope/some-app",
  "version": "1.0.0",
  "dockerfile": {
    "build": {
      "args": ["FOO=bar", "BAZ"]
    },
    "imageName": "registry.some.tld:5000/some-app"
  }
}
```

#### .dockerfile.build

Same as Docker Compose `v3.7`.
See [official specification](https://docs.docker.com/compose/compose-file/#build).

This package adds `PACKAGE_NAME` and `PACKAGE_VERSION`
arguments (`.dockerfile.build.args`) on it's own,
so remember to not use them in a `package.json` file!

#### .dockerfile.imageName

Overrides default image name, which is generated from
the package name.

This option is useful when:

- package scope doesn't match Docker Hub username,
- images are stored out of Docker Hub,
- package name has no scope,
- you know better.

### Usage

This package can be used "as code" as well as within
a command line.

#### Command line

```console
$ dockerfile help
This tool parses package.json file (from the current directory)
and returns useful data for official Docker commands.

Usage: dockerfile [command]

Commands:
image, i      Displays Docker image name. Try it with the "docker" command:
              $ docker image build --tag "$(dockerfile image)" .
              $ docker image inspect "$(dockerfile image)"
              $ docker image push "$(dockerfile image)"
compose, c    Displays Docker Compose manifest. Try it with the "docker-compose" command:
              $ dockerfile compose | docker-compose --file - config
              $ dockerfile compose | docker-compose --file - build
              $ dockerfile compose | docker-compose --file - push
help, h       Displays the help of this tool (you are reading it now)
version, v    Displays the version of this tool
```

Try to start with the following scripts
in your `package.json` file:

```json
{
  "scripts": {
    "dockerfile:build": "dockerfile compose | docker-compose --file - build",
    "dockerfile:publish": "dockerfile compose | docker-compose --file - push"
  }
}
```

#### Code

```typescript
import { compose, image } from "@damlys/dockerfile";

const packageDto: object = require("./package.json");
const imageName: string = image(packageDto);
const composeDto: object = compose(packageDto);
```

## Issues

Found a bug? No way! If you are really sure
it's not a feature, then write about that
[here](https://github.com/damlys/dockerfile/issues).