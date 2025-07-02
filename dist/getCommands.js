import { commandExit } from "./commands/commandExit.js";
import { commandHelp } from "./commands/commandHelp.js";
import { commandMap } from "./commands/commandMap.js";
import { commandMapB } from "./commands/commandMapB.js";
export function getCommands() {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "Shows next 20 locations",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Shows previous 20 locations",
            callback: commandMapB,
        },
    };
}
