import Entity from "./Entity";
import Hero from "./Hero";

export default class Color {
  static colorHeroBar(Entity: Entity | Hero) {
    const healthPercent = Math.round((Entity.Hp / Entity.HpMax) * 100);
    let color = "";
    if (healthPercent >= 50) {
      color = `\u001b[32m${Entity.healthBar.bar}\u001b[0m`; // Green
    } else if (healthPercent >= 25) {
      color = `\u001b[33m${Entity.healthBar.bar}\u001b[0m`; // Yellow
    } else {
      color = `\u001b[31m${Entity.healthBar.bar}\u001b[0m`; // Red
    }
    return color;
  }
  static colorOponentBar(Entity: Entity) {
    const healthPercent = Math.round((Entity.Hp / Entity.HpMax) * 100);
    let color = "";
    if (healthPercent >= 50) {
      color = `\u001b[36m${Entity.healthBar.bar}\u001b[0m`; // Cyan
    } else if (healthPercent >= 25) {
      color = `\u001b[34m${Entity.healthBar.bar}\u001b[0m`; // Blue
    } else {
      color = `\u001b[35m${Entity.healthBar.bar}\u001b[0m`; // Magenta
    }
    return color;
  }
}
