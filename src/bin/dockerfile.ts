#!/usr/bin/env node

import path from "path";
import { compose, image, name, tag, PackageJsonInterface } from "..";

const help: string = `This tool parses package.json file (from the current working directory)
and returns useful data for the official Docker commands.

Usage: dockerfile [command]

Commands:
compose, c      Displays Docker Compose v3.7 manifest. Example usage:
                $ dockerfile compose | docker-compose --file - config
                $ dockerfile compose | docker-compose --file - build
                $ dockerfile compose | docker-compose --file - push
image, i        Displays Docker image name. Example usage:
                $ docker image build --tag "$(dockerfile image)" .
                $ docker image inspect "$(dockerfile image)"
                $ docker image push "$(dockerfile image)"
name, n         Displays Docker image name without a tag. Example usage:
                $ docker image tag "$(dockerfile image)" "$(dockerfile name):latest"
tag, t          Displays version from the package.json file. Example usage:
                $ docker image tag "$(dockerfile image)" "127.0.0.1:5000/foo/bar:$(dockerfile tag)"
--help, -h      Displays the help of this tool (you are reading it now)
--version, -v   Displays the version of this tool

Tips:
- Use "cd" command to change the current working directory.
`;

function getVersion(): string {
  try {
    const { version } = require("../../package.json"); // eslint-disable-line
    return version;
  } catch {
    return "UNKNOWN";
  }
}

/**
 * @throws Error
 */
function getPackageJson(): PackageJsonInterface {
  const packageJsonPath: string = path.join(process.cwd(), "package.json");
  try {
    const packageJsonDto: PackageJsonInterface = require(packageJsonPath); // eslint-disable-line
    if (typeof packageJsonDto === "object" && packageJsonDto !== null) {
      return packageJsonDto;
    }
  } catch {} // eslint-disable-line no-empty
  throw new Error(`Cannot load "${packageJsonPath}" file.`);
}

async function main(): Promise<void> {
  try {
    switch (process.argv[2]) {
      case "compose":
      case "c":
        process.stdout.write(JSON.stringify(compose(getPackageJson()), null, 2));
        process.exit(0);
        break;
      case "image":
      case "i":
        process.stdout.write(image(getPackageJson()));
        process.exit(0);
        break;
      case "name":
      case "n":
        process.stdout.write(name(getPackageJson()));
        process.exit(0);
        break;
      case "tag":
      case "t":
        process.stdout.write(tag(getPackageJson()));
        process.exit(0);
        break;
      case "--version":
      case "-v":
        process.stdout.write(`dockerfile v${getVersion()}\n`);
        process.exit(0);
        break;
      case "--help":
      case "-h":
      case "":
      case undefined:
        process.stdout.write(help);
        process.exit(0);
        break;
      default:
        process.stdout.write(
          `Command "${process.argv[2]}" does not exist. Use one of: "compose", "image", "name", "tag" or "--help".\n`
        );
        process.exit(127);
        break;
    }
  } catch (error) {
    process.stderr.write(`Something went wrong!\n${error.toString()}\n`);
    process.exit(1);
  }
}

main();
