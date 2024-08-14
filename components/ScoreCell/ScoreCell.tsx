import { LineScore } from "@/domain/score/LineScore";
import { Coordinates } from "../Cell/Cell";
import { GameCenterContext } from "../GameCenter.context";
import { useContext } from "react";

export const ScoreCell = ({
  coordinates,
  doubleScore = false,
}: {
  coordinates: [
    Coordinates,
    Coordinates,
    Coordinates,
    Coordinates,
    Coordinates
  ];
  doubleScore?: boolean;
}) => {
  const { game } = useContext(GameCenterContext);

  const score = (() => {
    const lineScore = new LineScore(coordinates, doubleScore);
    return lineScore.score(game);
  })();
  return (
    <td className="detrak-score-cell">
      <div className="detrak-score-cell__content">{score}</div>
    </td>
  );
};
