import { expect, test } from "vitest";
import decoder from "~/shared/utils/decoder";

test("Decoder", () => {
  expect(decoder("561d64000609")).toStrictEqual({
    hum: 75.1,
    battery: 100,
    temp: 23.1,
  });
});
