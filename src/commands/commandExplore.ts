import { State } from "../state.js";

export async function commandExplore(state: State, location: string) {
  if (!location) throw Error("Must provide valid location");

  const names = await state.pokeAPI.getPokemoninLocation(location);

  for (const name of names) {
    console.log(name);
  }
}
