import { State } from "../state";

export async function commandInspect(state: State, pokemon: string) {
  const pokemonDetails = state.pokeAPI.inspectPokemon(pokemon, state);
  if (!pokemonDetails) {
    console.log("you have not caught that pokemon");
  } else {
    console.log("Name: " + pokemonDetails.name);
    console.log("Height: " + pokemonDetails.height);
    console.log("Weight: " + pokemonDetails.weight);
    console.log("Stats:");
    for (const { stat, base_stat } of pokemonDetails.stats) {
      console.log(`  -${stat.name}: ${base_stat}`);
    }
    console.log("Types:");
    for (const { type } of pokemonDetails.types) {
      console.log("  - " + type.name);
    }
  }
}
