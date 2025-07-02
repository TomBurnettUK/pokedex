export async function commandHelp({ commands }) {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:\n\n");
    for (const key in commands) {
        console.log(`${commands[key].name}: ${commands[key].description}`);
    }
}
