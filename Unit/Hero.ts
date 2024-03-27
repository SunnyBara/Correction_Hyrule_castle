import DisplayManager from "../Display/DisplayManager";
import Entity from "./Entity";
import { EntityInterface } from "./EntityInterface";
import Fight from "../Game/Fight";
import Tower from "../Tower/Tower";
const fs = require("fs");

export class GameManager {
  public tower: Tower;
  public heroesList: EntityInterface[];
  public bossList: EntityInterface[];
  public trashesList: EntityInterface[];
  public bosses: Entity[];
  public trashes: Entity[];
  public heroes: Hero[];
  public Display: DisplayManager;
  constructor() {
    this.tower = new Tower(10);
    this.heroes = [];
    this.heroesList = [];
    this.bosses = [];
    this.bossList = [];
    this.trashes = [];
    this.trashesList = [];
    this.Display = new DisplayManager(this.tower);
  }
  async Hyrule_castle() {
    this.initGame();
    await this.game();
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
      const opponent: Entity[] = [this.initOpponent()];
      this.Display.setOpponent(opponent);
      this.Display.setHeroes(this.heroes);
      const figth = new Fight(this.Display);
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
    const trashByRarity = [];
    for (const trash of this.trashesList) {
      if (trash.rarity == rarity) {
        trashByRarity.push(trash);
      }
    }
    const index = Math.ceil(Math.random() * trashByRarity.length - 1);
    return this.trashesList[index];
  }
  private setRandomBoss() {
    const rarity = this.getRarity();
    const bossByRarity = [];
    for (const boss of this.bossList) {
      if (boss.rarity == rarity) {
        bossByRarity.push(boss);
      }
    }
    const index = Math.ceil(Math.random() * bossByRarity.length - 1);
    return this.bossList[index];
  }
  end() {
    if (this.heroes.length == 0) {
      this.Display.gameOver();
    }
  }
}
export class Hero extends Entity {
  constructor(entity: EntityInterface) {
    super(entity);
  }
  public heal() {
    const Heal: number = this.calculheal();
    return Heal;
  }

  private calculheal() {
    return this.HpMax / 2;
  }
}
