import { State } from "../state.js";

export async function commandMap(state: State) {
  const locations = await state.pokeAPI.getNextLocations();

  if (locations.length === 0) {
    return console.log("you're on the last page");
  }

  for (const location of locations) {
    console.log(location.name);
  }
}
