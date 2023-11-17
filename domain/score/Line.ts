import { Board, Coordinates } from "../board/Board";

export class Line {
  constructor(
    board: Board,
    coordinates: [
      Coordinates,
      Coordinates,
      Coordinates,
      Coordinates,
      Coordinates
    ]
  ) {
    this.board = board;
    this.coordinates = coordinates;
  }

  private board: Board;
  private coordinates: [
    Coordinates,
    Coordinates,
    Coordinates,
    Coordinates,
    Coordinates
  ];

  get values() {
    return this.coordinates.map((c) => this.board.squareValue(c));
  }

  get score() {
    const values = [0, 2, 3, 8, 10];
    let currentScoreIndex = 0;
    const score = this.values.reduce((total, val, index) => {
      if (val === null || index === 0) {
        const newTotal = total + values[currentScoreIndex];
        currentScoreIndex = 0;
        return newTotal;
      }
      if (val === this.values[index - 1]) {
        currentScoreIndex++;
      }
      if (index === 4) return total + values[currentScoreIndex];
      return total;
    }, 0);

    return score === 0 ? -5 : score;
  }
}
