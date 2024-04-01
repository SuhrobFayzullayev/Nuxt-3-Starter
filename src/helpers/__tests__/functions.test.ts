import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  beautifyPhoneNumber,
  formatDate,
  formatPhoneNumber,
  formatPrice,
  getIdFromSlug,
  getUid,
  isNullish,
  isObject,
  parseJSON,
  stripTags,
  wait,
} from "../functions";

describe("formatDate", () => {
  it("should format the date with default separator", () => {
    expect(formatDate(new Date(2023, 4, 1))).toBe("01.05.2023");
    expect(formatDate("2023-04-01")).toBe("01.04.2023");
    expect(formatDate(1671782400000)).toBe("23.12.2022");
    expect(formatDate()).toMatch(/^\d{2}.\d{2}.\d{4}$/);
  });

  it("should format the date with custom separators", () => {
    expect(formatDate(new Date(2023, 4, 1), "/")).toBe("05/01/2023");
    expect(formatDate("2023-04-01", "-")).toBe("2023-04-01");
  });
});

describe("formatPrice", () => {
  it("should format the price with the specified parameters", () => {
    expect(formatPrice(1234.5678, 2, 3, ",", ".")).toBe("1,234.57");
    expect(formatPrice(987654.321, 0, 3, ",", ".")).toBe("987,654");
    expect(formatPrice(9999.99, 2, 2, ",", ".")).toBe("99,99.99");
    expect(formatPrice(12345.6789, 3, 4, ",", "")).toBe("1,2345.679");
  });

  it("should handle missing or invalid parameters", () => {
    expect(formatPrice(1234.5678)).toBe("1,234.57");
    expect(formatPrice(1234.5678, -2, 3, ",", ".")).toBe("1,235");
    expect(formatPrice(1234.5678, 2, -3, ",", ".")).toBe("1234.57");
    expect(formatPrice(1234.5678, 2, 3)).toBe("1,234.57");
    expect(formatPrice(1234.5678, 2, 3, "", ".")).toBe("1,234.57");
  });
});

describe("getIdFromSlug", () => {
  it("should return the last segment of the slug as the ID", () => {
    expect(getIdFromSlug("example-slug-123")).toBe("123");
    expect(getIdFromSlug("another-example-slug-456")).toBe("456");
  });

  it("should handle slugs without hyphens", () => {
    expect(getIdFromSlug("slug")).toBe("slug");
    expect(getIdFromSlug("single-123")).toBe("123");
  });

  it("should handle empty slug", () => {
    expect(getIdFromSlug("")).toBe("");
  });
});

describe("getUid", () => {
  it("should generate a unique ID with default prefix", () => {
    const id = getUid();
    expect(id).toMatch(/^\w+$/);
  });

  it("should generate a unique ID with custom prefix", () => {
    const prefix = "user";
    const id = getUid(prefix);
    expect(id).toMatch(/^user-\w+$/);
  });
});

describe("isObject", () => {
  it("should return true", () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ key: "value" })).toBe(true);
    expect(isObject(new Date())).toBe(true);
    expect(isObject(/regex/)).toBe(true);
  });

  it("should return false", () => {
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
    expect(isObject(42)).toBe(false);
    expect(isObject("string")).toBe(false);
    expect(isObject(true)).toBe(false);
    expect(isObject(Symbol("description"))).toBe(false);
    expect(isObject([])).toBe(false);
    expect(isObject(() => {})).toBe(false);
  });
});

describe("isNullish", () => {
  it("should return true for nullish values", () => {
    expect(isNullish(null)).toBe(true);
    expect(isNullish(undefined)).toBe(true);
    expect(isNullish(false)).toBe(true);
  });

  it("should return false for non-nullish values", () => {
    expect(isNullish(true)).toBe(false);
    expect(isNullish(0)).toBe(false);
    expect(isNullish("")).toBe(false);
    expect(isNullish([])).toBe(false);
    expect(isNullish({})).toBe(false);
  });
});

describe("phoneNumber", () => {
  describe("formatPhoneNumber", () => {
    it("should remove non-digit characters from the phone number", () => {
      expect(formatPhoneNumber("+1 (123) 456-7890")).toBe("11234567890");
      expect(formatPhoneNumber("(555)-123-4567")).toBe("5551234567");
      expect(formatPhoneNumber("123-456-7890")).toBe("1234567890");
      expect(formatPhoneNumber("1 800 123 4567")).toBe("18001234567");
    });

    it("should handle empty or non-string input", () => {
      expect(formatPhoneNumber("")).toBe("");
    });
  });

  describe("beautifyPhoneNumber", () => {
    it("should format the phone number with the expected pattern", () => {
      expect(beautifyPhoneNumber("998991112233")).toBe("+998 (99) 111-22-33");
      expect(beautifyPhoneNumber("991112233")).toBe(""); // TODO: if 998 not provided, then add that
      expect(beautifyPhoneNumber("11234567890")).toBe("");
    });

    it("should handle empty or non-string input", () => {
      expect(beautifyPhoneNumber("")).toBe("");
      expect(beautifyPhoneNumber(null)).toBe("");
      expect(beautifyPhoneNumber(undefined)).toBe("");
      expect(beautifyPhoneNumber(12345)).toBe("");
      expect(beautifyPhoneNumber([])).toBe("");
    });
  });
});

describe("parseJSON", () => {
  it("should parse valid JSON strings", () => {
    expect(parseJSON('{"key": "value"}')).toEqual({ key: "value" });
    expect(parseJSON("[1, 2, 3]")).toEqual([1, 2, 3]);
    expect(parseJSON('"hello"')).toEqual("hello");
    expect(parseJSON("123")).toEqual(123);
    expect(parseJSON("true")).toEqual(true);
    expect(parseJSON("null")).toBe(null);
  });

  it("should return false for invalid JSON strings", () => {
    expect(parseJSON("invalid")).toBe(false);
    expect(parseJSON('{"key": "value"')).toBe(false); // missing closing brace
    expect(parseJSON('{key: "value"}')).toBe(false); // missing quotes around key
    expect(parseJSON("undefined")).toBe(false);
  });
});

describe("stripTags", () => {
  it("should remove HTML tags from the input", () => {
    expect(stripTags("<p>Hello, <strong>World</strong>!</p>")).toBe(
      "Hello, World!"
    );
    expect(stripTags("<h1>Title</h1>")).toBe("Title");
    expect(stripTags('<a href="https://example.com">Link</a>')).toBe("Link");
    expect(stripTags("")).toBe("");
  });

  it("should handle undefined and null input", () => {
    expect(stripTags()).toBe("");
    expect(stripTags(undefined)).toBe("");
  });

  it("should not modify input without HTML tags", () => {
    expect(stripTags("This is a test")).toBe("This is a test");
    expect(stripTags("123")).toBe("123");
  });
});

describe("wait", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should resolve after the specified time", async () => {
    const start = Date.now();
    const delay = 1000; // 1 second

    const waitPromise = wait<number>(delay);

    vi.runAllTimers(); // Skip the setTimeout delay

    await waitPromise;

    const end = Date.now();
    const elapsed = end - start;

    expect(elapsed).toBe(delay);
  });
});
