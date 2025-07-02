import { expect, test } from "vitest";
import { Cache } from "./pokecache.js";

test.concurrent.each([
  {
    key: "https://example.com",
    value: "testdata",
    interval: 500, // 1/2 second
  },
  {
    key: "https://example.com/path",
    value: "moretestdata",
    interval: 1000, // 1 second
  },
])("Test Caching $interval ms", async ({ key, value, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, value);
  const cached = cache.get(key);
  expect(cached).toBe(value);

  await new Promise((resolve) => setTimeout(resolve, interval + 500));
  const reaped = cache.get(key);
  expect(reaped).toBe(undefined);

  cache.stopReapLoop();
});
