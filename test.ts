import Entity from "./Entity";
import { EntityInterface } from "./EntityInterface";
import GameManager from "./GameManager";
import Hero from "./Hero";
const fs = require("fs");
function main() {
  // const filecontent = fs.readFileSync("./data/player.json");
  // const herolist: EntityInterface[] = JSON.parse(filecontent);
  // const hero = new Hero(herolist[0]);
  // console.log(hero);
  const game = new GameManager();
  // game.Hyrule_castle();
}
main();
