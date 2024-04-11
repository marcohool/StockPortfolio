import React from "react";
import { testIncomeStatementData } from "./testData";

interface Props {}

type Company = (typeof data)[0];
const data = testIncomeStatementData;
const configs = [
  {
    label: "Year",
    render: (company: Company) => company.acceptedDate,
  },
  {
    label: "Revenue",
    render: (company: Company) => company.revenue,
  },
];

export const Table: React.FC<Props> = (props) => {
  const renderedRows = data.map((company) => {
    return (
      <tr key={company.cik}>
        {configs.map((val: any) => {
          return (
            <td
              key={val.label}
              className="p-4 whitespace-nowrap text-sm font-normal text-gray-900"
            >
              {val.render(company)}
            </td>
          );
        })}
      </tr>
    );
  });

  const renderedHeader = configs.map((config: any) => {
    return (
      <th
        key={config.label}
        className="p4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        {config.label}
      </th>
    );
  });

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
      <table>
        <thead className="min-w-full divide-y divide=gray-200 m-5">
          <tr>{renderedHeader}</tr>
        </thead>
        <tbody>{renderedRows}</tbody>
      </table>
    </div>
  );
};
