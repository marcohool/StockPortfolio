import React from "react";
import { Outlet } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  ticker: string;
}

export const CompanyDashboard: React.FC<Props> = ({
  children,
  ticker,
}: Props) => {
  return (
    <div className="relative md:ml-64 bg-blueGray-100 w-full">
      <div className="relative pt-20 pb-32 bg-lightBlue-500">
        <div className="px-4 md:px-6 mx-auto w-full">
          <div>
            <div className="flex flex-wrap m-4 space-y-4">{children}</div>
            <div className="flex flex-wrap m-4 mt-2">
              {<Outlet context={ticker} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
