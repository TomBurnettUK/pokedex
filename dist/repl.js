export function cleanInput(input) {
    return input
        .toLowerCase()
        .split(" ")
        .filter((s) => s);
}
export function startREPL(state) {
    const { readline, commands } = state;
    readline.prompt();
    readline.on("line", async (line) => {
        const words = cleanInput(line);
        if (words.length > 0) {
            const command = commands[words[0]];
            if (command) {
                try {
                    await command.callback(state);
                }
                catch (error) {
                    if (error instanceof Error) {
                        console.error(error.message);
                    }
                }
            }
            else {
                console.log("Unknown command");
            }
        }
        readline.prompt();
    });
}
