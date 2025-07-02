import { createInterface } from "readline";
import { getCommands } from "./getCommands.js";
import { PokeAPI } from "./pokeAPI.js";
export function initState() {
    return {
        readline: createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "Pokedex > ",
        }),
        commands: getCommands(),
        pokeAPI: new PokeAPI(),
    };
}
