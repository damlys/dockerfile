import "jest";
import { image, name, tag, PackageJsonInterface } from "../src";

test("should return Docker metadata", (): void => {
  const packageJsonDto1: PackageJsonInterface = {
    name: "@foo/bar",
    version: "1.0.0",
  };
  const packageJsonDto2: PackageJsonInterface = {
    name: "@bar/baz",
    version: "0.1.0",
  };

  expect(image(packageJsonDto1)).toBe("foo/bar:1.0.0");
  expect(name(packageJsonDto1)).toBe("foo/bar");
  expect(tag(packageJsonDto1)).toBe("1.0.0");

  expect(image(packageJsonDto2)).toBe("bar/baz:0.1.0");
  expect(name(packageJsonDto2)).toBe("bar/baz");
  expect(tag(packageJsonDto2)).toBe("0.1.0");
});

test("should use custom Docker image name", (): void => {
  const packageJsonDto1: PackageJsonInterface = {
    name: "@foo/bar",
    version: "1.0.0",
    dockerfile: {
      imageName: "registry.foo.tld:5000/bar",
    },
  };
  const packageJsonDto2: PackageJsonInterface = {
    name: "@foo/bar",
    version: "2.0.0",
    dockerfile: {
      imageName: "registry.foo.tld:6000/bar/baz",
    },
  };

  expect(image(packageJsonDto1)).toBe("registry.foo.tld:5000/bar:1.0.0");
  expect(name(packageJsonDto1)).toBe("registry.foo.tld:5000/bar");

  expect(image(packageJsonDto2)).toBe("registry.foo.tld:6000/bar/baz:2.0.0");
  expect(name(packageJsonDto2)).toBe("registry.foo.tld:6000/bar/baz");
});

test("should throw error if package name/version is undefined/invalid", (): void => {
  const packageJsonDto1: PackageJsonInterface = {
    version: "1.0.0",
  };
  const packageJsonDto2: PackageJsonInterface = {
    name: "@foo/bar",
  };
  const packageJsonDto3: PackageJsonInterface = {
    name: "foo",
    version: "1.0.0",
  };

  expect((): string => image(packageJsonDto1)).toThrow(new Error("Package name is not defined."));
  expect((): string => name(packageJsonDto1)).toThrow(new Error("Package name is not defined."));

  expect((): string => image(packageJsonDto2)).toThrow(new Error("Package version is not defined."));
  expect((): string => tag(packageJsonDto2)).toThrow(new Error("Package version is not defined."));

  expect((): string => image(packageJsonDto3)).toThrow(new Error("Package name has no scope."));
  expect((): string => name(packageJsonDto3)).toThrow(new Error("Package name has no scope."));
});
