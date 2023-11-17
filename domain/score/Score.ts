import { Board, Coordinates } from "../board/Board";
import { Line } from "./Line";

export class Score {
  constructor(board: Board) {
    this.rows = [
      new Line(board, [
        new Coordinates(0, 0),
        new Coordinates(1, 0),
        new Coordinates(2, 0),
        new Coordinates(3, 0),
        new Coordinates(4, 0),
      ]),
      new Line(board, [
        new Coordinates(0, 1),
        new Coordinates(1, 1),
        new Coordinates(2, 1),
        new Coordinates(3, 1),
        new Coordinates(4, 1),
      ]),
      new Line(board, [
        new Coordinates(0, 2),
        new Coordinates(1, 2),
        new Coordinates(2, 2),
        new Coordinates(3, 2),
        new Coordinates(4, 2),
      ]),
      new Line(board, [
        new Coordinates(0, 3),
        new Coordinates(1, 3),
        new Coordinates(2, 3),
        new Coordinates(3, 3),
        new Coordinates(4, 3),
      ]),
      new Line(board, [
        new Coordinates(0, 4),
        new Coordinates(1, 4),
        new Coordinates(2, 4),
        new Coordinates(3, 4),
        new Coordinates(4, 4),
      ]),
    ];

    this.columns = [
      new Line(board, [
        new Coordinates(0, 0),
        new Coordinates(0, 1),
        new Coordinates(0, 2),
        new Coordinates(0, 3),
        new Coordinates(0, 4),
      ]),
      new Line(board, [
        new Coordinates(1, 0),
        new Coordinates(1, 1),
        new Coordinates(1, 2),
        new Coordinates(1, 3),
        new Coordinates(1, 4),
      ]),
      new Line(board, [
        new Coordinates(2, 0),
        new Coordinates(2, 1),
        new Coordinates(2, 2),
        new Coordinates(2, 3),
        new Coordinates(2, 4),
      ]),
      new Line(board, [
        new Coordinates(3, 0),
        new Coordinates(3, 1),
        new Coordinates(3, 2),
        new Coordinates(3, 3),
        new Coordinates(3, 4),
      ]),
      new Line(board, [
        new Coordinates(4, 0),
        new Coordinates(4, 1),
        new Coordinates(4, 2),
        new Coordinates(4, 3),
        new Coordinates(4, 4),
      ]),
    ];
    this.diagonals = [
      new Line(board, [
        new Coordinates(4, 0),
        new Coordinates(3, 1),
        new Coordinates(2, 2),
        new Coordinates(1, 3),
        new Coordinates(0, 4),
      ]),
      new Line(board, [
        new Coordinates(4, 0),
        new Coordinates(3, 1),
        new Coordinates(2, 2),
        new Coordinates(1, 3),
        new Coordinates(0, 4),
      ]),
    ];
  }

  private rows: [Line, Line, Line, Line, Line];
  private columns: [Line, Line, Line, Line, Line];
  private diagonals: [Line, Line];

  get score(): number {
    return [...this.rows, ...this.columns, ...this.diagonals]
      .map((r) => r.score)
      .reduce((a, b) => a + b, 0);
  }

  get detailedScore() {
    return {
      rows: this.rows.map((r) => r.score),
      columns: this.columns.map((r) => r.score),
      diagonal: this.diagonals[0].score,
    };
  }
}
