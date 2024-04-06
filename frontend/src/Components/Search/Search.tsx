import React, { ChangeEvent, useState, SyntheticEvent } from "react";

interface Props {
  search: string | undefined;
  onClick: (e: SyntheticEvent) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const Search: React.FC<Props> = ({ onClick, search, handleChange }: Props) => {
  return (
    <div>
      <input value={search} onChange={(e) => handleChange(e)} />
      <button onClick={(e) => onClick(e)}>Search</button>
    </div>
  );
};

export default Search;
