import { PackageJsonInterface } from "./PackageJsonInterface";
import { image } from "./image";

/**
 * Returns Docker Compose v3.8 manifest.
 *
 * https://docs.docker.com/compose/compose-file/
 *
 * @throws Error
 */
export function compose(packageJsonDto: PackageJsonInterface): object {
  if (packageJsonDto.dockerfile === undefined) {
    packageJsonDto.dockerfile = {};
  }
  if (typeof packageJsonDto.dockerfile.build === "string") {
    packageJsonDto.dockerfile.build = {
      context: packageJsonDto.dockerfile.build,
    };
  }
  if (packageJsonDto.dockerfile.build === undefined) {
    packageJsonDto.dockerfile.build = {};
  }
  const buildDto: any = packageJsonDto.dockerfile.build;
  if (buildDto.context === undefined) {
    buildDto.context = ".";
  }
  if (buildDto.dockerfile === undefined) {
    buildDto.dockerfile = "Dockerfile";
  }
  if (buildDto.args === undefined) {
    buildDto.args = {};
  }

  if (buildDto.args instanceof Array) {
    buildDto.args.push(`PACKAGE_NAME=${packageJsonDto.name}`);
    buildDto.args.push(`PACKAGE_VERSION=${packageJsonDto.version}`);
  } else {
    buildDto.args.PACKAGE_NAME = packageJsonDto.name;
    buildDto.args.PACKAGE_VERSION = packageJsonDto.version;
  }

  return {
    version: "3.8",
    services: {
      service0: {
        image: image(packageJsonDto),
        build: buildDto,
      },
    },
  };
}
