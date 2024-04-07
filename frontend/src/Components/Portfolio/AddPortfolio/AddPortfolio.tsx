import React from "react";

interface Props {
  onPortfolioCreate: (e: React.FormEvent<HTMLFormElement>) => void;
  symbol: string;
}

const AddPortfolio: React.FC<Props> = ({
  onPortfolioCreate,
  symbol,
}: Props) => {
  return (
    <form onSubmit={onPortfolioCreate}>
      <input readOnly={true} hidden={true} value={symbol} />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddPortfolio;
