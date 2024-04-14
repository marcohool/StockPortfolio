import React from "react";
import RatioList from "../../Components/RatioList/RatioList";
import { Table } from "../../Components/Table/Table";
import { CompanyKeyMetrics } from "../../company";
import { testIncomeStatementData } from "../../Components/Table/testData";

interface Props {}

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: CompanyKeyMetrics) => company.marketCapTTM,
  },
];

export const DesignPage: React.FC<Props> = (props) => {
  return (
    <div>
      <h1>StockPortfolio Design Page</h1>
      <h2>
        This is StockPortfolio's design page. This is where we will house
        various design aspects of the app.
      </h2>
      <RatioList data={testIncomeStatementData} config={tableConfig} />
      <Table />
    </div>
  );
};
