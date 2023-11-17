import { Board, Coordinates } from "../board/Board";
import { DieValue } from "../dice/Die";
import { Game } from "../game/Game";

export class Player {
  constructor(id: string, game: Game, board: Board, name?: string) {
    this.id = id;
    this._board = board;
    this.game = game;
    this.playedDice = [];
    this.name = name ?? "Paul Hochon";
  }

  private id: string;
  private game: Game;
  private _board: Board;
  name: string;
  get board() {
    return this._board;
  }

  get currentDice() {
    return this.game.dice.map((d) => d.value);
  }

  playedDice: DieValue[];

  play(value: DieValue, coordinates: Coordinates) {
    if (!this.currentDice.includes(value)) {
      throw Error("Value not in the game current throw !");
    }
    if (this.hasAlreadyPlayedThisDie(value))
      throw Error("Die already played !");

    this.board.play(value, coordinates);
    this.playedDice.push(value);
  }

  hasAlreadyPlayedThisDie(value: DieValue) {
    if (this.playedDice.length === 0) return false;
    if (this.playedDice.length > 1) return true;
    const playedDice = [...this.playedDice, value];
    return !areDiceEqual(playedDice, this.currentDice);
  }

  nextTurn() {
    this.playedDice = [];
    this.board.nextTurn();
  }

  get score() {
    return this.board.score;
  }
  get detailedScore() {
    return this.board.detailedScore;
  }
}

const areDiceEqual = (first: DieValue[], second: DieValue[]) => {
  return (
    (first[0] === second[0] && first[1] === second[1]) ||
    (first[0] === second[1] && first[1] === second[0])
  );
};
