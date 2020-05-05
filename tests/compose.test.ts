import "jest";
import { compose, PackageJsonInterface } from "../src";

test("should parse package without custom config", (): void => {
  const packageJsonDto: PackageJsonInterface = {
    name: "@foo/bar",
    version: "1.0.0",
  };
  const dockerComposeDto: object = {
    version: "3.7",
    services: {
      service0: {
        image: "foo/bar:1.0.0",
        build: {
          context: ".",
          dockerfile: "Dockerfile",
          args: {
            PACKAGE_NAME: "@foo/bar",
            PACKAGE_VERSION: "1.0.0",
          },
        },
      },
    },
  };

  expect(compose(packageJsonDto)).toEqual(dockerComposeDto);
});

test("should throw error if package name/version is undefined/invalid", (): void => {
  // This test case is covered by usage of "image" function, so it's fine
  // to have just one assertion here.

  const packageJsonDto: PackageJsonInterface = {
    version: "1.0.0",
  };

  expect((): object => compose(packageJsonDto)).toThrow(Error);
});

test("should parse package with build context path as config", (): void => {
  const packageJsonDto: PackageJsonInterface = {
    name: "@foo/bar",
    version: "1.0.0",
    dockerfile: {
      build: "foo/bar/baz",
    },
  };
  const dockerComposeDto: object = {
    version: "3.7",
    services: {
      service0: {
        image: "foo/bar:1.0.0",
        build: {
          context: "foo/bar/baz",
          dockerfile: "Dockerfile",
          args: {
            PACKAGE_NAME: "@foo/bar",
            PACKAGE_VERSION: "1.0.0",
          },
        },
      },
    },
  };

  expect(compose(packageJsonDto)).toEqual(dockerComposeDto);
});

test("should parse package with custom config", (): void => {
  const packageJsonDto1: PackageJsonInterface = {
    name: "@foo/bar",
    version: "1.0.0",
    dockerfile: {
      build: {
        args: {
          FOO: "bar",
        },
      },
    },
  };
  const dockerComposeDto1: object = {
    version: "3.7",
    services: {
      service0: {
        image: "foo/bar:1.0.0",
        build: {
          context: ".",
          dockerfile: "Dockerfile",
          args: {
            FOO: "bar",
            PACKAGE_NAME: "@foo/bar",
            PACKAGE_VERSION: "1.0.0",
          },
        },
      },
    },
  };
  const packageJsonDto2: PackageJsonInterface = {
    name: "@foo/bar",
    version: "1.0.0",
    dockerfile: {
      imageName: "registry.foo.tld:5000/bar",
      build: {
        args: ["FOO=bar", "BAZ"],
      },
    },
  };
  const dockerComposeDto2: object = {
    version: "3.7",
    services: {
      service0: {
        image: "registry.foo.tld:5000/bar:1.0.0",
        build: {
          context: ".",
          dockerfile: "Dockerfile",
          args: ["FOO=bar", "BAZ", "PACKAGE_NAME=@foo/bar", "PACKAGE_VERSION=1.0.0"],
        },
      },
    },
  };

  expect(compose(packageJsonDto1)).toEqual(dockerComposeDto1);
  expect(compose(packageJsonDto2)).toEqual(dockerComposeDto2);
});
