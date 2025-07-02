export class PokeAPI {
  readonly #baseURL = "https://pokeapi.co/api/v2";

  #nextLocationsURL: string | null;
  #previousLocationsURL: string | null;

  constructor() {
    this.#nextLocationsURL = this.#baseURL + "/location-area";
    this.#previousLocationsURL = null;
  }

  async getNextLocations(): Promise<Location[]> {
    if (!this.#nextLocationsURL) {
      return [];
    }
    const locationsResponse = await this.fetchLocations(this.#nextLocationsURL);
    return locationsResponse.results;
  }

  async getPreviousLocations(): Promise<Location[]> {
    if (!this.#previousLocationsURL) {
      return [];
    }
    const locationsResponse = await this.fetchLocations(
      this.#previousLocationsURL
    );
    return locationsResponse.results;
  }

  async fetchLocations(url: string): Promise<LocationsResponse> {
    const response = await fetch(url);
    const locationsResponse = (await response.json()) as LocationsResponse;

    this.#nextLocationsURL = locationsResponse.next;
    this.#previousLocationsURL = locationsResponse.previous;

    return locationsResponse;
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
