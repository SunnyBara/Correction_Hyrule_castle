import Color from "../Display/Color";
import DisplayManager from "../Display/DisplayManager";
import Entity from "../Unit/Entity";
import { Hero } from "../Unit/Hero";

import User from "./User";

export default class Fight {
  public Heroes: Hero[];
  public Opponents: Entity[];
  private figthers: Entity[];
  private fighter?: Entity;
  private target?: Entity;
  private Display: DisplayManager;
  constructor(Display: DisplayManager) {
    this.Heroes = [];
    this.Opponents = [];
    this.figthers = [];
    this.Display = Display;
  }
  async letsFight(Hero: Hero[], Opponent: Entity[]) {
    this.initFigthers(Hero, Opponent);
    await this.figth();
  }

  initFigthers(Heroes: Hero[], Opponents: Entity[]) {
    this.Heroes = Heroes;
    for (const hero of this.Heroes) {
      this.figthers.push(hero);
    }
    for (const opponent of Opponents) {
      this.Opponents.push(opponent);
      this.figthers.push(opponent);
    }
    return;
  }

  async figth() {
    console.clear();
    this.Display.displayAll(this.Display.formateDisplay());
    for (const figther of this.figthers) {
      if (this.Heroes.length > 0 && this.Opponents.length > 0) {
        this.fighter = figther;
        if (figther instanceof Hero) {
          await this.playerTurn();
        } else {
          await this.opponentTurn();
        }
      }
    }
    if (this.Heroes.length > 0 && this.Opponents.length > 0) {
      await this.figth();
    }
    return;
  }

  async playerTurn() {
    const choice = await User.getUserInputFromList(
      ["Attack", "Heal"],
      "Choose your action",
      "Action"
    );
    await this.procedeAction(choice.Action);
    return;
  }

  async procedeAction(choice: string) {
    let DamageOrHeal = 0;
    switch (choice) {
      case "Attack":
        await this.chooseTargetFromList(this.Opponents);
        if (this.fighter) DamageOrHeal = this.fighter?.str;
        break;
      case "Heal":
        await this.chooseTargetFromList(this.Heroes);
        if (this.target instanceof Hero) DamageOrHeal = -this.target.heal();
        break;
    }
    let combatLog = this.writeDownCombatLog(DamageOrHeal);
    if (this.target) {
      this.Display.setCombatLog(combatLog);
      await this.Display.displayEffect(this.target, DamageOrHeal);
      await this.timeOutToEnjoyDisplay();
    }
    this.isTargetAlive();
    return;
  }

  async timeOutToEnjoyDisplay() {
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  }

  writeDownCombatLog(DamageOrHeal: number) {
    let combatLog = "";
    if (DamageOrHeal <= 0 && this.fighter && this.target) {
      combatLog += `${Color.colorName(this.fighter)}`;
      combatLog +=
        this.fighter == this.target
          ? ` Heal himslef for `
          : `Heal ${Color.colorName(this.target)} for `;
      combatLog +=
        this.target.Hp - DamageOrHeal > this.target.HpMax
          ? `${this.target.HpMax - this.target.Hp}`
          : `${-DamageOrHeal}`;
      combatLog += `Hp!`;
    } else if (this.target && this.fighter) {
      combatLog += `${Color.colorName(this.fighter)} hit ${Color.colorName(
        this.target
      )} for `;
      combatLog +=
        this.target.Hp - DamageOrHeal > 0
          ? `${DamageOrHeal}`
          : `${this.target.Hp}`;
      combatLog += ` Damages.`;
    }
    return combatLog;
  }

  async chooseTargetFromList(list: Entity[] | Hero[]) {
    const choice = await User.getUserInputFromListOfObjects(
      list,
      "Choose your target:",
      "Target"
    );
    this.setTarget(choice.Target.Object);
  }

  async opponentTurn() {
    this.getRandomElementFromList(this.Heroes);
    if (this.target && this.fighter) {
      let combatLog = this.writeDownCombatLog(this.fighter.str);
      this.Display.setCombatLog(combatLog);
      await this.Display.displayEffect(this.target, this.fighter.str);
    }
    this.isTargetAlive();
    return;
  }

  getRandomElementFromList(list: Hero[]) {
    const number = Math.round(Math.random() * (list.length - 1));
    this.setTarget(list[0]);
    return;
  }

  isTargetAlive() {
    if (this.target && this.target.Hp === 0) {
      this.eliminateFigther();
      this.removeDeadFromTeamList();
    }
  }

  eliminateFigther() {
    if (this.target)
      this.figthers.splice(this.figthers.indexOf(this.target), 1);
    return;
  }
  removeDeadFromTeamList() {
    if (this.target instanceof Hero) {
      this.Heroes.splice(this.Heroes.indexOf(this.target), 1);
    } else if (this.target) {
      this.Opponents.splice(this.Opponents.indexOf(this.target), 1);
    }
  }

  displayEffect() {
    for (const fighter of this.figthers)
      console.log(fighter.name + " " + fighter.Hp);
  }
  setTarget(target: Entity | Hero) {
    this.target = target;
    return;
  }
}
