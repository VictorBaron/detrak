import { DieValue } from "../dice/Die";
import { Score } from "../score/Score";
import { DiceNotPlayedNextToEachOtherError } from "./errors";

export const emptyRow = (): Row => [null, null, null, null, null];
export const emptyGrid = (): Grid => [
  emptyRow(),
  emptyRow(),
  emptyRow(),
  emptyRow(),
  emptyRow(),
];

type Row = [SquareValue, SquareValue, SquareValue, SquareValue, SquareValue];
type Grid = [Row, Row, Row, Row, Row];

export class Board {
  constructor(grid: Grid) {
    this._grid = grid;
    this.currentTurnPlays = [];
    this._score = new Score(this);
  }

  static create(initValue: DieValue) {
    const grid = emptyGrid();
    grid[0][0] = initValue;
    return new Board(grid);
  }

  private _score: Score;
  get score() {
    return this._score.score;
  }
  get detailedScore() {
    return this._score.detailedScore;
  }

  private _grid: SquareValue[][];
  get grid() {
    return this._grid;
  }

  private get firstDieCoordinates(): Coordinates | null {
    return this.currentTurnPlays[0] ?? null;
  }

  private currentTurnPlays: Coordinates[];

  play(val: DieValue, coordinates: Coordinates) {
    if (!this.isValidSquareToPlay(coordinates)) {
      throw Error(
        `Square not available to play ! ${coordinates.x}/${coordinates.y}`
      );
    }
    if (this.shouldBePlacedNextToFirst(coordinates)) {
      throw new DiceNotPlayedNextToEachOtherError(
        coordinates,
        this.firstDieCoordinates!
      );
    }
    if (this.hasAlreadyPlayedTwice) {
      throw Error("Has already played twice !");
    }

    this.savePlay(coordinates);
    this._grid[coordinates.y][coordinates.x] = val;
  }

  get hasAlreadyPlayedTwice() {
    return this.currentTurnPlays.length === 2;
  }

  nextTurn() {
    this.currentTurnPlays = [];
  }

  shouldBePlacedNextToFirst(coordinates: Coordinates): boolean {
    if (this.firstDieCoordinates === null) return false;

    const isAdjacent = this.getAdjacentSquares(this.firstDieCoordinates).some(
      (c) => coordinates.isEqualTo(c)
    );
    return !isAdjacent;
  }

  getAdjacentSquares({ x, y }: Coordinates): Coordinates[] {
    const adjacentCoordinates = [
      Coordinates.build(x - 1, y),
      Coordinates.build(x + 1, y),
      Coordinates.build(x, y - 1),
      Coordinates.build(x, y + 1),
    ];

    return adjacentCoordinates.filter((c): c is Coordinates => !!c);
  }

  private savePlay(coordinates: Coordinates) {
    this.currentTurnPlays.push(coordinates);
    return;
  }

  get isTurnFinished(): boolean {
    if (this.currentTurnPlays.length === 2) return true;
    return this.hasMadeASusu;
  }

  private get hasMadeASusu(): boolean {
    if (!this.firstDieCoordinates) return false;
    const canPlaySecondDie = this.getAdjacentSquares(
      this.firstDieCoordinates
    ).some((coordinates) => this.isValidSquareToPlay(coordinates));
    return !canPlaySecondDie;
  }

  isValidSquareToPlay({ x, y }: Coordinates) {
    return this.grid[y][x] === null;
  }

  squareValue(coordinates: Coordinates) {
    return this.grid[coordinates.y][coordinates.x];
  }
}

type SquareValue = DieValue | null;
type X = 0 | 1 | 2 | 3 | 4;
type Y = X;

export class Coordinates {
  x: X;
  y: Y;

  constructor(x: X, y: Y) {
    this.x = x;
    this.y = y;
  }

  static build(x: number, y: number) {
    if (x < 0 || x > 4 || y < 0 || y > 4) return;
    return new Coordinates(x as X, y as Y);
  }

  toString() {
    return `${this.x}/${this.y}`;
  }
  isEqualTo(coordinates: Coordinates) {
    return this.x === coordinates.x && this.y === coordinates.y;
  }
}
