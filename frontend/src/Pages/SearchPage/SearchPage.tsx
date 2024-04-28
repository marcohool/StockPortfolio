import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import Search from "../../Components/Search/Search";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import CardList from "../../Components/CardList/CardList";
import { CompanySearch } from "../../company";
import { searchCompanies } from "../../api";
import { PortfolioGet } from "../../Models/Portfolio";
import {
  portfolioAddAPI,
  portfolioDeleteAPI,
  portfolioGetAPI,
} from "../../Services/PortfolioService";
import { handleError } from "../../Helpers/ErrorHandler";
import { toast } from "react-toastify";

interface Props {}

export const SearchPage: React.FC<Props> = (props) => {
  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>(
    [],
  );
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    getPortfolio();
  }, []);

  const onPortfolioCreate = async (e: any) => {
    e.preventDefault();
    portfolioAddAPI(e.target[0].value)
      .then((res) => {
        if (res?.status === 204) {
          toast.success("Added to portfolio");
          getPortfolio();
        }
      })
      .catch(() => {
        toast.warning("Failed to add to portfolio");
      });
  };

  const onPortfolioDelete = async (e: any) => {
    e.preventDefault();
    portfolioDeleteAPI(e.target[0].value)
      .then((res) => {
        if (res?.status === 200) {
          toast.success("Deleted from portfolio");
          getPortfolio();
        }
      })
      .catch(() => {
        toast.warning("Failed to delete from portfolio");
      });
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e);
  };

  const getPortfolio = () => {
    portfolioGetAPI()
      .then((res) => {
        if (res?.data) {
          setPortfolioValues(res.data);
        }
      })
      .catch(() => {
        toast.warning("Failed to get portfolio");
      });
  };

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await searchCompanies(search);

    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result.data)) {
      setSearchResult(result.data);
    }
  };

  return (
    <div className="Search">
      <Search
        onSearchSubmit={onSearchSubmit}
        search={search}
        handleSearchChange={handleSearchChange}
      />
      <ListPortfolio
        portfolioValues={portfolioValues!}
        onPortfolioDelete={onPortfolioDelete}
      />
      {serverError && <h1>{serverError}</h1>}
      <CardList
        searchResults={searchResult}
        onPortfolioCreate={onPortfolioCreate}
      />
    </div>
  );
};
