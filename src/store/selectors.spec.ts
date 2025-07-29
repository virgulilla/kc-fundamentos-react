import type { RootState } from ".";
import type { Advert } from "../pages/advert/types";
import { getAdvert } from "./selectors";

describe("getAdvert", () => {
  const advert: Advert = {
    id: "1",
    name: "New Advert",
    sale: true,
    price: 100,
    photo: null,
    tags: ["lifestyle"],
  };

  const state: RootState = {
    adverts: { data: [advert], loaded: true },
    auth: false,
    ui: { pending: false, error: null },
  };

  test("should return a advert with id 1", () => {
    const result = getAdvert("1")(state);
    expect(result).toEqual(advert);
  });
});
