import { NoErrorThrownError, getError } from "../common/errors";
import { Coordinates, emptyRow } from "./board/Board";
import { Game } from "./game/Game";

jest.mock("./helpers.ts", () => ({
  ...jest.requireActual("./helpers.ts"),
  randomDiceValue: jest.fn(() => 1),
}));

describe("Initiate the game with 2 players", () => {
  it("has 2 players, with the boards initialized", () => {
    const game = new Game({
      players: [{ playerId: "id1" }, { playerId: "id2" }],
    });
    const board = [
      [1, null, null, null, null],
      emptyRow(),
      emptyRow(),
      emptyRow(),
      emptyRow(),
    ];
    expect(game.players[0].board.grid).toMatchObject(board);
    expect(game.players[1].board.grid).toMatchObject(board);
  });
});

describe("We roll the dice.", () => {
  it("Players can play. After everybody played, the game can start another turn", () => {
    const game = new Game({
      players: [{ playerId: "id1" }, { playerId: "id2" }],
    });
    game.start();

    const player1 = game.players[0];
    const player2 = game.players[1];

    player1.play(game.dice[0].value, new Coordinates(1, 0));
    player1.play(game.dice[1].value, new Coordinates(2, 0));
    player2.play(game.dice[0].value, new Coordinates(1, 0));
    expect(game.hasEverybodyPlayed).toBe(false);

    player2.play(game.dice[1].value, new Coordinates(1, 1));
    expect(game.hasEverybodyPlayed).toBe(true);
  });
});

describe("Every player played. We can start another turn", () => {
  it("Another turn can start. Players can play it.", () => {
    const game = new Game({
      players: [{ playerId: "id1" }],
    });
    game.start();

    const player1 = game.players[0];

    player1.play(game.dice[0].value, new Coordinates(2, 0));
    player1.play(game.dice[1].value, new Coordinates(3, 0));

    game.nextTurn();

    player1.play(game.dice[0].value, new Coordinates(4, 1));
    player1.play(game.dice[1].value, new Coordinates(4, 2));
  });
});

describe("Player made a Susu", () => {
  it("Another turn can start, & Players can play it.", () => {
    const game = new Game({
      players: [{ playerId: "id1" }],
    });
    game.start();

    const player1 = game.players[0];

    player1.play(game.dice[0].value, new Coordinates(2, 0));
    player1.play(game.dice[1].value, new Coordinates(3, 0));

    game.nextTurn();

    player1.play(game.dice[0].value, new Coordinates(4, 1));
    player1.play(game.dice[1].value, new Coordinates(4, 2));

    game.nextTurn();
    player1.play(game.dice[0].value, new Coordinates(4, 0));

    expect(game.hasEverybodyPlayed).toBe(true);
  });
});

describe("Player tries to play on non-adjacent squares", () => {
  it("throws an error", () => {
    const game = new Game({
      players: [{ playerId: "id1" }],
    });
    game.start();

    const player1 = game.players[0];

    player1.play(game.dice[0].value, new Coordinates(2, 0));

    const error = getError(() =>
      player1.play(game.dice[1].value, new Coordinates(4, 0))
    );

    expect(error).toBeInstanceOf(Error);
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
  });
});
