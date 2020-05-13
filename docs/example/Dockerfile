# It's recommended to use something more specific than a latest tag
FROM node:latest
ENV NODE_ENV="production"

# Yup. Used nowhere
ARG YOUR_SECRET_TOKEN

# Is's just an example of how a Node.js application can be added to a Docker image.
# Yes, that example will work, if a package is published to a registry. Maybe it's
# also the simplest way to build an image in such case
#
# Builiding Docker images can be tricky, remember about the cache!
ARG PACKAGE_NAME
ARG PACKAGE_VERSION
RUN npm install --global "${PACKAGE_NAME}:${PACKAGE_VERSION}"

# Bin file declared in the package.json
ENTRYPOINT ["super-app"]
# Default command when running a container
CMD ["--help"]
