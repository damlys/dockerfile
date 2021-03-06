import "jest";
import * as index from "../src";

test("should export public API parts", (): void => {
  expect(index).toHaveProperty("compose");
  expect(index).toHaveProperty("image");
  expect(index).toHaveProperty("name");
  expect(index).toHaveProperty("tag");
});
