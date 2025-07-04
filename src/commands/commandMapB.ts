import { State } from "../state.js";

export async function commandMapB(state: State) {
  const locations = await state.pokeAPI.getPreviousLocations();

  if (locations.length === 0) {
    return console.log("you're on the first page");
  }

  for (const location of locations) {
    console.log(location.name);
  }
}
