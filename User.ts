import Entity from "./Entity";
import Hero from "./Hero";
import { inquirer } from "./lib";

export default class User {
  static async getUserInputFromList(
    listOfChoice: unknown[],
    question: string,
    name: string
  ) {
    const questions = [
      {
        type: "list",
        name: name,
        message: question,
        choices: listOfChoice,
      },
    ];
    const choice = await inquirer.prompt(questions);
    return choice;
  }
  static async getUserInputFromListOfObjects(
    listOfChoice: Entity[] | Hero[],
    question: string,
    name: string
  ) {
    const FormmatedlistOfChoice: unknown[] = [];
    listOfChoice.forEach((Object) => {
      FormmatedlistOfChoice.push({ name: Object.name, value: { Object } });
    });
    const choice = await this.getUserInputFromList(
      FormmatedlistOfChoice,
      question,
      name
    );
    return choice;
  }
}
