import { State } from "../state.js";

export async function commandExit({ readline }: State) {
  console.log("Closing the Pokedex... Goodbye!");
  readline.close();
  process.exit(0);
}
