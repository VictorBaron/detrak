import { Coordinates } from "./Board";

export class DiceNotPlayedNextToEachOtherError extends Error {
  constructor(coordinates1: Coordinates, coordinates2: Coordinates) {
    super();
    this.message = `Must play in adjacent squares ! ${coordinates1.toString()} not next to ${coordinates2.toString()}`;
  }
}
