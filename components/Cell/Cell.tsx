/* eslint-disable react/jsx-no-undef */
import { useContext } from "react";
import { GameCenterContext } from "../GameCenter.context";
import "./Cell.scss";
import { Symbol } from "../Symbols/Symbol";

export const Cell = ({ coordinates }: { coordinates: Coordinates }) => {
  const { play, game, selectedDice, setSelectedDice } =
    useContext(GameCenterContext);

  const playCell = () => {
    if (!selectedDice) return;
    if (value) return;
    play({ coordinates, value: selectedDice });
    setSelectedDice(null);
  };

  const value = (() => {
    return game[coordinates.y][coordinates.x];
  })();

  return (
    <td onClick={() => playCell()} className="detrak-cell">
      <Symbol value={value} />
    </td>
  );
};

export class Coordinates {
  constructor(public x: number, public y: number) {}
}
