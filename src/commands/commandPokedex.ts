import { State } from "../state";

export async function commandPokedex(state: State) {
  console.log("Your Pokedex:");
  for (const pokemonName in state.pokedex) {
    console.log("  - " + pokemonName);
  }
}
