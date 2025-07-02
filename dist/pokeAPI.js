export class PokeAPI {
    #baseURL = "https://pokeapi.co/api/v2";
    #nextLocationsURL;
    #previousLocationsURL;
    constructor() {
        this.#nextLocationsURL = this.#baseURL + "/location-area";
        this.#previousLocationsURL = null;
    }
    async getNextLocations() {
        if (!this.#nextLocationsURL) {
            return [];
        }
        const locationsResponse = await this.fetchLocations(this.#nextLocationsURL);
        return locationsResponse.results;
    }
    async getPreviousLocations() {
        if (!this.#previousLocationsURL) {
            return [];
        }
        const locationsResponse = await this.fetchLocations(this.#previousLocationsURL);
        return locationsResponse.results;
    }
    async fetchLocations(url) {
        const response = await fetch(url);
        const locationsResponse = (await response.json());
        this.#nextLocationsURL = locationsResponse.next;
        this.#previousLocationsURL = locationsResponse.previous;
        return locationsResponse;
    }
}
