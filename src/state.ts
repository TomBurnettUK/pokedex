import { createInterface, type Interface } from "readline";
import { getCommands } from "./getCommands.js";
import { PokeAPI } from "./pokeAPI.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export type State = {
  readline: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
};

export function initState(): State {
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
