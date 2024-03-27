import Tower from "../Tower";
import Display from "./Display";
import Entity from "./Entity";
import { Hero } from "./Hero";

export default class DisplayManager extends Display {
  public combatLog: string;
  public tower: Tower;
  constructor(tower: Tower) {
    super();
    this.combatLog = "";
    this.tower = tower;
  }

  async displayEffect(Entity: Entity | Hero, damage: number) {
    await this.updateLife(Entity, damage);
  }

  public async updateLife(Entity: Entity | Hero, damage: number) {
    let damageOrHeal = damage < 0 ? -1 : 1;
    if (Entity.Hp == Entity.HpMax && damageOrHeal == -1) {
      damageOrHeal = 0;
    }
    await new Promise((resolve) => {
      const initial_Hp = Entity.Hp;
      const timer = setInterval(
        function (this: DisplayManager) {
          Entity.Hp -= damageOrHeal;
          let lifeFull = "█".repeat(
            Math.round((Entity.Hp / Entity.HpMax) * Display.sizeOfHealthBar)
          );
          let lifeEmpty = "░".repeat(Display.sizeOfHealthBar - lifeFull.length);
          Entity.healthBar.bar = lifeFull + lifeEmpty;
          console.clear();
          this.displayAll(this.formateDisplay());
          if (
            Entity.Hp == initial_Hp - damage ||
            Entity.Hp == 0 ||
            Entity.Hp == Entity.HpMax
          ) {
            clearInterval(timer);
            resolve(0);
          }
        }.bind(this),
        50
      );
    });
  }

  public formateDisplay() {
    const formatedDisplay: string[] = [];
    let i = 0;
    while (i < this.Heroes.length && i < this.Opponents.length) {
      let log: string = this.formateHeroAndOpponentDisplay(
        this.Heroes[i],
        this.Opponents[i]
      );
      formatedDisplay.push(log);
      i++;
    }
    while (i < this.Heroes.length) {
      let log: string = this.formateOnlyHeroDisplay(this.Heroes[i]);
      formatedDisplay.push(log);
      i++;
    }
    while (i < this.Opponents.length) {
      let log: string = this.formateOnlyOpponentDisplay(this.Opponents[i]);
      formatedDisplay.push(log);
      i++;
    }
    return formatedDisplay;
  }
  setCombatLog(combatLog: string) {
    this.combatLog = combatLog;
    return;
  }
  public displayAll(formatedDisplay: String[]) {
    console.log(`CURRENT FLOOR ${this.tower.current_Floor}\n`);
    for (const log of formatedDisplay) {
      console.log(log);
    }
    console.log(this.combatLog);
    return;
  }
}
