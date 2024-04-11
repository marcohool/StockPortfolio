import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CompanyProfile } from "../../company";
import { getCompanyProfile } from "../../api";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import { CompanyDashboard } from "../../Components/CompanyDashboard/CompanyDashboard";
import { Tile } from "../../Components/Tile/Tile";

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
          <CompanyDashboard>
            <Tile title="Company Name" subtitle={company.companyName} />
          </CompanyDashboard>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
