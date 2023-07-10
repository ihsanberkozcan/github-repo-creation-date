import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Language from "./components/Language";

function App() {
  const { t } = useTranslation();
  const [createdAtDate, setCreatedAtDate] = useState("");
  const [language, setLanguage] = useState("en-US");
  const [responceDate, setResponceDate] = useState("");

  useEffect(() => {
    if (responceDate) formatDate(responceDate);
  }, [language]);

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      const repoURL = e.target.value;
      const checkURL = /^(https:\/\/)?github\.com\/[\w-]+\/[\w-]+$/.test(
        repoURL
      );
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
        }
      } catch (error) {
        console.error(error);
      }
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
        <input
          className="search"
          placeholder="https://github.com/ihsanberkozcan/github-repo-creation-date"
          onKeyPress={handleSearch}
        />
      </div>
      {createdAtDate ? (
        <>
          <div className="date-title">{t("createdAt")}</div>
          <div className="date">{createdAtDate}</div>
        </>
      ) : (
        <></>
      )}
      <Language setLanguage={setLanguage}/>
     
    </>
  );
}

export default App;
