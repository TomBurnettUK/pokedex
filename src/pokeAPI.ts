import { Cache } from "./pokecache.js";

export class PokeAPI {
  readonly #baseURL = "https://pokeapi.co/api/v2";

  #cache: Cache;

  #nextLocationsURL: string | null;
  #previousLocationsURL: string | null;

  constructor() {
    this.#nextLocationsURL = this.#baseURL + "/location-area";
    this.#previousLocationsURL = null;
    this.#cache = new Cache(10000);
  }

  async getNextLocations(): Promise<Location[]> {
    return this.#getLocationsByURL(this.#nextLocationsURL);
  }

  async getPreviousLocations(): Promise<Location[]> {
    return this.#getLocationsByURL(this.#previousLocationsURL);
  }

  async #getLocationsByURL(url: string | null): Promise<Location[]> {
    if (!url) {
      return [];
    }

    let locationsResponse = this.#cache.get<LocationsResponse>(url);

    if (!locationsResponse) {
      const response = await fetch(url);
      const locationsResponse = (await response.json()) as LocationsResponse;
      this.#cache.add(url, locationsResponse);
    }

    this.#nextLocationsURL = locationsResponse.next;
    this.#previousLocationsURL = locationsResponse.previous;

    return locationsResponse.results;
  }
}

type LocationsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Location[];
};

export type Location = {
  name: string;
  url: string;
};
