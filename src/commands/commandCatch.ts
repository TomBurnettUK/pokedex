import { State } from "src/state";

export async function commandCatch(state: State, pokemon: string) {
  console.log(`Throwing a Pokeball at ${pokemon}...`);
  const caught = await state.pokeAPI.catchPokemon(pokemon, state);
  if (caught) {
    console.log(`You caught ${pokemon}!`);
  } else {
    console.log(`${pokemon} got away...`);
  }
}
