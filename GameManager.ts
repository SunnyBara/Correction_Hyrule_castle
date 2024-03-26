import Entity from "./Entity";
import { EntityInterface } from "./EntityInterface";
import Fight from "./Fight";
import Hero from "./Hero";
import Tower from "./Tower";
import { fs } from "./lib";

export default class GameManager {
  tower: Tower;
  heroesList: EntityInterface[];
  bossList: EntityInterface[];
  trashesList: EntityInterface[];
  bosses: Entity[];
  heroes: Hero[];
  trashes: Entity[];
  constructor() {
    this.tower = new Tower(10);
    this.heroes = [];
    this.heroesList = [];
    this.bosses = [];
    this.bossList = [];
    this.trashes = [];
    this.trashesList = [];
  }
  async Hyrule_castle() {
    // this.initGame();
    //  await this.game();
    this.end();
  }

  public async initGame() {
    this.initList();
    this.initHero();
  }

  private initList() {
    this.trashesList = this.initEntityList(
      this.readParseJson("./data/trash.json")
    );
    this.bossList = this.initEntityList(this.readParseJson("./data/boss.json"));
    this.heroesList = this.initEntityList(
      this.readParseJson("./data/player.json")
    );
  }

  private initEntityList(jsonList: Entity[]) {
    this.sortByRarity(jsonList);
    return jsonList;
  }

  readParseJson(path: string) {
    const filecontent = fs.readFileSync(path);
    return JSON.parse(filecontent);
  }

  private sortByRarity(list: EntityInterface[]) {
    list.sort((element1, element2) => {
      return element1.rarity - element2.rarity;
    });
  }
  private initHero() {
    const hero: EntityInterface = this.setRandomHero();
    this.heroes.push(new Hero(hero));
  }
  private setRandomHero() {
    const rarity = this.getRarity();
    return this.heroesList[rarity];
  }
  private getRarity() {
    const random = Math.ceil(Math.random() * 100);
    let rarity = 0;
    if (random <= 50) {
      rarity = 1;
    } else if (random <= 80) {
      rarity = 2;
    } else if (random <= 95) {
      rarity = 3;
    } else if (random <= 99) {
      rarity = 4;
    } else if (random == 100) {
      rarity = 5;
    }
    return rarity;
  }
  private async game() {
    while (
      this.tower.current_Floor <= this.tower.Floor_max &&
      this.heroes.length > 0
    ) {
      const opponent = this.initOpponent();
      const figth = new Fight();
      console.log(`============FLOOR ${this.tower.current_Floor}=============`);

      await figth.letsFight(this.heroes, opponent);
      this.tower.nextFloor();
    }
  }

  initOpponent() {
    if (this.tower.current_Floor % 10 == 0) {
      const Boss: EntityInterface = this.setRandomBoss();
      return new Entity(Boss);
    }
    const Trash: EntityInterface = this.setRandomTrash();
    return new Entity(Trash);
  }
  private setRandomTrash() {
    const rarity = this.getRarity();
    return this.trashesList[rarity];
  }
  private setRandomBoss() {
    const rarity = this.getRarity();
    return this.bossList[rarity];
  }
  end() {
    console.log("c finit");
  }
}
