import Entity from "./Entity";
import Hero from "./Hero";
import User from "./User";

export default class Fight {
  public Hero: Hero[];
  public Opponent: Entity[];
  private figthers: Entity[];
  private fighter?: Entity;
  private target?: Entity;
  constructor() {
    this.Hero = [];
    this.Opponent = [];
    this.figthers = [];
  }
  async letsFight(Hero: Hero[], Opponent: Entity) {
    this.initFigthers(Hero, Opponent);
    await this.figth();
  }

  initFigthers(Hero: Hero[], Opponent: Entity) {
    this.Hero = Hero;
    this.figthers.push(Hero[0]);
    this.Opponent.push(Opponent);
    this.figthers.push(Opponent);
    return;
  }

  async figth() {
    console.log("DEBUT DU ROUND");
    for (const figther of this.figthers) {
      if (this.Hero.length > 0 && this.Opponent.length > 0) {
        this.fighter = figther;
        if (figther instanceof Hero) {
          await this.playerTurn();
        } else {
          this.opponentTurn();
        }
      }
    }
    if (this.Hero.length > 0 && this.Opponent.length > 0) {
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
    this.displayEffect();
    return;
  }

  async procedeAction(choice: string) {
    switch (choice) {
      case "Attack":
        await this.chooseTargetFromList(this.Opponent);
        if (this.target && this.fighter) this.target.Damaged(this.fighter.str);
        this.isTargetAlive();
        break;
      case "Heal":
        await this.chooseTargetFromList(this.Hero);
        if (this.target instanceof Hero) this.target.heal();
        break;
    }
    return;
  }

  async chooseTargetFromList(list: Entity[] | Hero[]) {
    const choice = await User.getUserInputFromListOfObjects(
      list,
      "Choose your target:",
      "Target"
    );
    this.setTarget(choice.Target.Object);
  }

  opponentTurn() {
    this.getRandomElementFromList(this.Hero);
    if (this.target && this.fighter) this.target.Damaged(this.fighter.str);
    this.isTargetAlive();
    this.displayEffect();
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
      this.Hero.splice(this.Hero.indexOf(this.target), 1);
    } else if (this.target) {
      this.Opponent.splice(this.Opponent.indexOf(this.target), 1);
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
