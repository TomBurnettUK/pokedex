export async function commandExit({ readline }) {
    console.log("Closing the Pokedex... Goodbye!");
    readline.close();
    process.exit(0);
}
