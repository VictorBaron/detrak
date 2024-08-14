"use client";

import { useState } from "react";
import { createContext } from "react";
import { Coordinates } from "./Cell/Cell";

type Game = Array<Array<number | null>>;
const initialGame: Game = [
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
];

export const GameCenterContext = createContext<{
  selectedDice: number | null;
  setSelectedDice: (dice: number | null) => void;
  game: Game;
  play: ({
    value,
    coordinates,
  }: {
    value: number;
    coordinates: Coordinates;
  }) => void;
  startNewGame: () => void;
}>({
  selectedDice: 0,
  setSelectedDice: () => null,
  game: initialGame,
  play: () => null,
  startNewGame: () => null,
});

export const GameCenterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedDice, setSelectedDice] = useState<number | null>(null);
  const [game, setGame] = useState<Game>(initialGame);

  const play = ({
    value,
    coordinates,
  }: {
    value: number;
    coordinates: Coordinates;
  }) => {
    setGame((game) => {
      game[coordinates.y][coordinates.x] = value;
      return game;
    });
    setSelectedDice(null);
  };

  const startNewGame = () => {
    window.location.reload();
    setGame(() => [...initialGame]);
    setSelectedDice(null);
  };

  return (
    <GameCenterContext.Provider
      value={{ selectedDice, setSelectedDice, game, play, startNewGame }}
    >
      {children}
    </GameCenterContext.Provider>
  );
};
