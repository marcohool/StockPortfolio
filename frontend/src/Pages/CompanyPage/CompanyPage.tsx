import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CompanyProfile } from "../../company";
import { getCompanyProfile } from "../../api";

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
    <>{company ? <div>{company.companyName}</div> : <div>Loading...</div>}</>
  );
};
