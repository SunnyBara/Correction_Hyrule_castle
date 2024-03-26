import Display from "./Display";
import Entity from "./Entity";
import Hero from "./Hero";

export default class DisplayManager extends Display {
  async displayEffect(Entity: Entity | Hero, damage: number) {
    await this.updateLife(Entity, damage);
  }

  public async updateLife(Entity: Entity | Hero, damage: number) {
    await new Promise((resolve) => {
      const initial_Hp = Entity.Hp;
      const timer = setInterval(
        function (this: DisplayManager) {
          Entity.Hp--;
          let lifeFull = "█".repeat(
            Math.round((Entity.Hp / Entity.HpMax) * Display.sizeOfHealthBar)
          );
          let lifeEmpty = "░".repeat(Display.sizeOfHealthBar - lifeFull.length);
          Entity.healthBar.bar = lifeFull + lifeEmpty;
          console.clear();
          this.displayAll(this.formateDisplay());
          if (Entity.Hp == initial_Hp - damage) {
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

  public displayAll(formatedDisplay: String[]) {
    for (const log of formatedDisplay) {
      console.log(log);
    }
    return;
  }
}
