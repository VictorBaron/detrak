import { useContext } from "react";
import { GameCenterContext } from "../GameCenter.context";
import "./NewGame.scss";

export const NewGame = () => {
  const { startNewGame } = useContext(GameCenterContext);
  return (
    <button className="new-game" onClick={startNewGame}>
      New Game
    </button>
  );
};
