import { randomDiceValue } from "../helpers";

export type DieValue = 1 | 2 | 3 | 4 | 5 | 6;
export class Die {
  constructor() {
    this._value = randomDiceValue();
  }

  private _value: DieValue;
  get value() {
    return this._value;
  }

  public roll() {
    const randomVal = randomDiceValue();
    this._value = randomVal;
    return randomVal;
  }
}
