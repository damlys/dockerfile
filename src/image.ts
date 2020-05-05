import { PackageJsonInterface } from "./PackageJsonInterface";

/**
 * Returns Docker image name.
 *
 * @throws Error
 */
export function image(packageJsonDto: PackageJsonInterface): string {
  if (typeof packageJsonDto.version !== "string" || packageJsonDto.version === "") {
    throw new Error("Package version is not defined.");
  }

  if (packageJsonDto.dockerfile && typeof packageJsonDto.dockerfile.imageName === "string") {
    return `${packageJsonDto.dockerfile.imageName}:${packageJsonDto.version}`;
  }

  if (typeof packageJsonDto.name !== "string" || packageJsonDto.name === "") {
    throw new Error("Package name is not defined.");
  }
  if (!packageJsonDto.name.startsWith("@")) {
    throw new Error("Package name has no scope.");
  }
  return `${packageJsonDto.name.substring(1)}:${packageJsonDto.version}`;
}
