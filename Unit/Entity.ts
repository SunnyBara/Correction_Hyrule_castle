import Display from "../Display/Display";
import { EntityInterface } from "./EntityInterface";
import HealthBar from "./HealthBar";

export default class Entity implements EntityInterface {
  public name: string;
  public Hp: number;
  public HpMax: number;
  public str: number;
  public Mp: number;
  public MpMax: number;
  public int: number;
  public def: number;
  public res: number;
  public spd: number;
  public luck: number;
  public race: number;
  public class: number;
  public rarity: number;
  public healthBar: HealthBar;
  constructor(entity: EntityInterface) {
    this.name = entity.name;
    this.Hp = entity.Hp;
    this.HpMax = entity.Hp;
    this.str = entity.str;
    this.Mp = entity.Mp;
    this.MpMax = entity.Mp;
    this.int = entity.int;
    this.def = entity.def;
    this.res = entity.res;
    this.spd = entity.spd;
    this.luck = entity.luck;
    this.race = entity.race;
    this.class = entity.class;
    this.rarity = entity.rarity;
    this.healthBar = { bar: "", color: null };
    this.setHealthBar(Display.initHpBar(this));
  }
  public getStr() {
    return this.str;
  }
  public getHp() {
    return this.Hp;
  }
  public getHpmax() {
    return this.HpMax;
  }
  public setHp(Hp: number) {
    this.Hp = Hp;
  }

  public setHealthBar(healthBar: HealthBar) {
    this.healthBar = healthBar;
    return;
  }
  public CheckOverHeal(heal: number) {
    this.Hp += heal;
    return this.Hp > this.HpMax ? this.HpMax : this.Hp;
  }

  public CheckOverkill(damage: number) {
    this.Hp -= damage;
    return this.Hp < 0 ? 0 : this.Hp;
  }

  public Damaged(damage: number) {
    const Hp = this.CheckOverkill(damage);
    this.setHp(Hp);
    return;
  }
}
