import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Language from "./components/Language";

function App() {
  const { t } = useTranslation();
  const [createdAtDate, setCreatedAtDate] = useState("");
  const [searchText, setSearchText] = useState("");
  const [language, setLanguage] = useState("en-US");
  const [responceDate, setResponceDate] = useState("");

  useEffect(() => {
    if (responceDate) formatDate(responceDate);
  }, [language]);

  const handleEnterSearch = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = async () => {
    const repoURL = searchText;
    const checkURL = /^(https:\/\/)?github\.com\/[\w-]+\/[\w-]+$/.test(repoURL);
    try {
      if (checkURL) {
        const UrlPart = repoURL.split("/");

        const repoName = UrlPart[UrlPart.length - 1];
        const username = UrlPart[UrlPart.length - 2];

        const getURL =
          "https://api.github.com/repos/" + username + "/" + repoName;
        const response = await axios.get(getURL);
        setResponceDate(response.data.created_at);
        formatDate(response.data.created_at);
      } else {
        alert(repoURL + t("notValid"));
        setCreatedAtDate("");
        
      }
    } catch (error) {
      alert("Oops");
      setCreatedAtDate("");
      console.error(error);
    }
  };

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const createDate = new Date(date).toLocaleDateString(language, options);
    setCreatedAtDate(createDate);
  };
  return (
    <>
      <div className="main">
        <div className="title">{t("title")}</div>
        <div className="sub-title">{t("subtitle")}</div>
        <div className="search">
          <input
            className="search-input"
            placeholder="https://github.com/ihsanberkozcan/github-repo-creation-date"
            onKeyPress={handleEnterSearch}
            onChange={handleSearchText}
          />
          <button className="search-button" onClick={handleSearch}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </div>
      {createdAtDate ? (
        <>
          <div className="date-title">{t("createdAt")}</div>
          <div className="date">{createdAtDate}</div>
        </>
      ) : (
        <></>
      )}
      <Language setLanguage={setLanguage} />
    </>
  );
}

export default App;
