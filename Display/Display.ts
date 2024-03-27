import { displayBigZelda, displayGameOver } from "./Ascii";
import Color from "./Color";
import Entity from "../Unit/Entity";
import { Hero } from "../Unit/Hero";

export default class Display {
  public static sizeOfHealthBar: number = 40;
  public Heroes: Hero[];
  public Opponents: Entity[];
  public spaceBetweenNameAndBar = 18;
  public spaceBetweenBarandHealth = 7;
  constructor() {
    this.Heroes = [];
    this.Opponents = [];
  }

  public static initHpBar(entity: Entity | Hero) {
    const color =
      entity instanceof Hero ? Color.colorHeroBar : Color.colorOponentBar;
    let healthBar = "█".repeat(Display.sizeOfHealthBar);
    return { bar: healthBar, color: color };
  }

  public formateHeroBar(Hero: Hero) {
    const healthPointDisplay = Hero.Hp + "/" + Hero.HpMax;
    if (Hero.healthBar.color)
      return (
        Hero.name +
        " ".repeat(this.spaceBetweenNameAndBar - Hero.name.length) +
        Hero.healthBar.color(Hero) +
        " ".repeat(this.spaceBetweenBarandHealth - healthPointDisplay.length) +
        healthPointDisplay
      );
  }

  public formateOppoenentBar(Opponent: Entity) {
    const healthPointDisplay = Opponent.Hp + "/" + Opponent.HpMax;
    if (Opponent.healthBar.color)
      return (
        healthPointDisplay +
        " ".repeat(this.spaceBetweenBarandHealth - healthPointDisplay.length) +
        Opponent.healthBar.color(Opponent) +
        " ".repeat(this.spaceBetweenNameAndBar - Opponent.name.length) +
        Opponent.name
      );
  }
  public formateHeroAndOpponentDisplay(Hero: Hero, Opponnent: Entity) {
    let log: string = "";
    log += this.formateHeroBar(Hero);
    log += "     ";
    log += this.formateOppoenentBar(Opponnent);
    log += "\n";
    return log;
  }
  public formateOnlyOpponentDisplay(Opponnent: Entity) {
    let log: string = "";
    log += " ".repeat(
      Display.sizeOfHealthBar +
        this.spaceBetweenBarandHealth +
        this.spaceBetweenNameAndBar
    );
    log += "     ";
    log += this.formateOppoenentBar(Opponnent);
    log += "\n";
    return log;
  }
  public formateOnlyHeroDisplay(Hero: Hero) {
    let log: string = "";
    log += this.formateHeroBar(Hero);
    log += "\n";
    return log;
  }

  public setHeroes(heroes: Hero[]) {
    this.Heroes = heroes;
    return;
  }
  public setOpponent(opponent: Entity[]) {
    this.Opponents = opponent;
  }

  public gameOver() {
    console.clear();
    displayBigZelda();
    displayGameOver();
  }
}
