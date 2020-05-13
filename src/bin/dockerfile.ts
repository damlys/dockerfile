#!/usr/bin/env node

import "process";
import path from "path";
import { compose, image, name, tag, PackageJsonInterface } from "..";

const help: string = `This tool parses package.json file and returns useful data
for the official Docker commands.

Usage: dockerfile [command] [workdir=.]

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

Important note: "workdir" parameter doesn't affect Docker Compose context.
`;

function getVersion(): string {
  try {
    const { version } = require("../../package.json"); // eslint-disable-line
    return version || "UNKNOWN";
  } catch {
    return "UNKNOWN";
  }
}

function getWorkingDirectory(): string {
  const workingDirectory: string = process.argv[3] || ".";
  if (path.isAbsolute(workingDirectory)) {
    return workingDirectory;
  }
  return path.join(process.cwd(), workingDirectory);
}

/**
 * @throws Error
 */
function getPackageJson(): PackageJsonInterface {
  const packageJsonPath: string = path.join(getWorkingDirectory(), "package.json");
  try {
    const packageJsonDto: PackageJsonInterface = require(packageJsonPath); // eslint-disable-line
    if (typeof packageJsonDto === "object" && packageJsonDto !== null) {
      return packageJsonDto;
    }
  } catch {
    // eslint-disable-line no-empty
  }
  throw new Error(`Cannot load "${packageJsonPath}" file.`);
}

async function main(): Promise<void> {
  try {
    switch (process.argv[2]) {
      case "compose":
      case "c":
        process.stdout.write(JSON.stringify(compose(getPackageJson()), null, 2));
        process.exit(0);
        return;
      case "image":
      case "i":
        process.stdout.write(image(getPackageJson()));
        process.exit(0);
        return;
      case "name":
      case "n":
        process.stdout.write(name(getPackageJson()));
        process.exit(0);
        return;
      case "tag":
      case "t":
        process.stdout.write(tag(getPackageJson()));
        process.exit(0);
        return;
      case "--version":
      case "-v":
        process.stderr.write(`dockerfile v${getVersion()}\n`);
        process.exit(0);
        return;
      case "--help":
      case "-h":
      case "":
      case undefined:
        process.stderr.write(help);
        process.exit(0);
        return;
      default:
        process.stderr.write(
          `Command "${process.argv[2]}" does not exist. Use one of: "compose", "image", "name", "tag" or "--help".\n`
        );
        process.exit(127);
        return;
    }
  } catch (error) {
    process.stderr.write(`Something went wrong!\n${error.toString()}\n`);
    process.exit(1);
  }
}

main();
