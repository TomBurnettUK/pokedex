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
    if (!this.#nextLocationsURL) {
      return [];
    }

    const currentLocationsURL = this.#nextLocationsURL;

    let locationsResponse =
      this.#cache.get<LocationsResponse>(currentLocationsURL);

    if (!locationsResponse) {
      locationsResponse = await this.fetchLocations(currentLocationsURL);
      this.#cache.add(currentLocationsURL, locationsResponse);
    }

    this.#setURLs(locationsResponse.next, locationsResponse.previous);
    return locationsResponse.results;
  }

  async getPreviousLocations(): Promise<Location[]> {
    if (!this.#previousLocationsURL) {
      return [];
    }

    const currentLocationsURL = this.#previousLocationsURL;

    let locationsResponse =
      this.#cache.get<LocationsResponse>(currentLocationsURL);

    if (!locationsResponse) {
      locationsResponse = await this.fetchLocations(currentLocationsURL);
      this.#cache.add(currentLocationsURL, locationsResponse);
    }

    this.#setURLs(locationsResponse.next, locationsResponse.previous);
    return locationsResponse.results;
  }

  async fetchLocations(url: string): Promise<LocationsResponse> {
    const response = await fetch(url);
    const locationsResponse = (await response.json()) as LocationsResponse;
    return locationsResponse;
  }

  #setURLs(next: string | null, previous: string | null) {
    this.#nextLocationsURL = next;
    this.#previousLocationsURL = previous;
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
