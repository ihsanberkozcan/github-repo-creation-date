import axios from "axios";
import "./App.css";
import { useState } from "react";

function App() {
  const [createdAtDate, setCreatedAtDate] = useState("");
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
          const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
          };
          const createDate = new Date(
            response.data.created_at
          ).toLocaleDateString("en-US", options);
          setCreatedAtDate(createDate);
        } else {
          alert(repoURL + " is not valid URL");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="main">
        <div className="title">GitHub Repository Creation Date</div>
        <div className="sub-title">Paste the URL of the Github repository</div>
        <input
          className="search"
          placeholder="https://github.com/ihsanberkozcan/github-repo-creation-date"
          onKeyPress={(e) => handleSearch(e)}
        />
      </div>
      {createdAtDate ? (
        <>
          <div className="date-title">Created At:</div>
          <div className="date">{createdAtDate}</div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
