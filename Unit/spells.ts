// import { Classe, Race } from "./enum";
// import { Spells } from "./interface";
// import { readAndparseJson, rl, setUpStringFromList } from "./lib";
// import { fs, getUserInput } from "./lib";

// export function spells_generator(
//   name: string,
//   description: string,
//   type: string,
//   effect: number,
//   cost: number,
//   targets: number,
//   cooldown: number,
//   race_requirement: number[],
//   class_requirement: number[],
//   rarity: number
// ) {
//   const spell_list = readAndparseJson("data/spells.json");
//   const new_spell: Spells = {
//     id: spell_list[spell_list.length - 1].id + 1,
//     name: name,
//     cost: cost,
//     effect: effect,
//     type: type,
//     description: description,
//     cooldown: cooldown,
//     targets: targets,
//     race_requirement: race_requirement,
//     class_requirement: class_requirement,
//     rarity: rarity,
//   };
//   spell_list.push(new_spell);
//   fs.writeFileSync("data/spells.json", JSON.stringify(spell_list));
//   return;
// }
// function replaceEnumValueByKey(Enum, array: string[]): number[] {
//   const number_array: number[] = [];
//   for (const element of array) {
//     number_array.push(Enum[parseInt(element)]);
//   }
//   return number_array;
// }

// export function create_a_spell() {
//   const name = getUserInput("Enter the name of the spell: ");
//   const description = getUserInput("Enter the description of the spell: ");
//   const type = rl.keyInSelect(
//     ["Heal", "Damage"],
//     "Choose the type of spell: ",
//     { cancel: false }
//   )
//     ? "Damage"
//     : "Heal";
//   const effect = parseInt(getUserInput("Enter the effect of the spell: "));
//   const cost = parseInt(getUserInput("Enter the cost of the spell: "));
//   const targets = parseInt(
//     getUserInput("Enter the number of targets of the spell: ")
//   );
//   const cooldown = parseInt(getUserInput("Enter the cooldown of the spell: "));

//   const race_requirement = replaceEnumValueByKey(
//     Race,
//     getUserInput(
//       "Choose the  required race(es) for this spell (separated by space): " +
//         setUpStringFromList(Race) +
//         "\n>"
//     ).split(" ")
//   );
//   const class_requirement = replaceEnumValueByKey(
//     Classe,
//     getUserInput(
//       "Choose the  required class(es) for this spell (separated by space): " +
//         setUpStringFromList(Classe) +
//         "\n>"
//     ).split(" ")
//   );

//   const rarity =
//     parseInt(
//       rl.keyInSelect(
//         ["1", "2", "3", "4", "5"],
//         "Enter the rarity of the spell: ",
//         { cancel: false }
//       )
//     ) + 1;
//   spells_generator(
//     name,
//     description,
//     type,
//     effect,
//     cost,
//     targets,
//     cooldown,
//     race_requirement,
//     class_requirement,
//     rarity
//   );
// }
