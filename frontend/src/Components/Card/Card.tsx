import React, { ReactElement } from "react";
import "./Card.css";

interface Props {
  companyName: string;
  ticker: string;
  price: number;
}

const Card: React.FC<Props> = ({
  companyName,
  ticker,
  price,
}: Props): ReactElement => {
  return (
    <div className="card">
      <img src="https://placehold.co/600x400" alt="placeholder" />
      <div className="details">
        <h2>
          {companyName} ({ticker})
        </h2>
        <p>${price}</p>
      </div>
      <div className="info">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, odit.
      </div>
    </div>
  );
};

export default Card;
