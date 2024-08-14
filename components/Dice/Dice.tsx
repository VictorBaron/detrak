import { useContext } from "react";
import { GameCenterContext } from "../GameCenter.context";
import { Symbol } from "../Symbols/Symbol";
import "./Dice.scss";

export const Dice = ({ value }: { value: number }) => {
  const { selectedDice, setSelectedDice } = useContext(GameCenterContext);
  const selected = selectedDice === value;
  return (
    <div
      onClick={() => setSelectedDice(value)}
      className={`dice ${selected ? "dice__selected" : ""}`}
    >
      <Symbol value={value} />
    </div>
  );
};
