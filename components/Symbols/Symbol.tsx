import { Circle } from "./Circle";
import { Cross } from "./Cross";
import { Hashtag } from "./Hashtag";
import { SingleBaton } from "./SingleBaton";
import { Triangle } from "./Triangle";
import { TripleBaton } from "./TripleBaton";

export const Symbol = ({ value }: { value: number | null }) => {
  switch (value) {
    case 1:
      return <Triangle />;
    case 2:
      return <Cross />;
    case 3:
      return <Circle />;
    case 4:
      return <Hashtag />;
    case 5:
      return <SingleBaton />;
    case 6:
      return <TripleBaton />;
    default:
      return <>{value}</>;
  }
};
