Get the Docker image name:

```console
$ dockerfile image
your/super-app:1.0.0
```

Get the Docker Compose manifest:

```console
$ dockerfile compose
{
  "version": "3.8",
  "services": {
    "service0": {
      "image": "your/super-app:1.0.0",
      "build": {
        "context": ".",
        "dockerfile": "Dockerfile",
        "args": [
          "PACKAGE_NAME=@your/super-app",
          "PACKAGE_VERSION=1.0.0",
          "YOUR_SECRET_TOKEN"
        ]
      }
    }
  }
}
```

How to use the Docker Compose manifest:

```console
$ export YOUR_SECRET_TOKEN="Secret123"
$ dockerfile compose | docker-compose --file - config
services:
  service0:
    build:
      args:
        PACKAGE_NAME: '@your/super-app'
        PACKAGE_VERSION: 1.0.0
        YOUR_SECRET_TOKEN: Secret123
      context: /home/damlys/workspace/dockerfile/docs/example
      dockerfile: Dockerfile
    image: your/super-app:1.0.0
version: '3.8'
```
