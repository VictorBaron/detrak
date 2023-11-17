import { randomInt } from "crypto";
import { DieValue } from "./dice/Die";

export const randomDiceValue = () => {
  const randomVal = randomInt(6) as DieValue;
  return randomVal;
};
