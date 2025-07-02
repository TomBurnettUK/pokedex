import { createInterface } from "node:readline";

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .split(" ")
    .filter((s) => s);
}

export function startREPL() {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  readline.prompt();

  readline.on("line", (line) => {
    const words = cleanInput(line);
    if (words.length > 0) {
      console.log("Your command was: " + words[0]);
    }
    readline.prompt();
  });
}
