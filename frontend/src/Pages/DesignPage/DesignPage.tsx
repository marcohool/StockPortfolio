import React from "react";
import RatioList from "../../Components/RadioList/RadioList";
import { Table } from "../../Components/Table/Table";

interface Props {}

export const DesignPage: React.FC<Props> = (props) => {
  return (
    <div>
      <h1>StockPortfolio Design Page</h1>
      <h2>
        This is StockPortfolio's design page. This is where we will house
        various design aspects of the app.
      </h2>
      <RatioList />
      <Table />
    </div>
  );
};
