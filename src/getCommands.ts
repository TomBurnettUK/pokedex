import { commandCatch } from "./commands/commandCatch.js";
import { commandExit } from "./commands/commandExit.js";
import { commandExplore } from "./commands/commandExplore.js";
import { commandHelp } from "./commands/commandHelp.js";
import { commandInspect } from "./commands/commandInspect.js";
import { commandMap } from "./commands/commandMap.js";
import { commandMapB } from "./commands/commandMapB.js";
import { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
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
    explore: {
      name: "explore",
      description:
        "Explores specified location (e.g: 'explore pastoria-city-area')",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Attempts to catch pokemon (e.g: 'catch squirtle')",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "Inspects pokemon (e.g: 'inspect pidgey')",
      callback: commandInspect,
    },
  };
}
