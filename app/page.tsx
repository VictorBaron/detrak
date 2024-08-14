"use client";

import { Dice } from "@/components/Dice/Dice";
import { Grid } from "../components/Grid/Grid";
import { GameCenterProvider } from "@/components/GameCenter.context";
import "./MainPage.scss";
import { NewGame } from "@/components/NewGame/NewGame";

export default function Home() {
  return (
    <GameCenterProvider>
      <div className="main-page">
        <div className="header">
          <div />
          <h1>Detrak</h1>
          <NewGame />
        </div>
        <div className="game-container">
          <div className="dice-container">
            <Dice value={1} />
            <Dice value={2} />
            <Dice value={3} />
            <Dice value={4} />
            <Dice value={5} />
            <Dice value={6} />
          </div>

          <Grid />
        </div>
      </div>
    </GameCenterProvider>
  );
}
