export default class Tower {
  public Floor_max: number;
  public current_Floor: number;
  constructor(Max_Floor: number) {
    this.Floor_max = Max_Floor;
    this.current_Floor = 1;
  }
  nextFloor() {
    this.current_Floor += 1;
  }
  getCurrentFloor() {
    return this.current_Floor;
  }
}
