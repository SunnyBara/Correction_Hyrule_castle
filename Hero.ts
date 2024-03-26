import Entity from "./Entity";
import { EntityInterface } from "./EntityInterface";

export default class Hero extends Entity {
  constructor(entity: EntityInterface) {
    super(entity);
  }
  public heal() {
    const Heal: number = this.calculheal();
    const Health: number = this.CheckOverHeal(Heal);
    this.setHp(Health);
    return;
  }

  private calculheal() {
    return this.HpMax / 2;
  }
}
