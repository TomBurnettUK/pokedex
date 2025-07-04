import { State } from "../state.js";

export async function commandExplore(state: State, location: string) {
  const pokemon = await state.pokeAPI.getPokemoninLocation(location);
  console.log(location);

  for (const pokeman of pokemon) {
    console.log(pokeman.name);
  }
}
