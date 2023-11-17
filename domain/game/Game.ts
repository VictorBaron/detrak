import { Board } from "../board/Board";
import { Die } from "../dice/Die";
import { Player } from "../player/Player";

export class Game {
  constructor({
    players,
    board,
  }: {
    players: { playerId: string }[];
    board?: Board;
  }) {
    const die = new Die();
    const firstRoll = die.roll();

    this.players = players.map(
      ({ playerId }) =>
        new Player(playerId, this, board ?? Board.create(firstRoll))
    );
    this.dice = [new Die(), new Die()];
    this.numberOfThrows = 0;
  }

  players: Player[];
  dice: [Die, Die];
  private numberOfThrows: number;

  start() {
    this.rollDice();
  }

  private rollDice() {
    this.dice[0].roll();
    this.dice[1].roll();
    this.numberOfThrows++;
  }

  get hasEverybodyPlayed() {
    return this.players.every((player) => player.board.isTurnFinished);
  }

  endGame() {
    if (!this.winners) return;
    const numberOfWinners = this.winners.length;
    if (numberOfWinners === 1) {
      const winner = this.winners[0];
      console.log(`Victoire de ${winner.name} !`);
      return;
    }
    console.log(
      `Victoire de ${this.winners.reduce((str, winner, index) => {
        const isFirst = index === 0;
        const isLast = index === numberOfWinners - 1;
        const joiningStr = isFirst ? "" : isLast ? " et " : ", ";
        return `${str}${joiningStr}${winner.name}`;
      }, "")} !`
    );
  }

  get winners(): Player[] | null {
    if (!this.isFinished) return null;

    const maxScore = this.players.reduce(
      (maxScore, player) => Math.max(maxScore, player.score),
      -50
    );
    return this.players.filter((player) => player.score === maxScore);
  }

  get isFinished() {
    return this.numberOfThrows === 12;
  }

  nextTurn() {
    if (!this.hasEverybodyPlayed) throw Error("Someone still needs to play !");
    if (this.isFinished) {
      this.endGame();
      return;
    }

    this.players.forEach((player) => {
      player.nextTurn();
    });
    this.rollDice();
  }

  get score(): number {
    return 0;
  }
}
