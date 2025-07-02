import { Cache } from "./pokecache.js";
export class PokeAPI {
    #baseURL = "https://pokeapi.co/api/v2";
    #cache;
    #nextLocationsURL;
    #previousLocationsURL;
    constructor() {
        this.#nextLocationsURL = this.#baseURL + "/location-area";
        this.#previousLocationsURL = null;
        this.#cache = new Cache(10000);
    }
    async getNextLocations() {
        if (!this.#nextLocationsURL) {
            return [];
        }
        const currentLocationsURL = this.#nextLocationsURL;
        let locationsResponse = this.#cache.get(currentLocationsURL);
        if (!locationsResponse) {
            locationsResponse = await this.fetchLocations(currentLocationsURL);
            this.#cache.add(currentLocationsURL, locationsResponse);
        }
        this.#setURLs(locationsResponse.next, locationsResponse.previous);
        return locationsResponse.results;
    }
    async getPreviousLocations() {
        if (!this.#previousLocationsURL) {
            return [];
        }
        const currentLocationsURL = this.#previousLocationsURL;
        let locationsResponse = this.#cache.get(currentLocationsURL);
        if (!locationsResponse) {
            locationsResponse = await this.fetchLocations(currentLocationsURL);
            this.#cache.add(currentLocationsURL, locationsResponse);
        }
        this.#setURLs(locationsResponse.next, locationsResponse.previous);
        return locationsResponse.results;
    }
    async fetchLocations(url) {
        const response = await fetch(url);
        const locationsResponse = (await response.json());
        return locationsResponse;
    }
    #setURLs(next, previous) {
        this.#nextLocationsURL = next;
        this.#previousLocationsURL = previous;
    }
}
