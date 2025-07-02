export async function commandMapB(state) {
    try {
        const locations = await state.pokeAPI.getPreviousLocations();
        if (locations.length === 0) {
            return console.log("you're on the first page");
        }
        for (const location of locations) {
            console.log(location.name);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
}
