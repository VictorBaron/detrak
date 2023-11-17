import { Board } from "./board/Board";
import { Game } from "./game/Game";

jest.mock("./helpers.ts", () => ({
  ...jest.requireActual("./helpers.ts"),
  randomDiceValue: jest.fn(() => 1),
}));

describe("Initiate the game with a player", () => {
  it("Player has -5 in every line", () => {
    const game = new Game({
      players: [{ playerId: "id1" }],
    });

    expect(game.players[0].score).toBe(-60);
    expect(game.players[0].detailedScore).toMatchObject({
      rows: [-5, -5, -5, -5, -5],
      columns: [-5, -5, -5, -5, -5],
      diagonal: -5,
    });
  });
});

describe("The game is ongoing", () => {
  it("Player has 2 in every line, 2 in the diagonal, 5 in 2 columns", () => {
    const game = new Game({
      players: [{ playerId: "id1" }],
      board: new Board([
        [1, 1, null, null, null],
        [1, 1, null, null, null],
        [1, 1, null, null, null],
        [1, 1, null, null, null],
        [1, 1, null, null, null],
      ]),
    });

    expect(game.players[0].score).toBe(19);
    expect(game.players[0].detailedScore).toMatchObject({
      rows: [2, 2, 2, 2, 2],
      columns: [10, 10, -5, -5, -5],
      diagonal: 2,
    });
  });
});
