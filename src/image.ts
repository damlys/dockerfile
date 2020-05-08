import { PackageJsonInterface } from "./PackageJsonInterface";

/**
 * Returns Docker image name without a tag.
 *
 * @throws Error
 */
export function name(packageJsonDto: PackageJsonInterface): string {
  if (packageJsonDto.dockerfile && typeof packageJsonDto.dockerfile.imageName === "string") {
    return packageJsonDto.dockerfile.imageName;
  }

  if (typeof packageJsonDto.name !== "string" || packageJsonDto.name === "") {
    throw new Error("Package name is not defined.");
  }
  if (!packageJsonDto.name.startsWith("@")) {
    throw new Error("Package name has no scope.");
  }
  return packageJsonDto.name.substring(1);
}

/**
 * Returns Docker image tag.
 *
 * @throws Error
 */
export function tag(packageJsonDto: PackageJsonInterface): string {
  if (typeof packageJsonDto.version !== "string" || packageJsonDto.version === "") {
    throw new Error("Package version is not defined.");
  }
  return packageJsonDto.version;
}

/**
 * Returns Docker image name.
 *
 * @throws Error
 */
export function image(packageJsonDto: PackageJsonInterface): string {
  return `${name(packageJsonDto)}:${tag(packageJsonDto)}`;
}
