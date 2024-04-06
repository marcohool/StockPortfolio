import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import "./App.css";
import CardList from "./Components/CardList/CardList";
import Search from "./Components/Search/Search";
import { Upload } from "./upload";
import { getUpload } from "./api";

function App() {
  const [search, setSearch] = useState<string>("");
  const [uploadResult, setUploadResult] = useState<Upload>({
    id: 0,
    title: "",
    description: "",
    uploadTimestamp: "",
    imagePath: "",
    status: "",
  });
  const [serverError, setServerError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e);
  };

  const onClick = async (e: SyntheticEvent) => {
    const result = await getUpload(search);

    if (typeof result === "string") {
      setServerError(result);
    } else {
      setUploadResult(result.data);
    }
    console.log(uploadResult);
  };

  return (
    <div className="App">
      <Search onClick={onClick} search={search} handleChange={handleChange} />
      {serverError && <h1>{serverError}</h1>}
      <CardList result={uploadResult} />
    </div>
  );
}

export default App;
