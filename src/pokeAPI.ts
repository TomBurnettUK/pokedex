import { State } from "src/state.js";
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
    return this.#getLocations(this.#nextLocationsURL);
  }

  async getPreviousLocations(): Promise<Location[]> {
    return this.#getLocations(this.#previousLocationsURL);
  }

  async getPokemoninLocation(location: string): Promise<string[]> {
    if (!location) {
      return [];
    }

    const url = this.#baseURL + "/location-area/" + location;
    const locationResults = await this.#fetchFromUrl<LocationResponse>(url);

    return locationResults.pokemon_encounters.map((pe) => pe.pokemon.name);
  }

  async catchPokemon(pokemon: string, state: State): Promise<boolean> {
    const url = this.#baseURL + "/pokemon/" + pokemon;
    const pokemonDetails = await this.#fetchFromUrl<Pokemon>(url);

    if (Math.random() > 0.5) {
      state.pokedex[pokemonDetails.name] = pokemonDetails;
      return true;
    }
    return false;
  }

  async #getLocations(url: string | null): Promise<Location[]> {
    if (!url) return [];

    const response = await this.#fetchFromUrl<LocationsResponse>(url);

    this.#nextLocationsURL = response.next;
    this.#previousLocationsURL = response.previous;

    return response.results;
  }

  async #fetchFromUrl<T>(url: string): Promise<T> {
    let typedResponse = this.#cache.get<T>(url);

    if (!typedResponse) {
      const response = await fetch(url);
      typedResponse = (await response.json()) as T;
      this.#cache.add(url, typedResponse);
    }

    return typedResponse;
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

type LocationResponse = {
  location: Location;
  pokemon_encounters: {
    pokemon: { name: string };
  }[];
};

export type Pokemon = {
  name: string;
  base_experience: number;
  weight: number;
  height: number;
  stats: {
    stat: { name: string };
    base_stat: number;
  }[];
  types: {
    type: { name: string };
  }[];
};
