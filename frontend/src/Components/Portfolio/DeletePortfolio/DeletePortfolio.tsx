import React from "react";

interface Props {
  onPortfolioDelete: (e: React.FormEvent<HTMLFormElement>) => void;
  portfolioValue: string;
}

const DeletePortfolio: React.FC<Props> = ({
  onPortfolioDelete,
  portfolioValue,
}: Props) => {
  return (
    <div>
      <form onSubmit={onPortfolioDelete}>
        <input hidden={true} value={portfolioValue} />
        <button>X</button>
      </form>
    </div>
  );
};

export default DeletePortfolio;
