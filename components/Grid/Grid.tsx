"use client";
import { Cell, Coordinates } from "../Cell/Cell";
import { ScoreCell } from "../ScoreCell/ScoreCell";
import "./Grid.scss";

export const Grid = () => {
  return (
    <table className="detrak-grid">
      {Array.from({ length: 5 }, (_, j) => (
        <tr key={j} className="detrak-grid-row">
          {Array.from({ length: 5 }, (_, i) => (
            <Cell key={i} coordinates={new Coordinates(i, j)} />
          ))}
          <ScoreCell
            coordinates={[
              new Coordinates(j, 0),
              new Coordinates(j, 1),
              new Coordinates(j, 2),
              new Coordinates(j, 3),
              new Coordinates(j, 4),
            ]}
          />
        </tr>
      ))}
      <tr className="detrak-grid-row">
        <ScoreCell
          coordinates={[
            new Coordinates(0, 0),
            new Coordinates(1, 0),
            new Coordinates(2, 0),
            new Coordinates(3, 0),
            new Coordinates(4, 0),
          ]}
        />
        <ScoreCell
          coordinates={[
            new Coordinates(0, 1),
            new Coordinates(1, 1),
            new Coordinates(2, 1),
            new Coordinates(3, 1),
            new Coordinates(4, 1),
          ]}
        />
        <ScoreCell
          coordinates={[
            new Coordinates(0, 2),
            new Coordinates(1, 2),
            new Coordinates(2, 2),
            new Coordinates(3, 2),
            new Coordinates(4, 2),
          ]}
        />
        <ScoreCell
          coordinates={[
            new Coordinates(0, 3),
            new Coordinates(1, 3),
            new Coordinates(2, 3),
            new Coordinates(3, 3),
            new Coordinates(4, 3),
          ]}
        />
        <ScoreCell
          coordinates={[
            new Coordinates(0, 4),
            new Coordinates(1, 4),
            new Coordinates(2, 4),
            new Coordinates(3, 4),
            new Coordinates(4, 4),
          ]}
        />
        <ScoreCell
          coordinates={[
            new Coordinates(0, 0),
            new Coordinates(1, 1),
            new Coordinates(2, 2),
            new Coordinates(3, 3),
            new Coordinates(4, 4),
          ]}
          doubleScore
        />
      </tr>
    </table>
  );
};
