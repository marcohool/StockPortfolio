import React, { ReactElement } from "react";
import Card from "../Card/Card";

interface Props {
  result: {
    id: number;
    title: string;
    description: string;
    uploadTimestamp: string;
    imagePath: string;
    status: string;
  };
}

const CardList: React.FC<Props> = (props: Props): ReactElement => {
  return (
    <div>
      <Card companyName={props.result.title} ticker="AAPL" price={100} />
    </div>
  );
};

export default CardList;
