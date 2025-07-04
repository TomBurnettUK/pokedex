import { createInterface, type Interface } from "readline";
import { getCommands } from "./getCommands.js";
import { PokeAPI, Pokemon } from "./pokeAPI.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  readline: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  pokedex: Record<string, Pokemon>;
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
    pokedex: {},
  };
}
