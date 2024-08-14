import { Coordinates } from "@/components/Cell/Cell";

export class LineScore {
  constructor(
    public readonly coordinates: [
      Coordinates,
      Coordinates,
      Coordinates,
      Coordinates,
      Coordinates
    ],
    public readonly doubleScore: boolean
  ) {}

  score(gridValues: (number | null)[][]) {
    const scores = [0, 2, 3, 8, 10];
    const values = this.coordinates.map(
      (coordinate) => gridValues[coordinate.x][coordinate.y]
    );
    let currentScoreIndex = 0;
    const score = values.reduce<number>((total, val, index) => {
      if (val === null || index === 0) {
        const newTotal = total + scores[currentScoreIndex];
        currentScoreIndex = 0;
        return newTotal;
      }
      if (val === values[index - 1]) {
        currentScoreIndex++;
      }
      if (index === 4) return total + scores[currentScoreIndex];
      return total;
    }, 0);

    const finalScore = score === 0 ? -5 : score;
    return this.doubleScore ? finalScore * 2 : finalScore;
  }
}
