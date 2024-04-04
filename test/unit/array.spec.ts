import { moveUp, moveDown, remove } from "../../utils/array";
import { test, expect, describe } from "vitest";

describe("moveUp", () => {
  test("should move the element at the given index up by one position", () => {
    const array = [1, 2, 3, 4, 5];
    const index = 2;

    moveUp(array, index);

    expect(array).toEqual([1, 3, 2, 4, 5]);
  });

  test("should not modify the array if the element is already in the first position", () => {
    const array = [1, 2, 3, 4, 5];
    const index = 0;

    moveUp(array, index);

    expect(array).toEqual([1, 2, 3, 4, 5]);
  });

  test("should handle empty arrays", () => {
    const array: unknown[] = [];
    const index = 0;

    moveUp(array, index);

    expect(array).toEqual([]);
  });

  test("should handle arrays with a single element", () => {
    const array = [1];
    const index = 0;

    moveUp(array, index);

    expect(array).toEqual([1]);
  });
});

describe("moveDown", () => {
  test("should move the element at the given index down by one position", () => {
    const array = [1, 2, 3, 4, 5];
    const index = 2;

    moveDown(array, index);

    expect(array).toEqual([1, 2, 4, 3, 5]);
  });

  test("should not modify the array if the element is already at the last position", () => {
    const array = [1, 2, 3, 4, 5];
    const index = 4;

    moveDown(array, index);

    expect(array).toEqual([1, 2, 3, 4, 5]);
  });

  test("should handle empty arrays", () => {
    const array: unknown[] = [];
    const index = 0;

    moveDown(array, index);

    expect(array).toEqual([]);
  });

  test("should handle arrays with a single element", () => {
    const array = [1];
    const index = 0;

    moveDown(array, index);

    expect(array).toEqual([1]);
  });
});

describe("remove", () => {
  test("should remove the element at the given index from the array", () => {
    const array = [1, 2, 3, 4, 5];
    const index = 2;

    remove(array, index);

    expect(array).toEqual([1, 2, 4, 5]);
  });

  test("should not modify the array if the index is out of range", () => {
    const array = [1, 2, 3, 4, 5];
    const index = 10;

    remove(array, index);

    expect(array).toEqual([1, 2, 3, 4, 5]);
  });

  test("should handle empty arrays", () => {
    const array: unknown[] = [];
    const index = 0;

    remove(array, index);

    expect(array).toEqual([]);
  });

  test("should handle arrays with a single element", () => {
    const array = [1];
    const index = 0;

    remove(array, index);

    expect(array).toEqual([]);
  });
});
