import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CompanyProfile } from "../../company";
import { getCompanyProfile } from "../../api";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import { CompanyDashboard } from "../../Components/CompanyDashboard/CompanyDashboard";
import { Tile } from "../../Components/Tile/Tile";
import Spinner from "../../Components/Spinner/Spinner";
import TenKFinder from "../../Components/TenKFinder/TenKFinder";
import { formatLargeMonetaryNumber } from "../../Helpers/NumberFormatting";

interface Props {}

export const CompanyPage: React.FC<Props> = (props) => {
  let { ticker } = useParams<{ ticker: string }>();
  const [company, setCompany] = useState<CompanyProfile>();

  useEffect(() => {
    const getProfileInit = async () => {
      const result = await getCompanyProfile(ticker!);

      if (!result.error) {
        setCompany(result.data[0]);
      } else {
        console.error(result.error);
      }
    };

    getProfileInit();
  }, []);

  return (
    <>
      {company ? (
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
          <Sidebar />
          <CompanyDashboard ticker={ticker!}>
            <div className="grid grid-cols-4 gap-6 w-full">
              <Tile title="Company Name" subtitle={company.companyName} />
              <Tile title="Sector" subtitle={company.sector} />
              <Tile
                title="Price"
                subtitle={formatLargeMonetaryNumber(company.price.toString())}
              />
              <Tile
                title="Market Cap"
                subtitle={formatLargeMonetaryNumber(company.mktCap.toString())}
              />
            </div>
            <TenKFinder ticker={company.symbol} />
            <p className="bg-white shadow rounded text-medium text-gray-900 p-3 mt-1">
              {company.description}
            </p>
          </CompanyDashboard>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};
