import React, { useState } from "react";
import { TextField, Button, LinearProgress } from "@material-ui/core";
import shrtcode from "../api/shrtcode";

const HTTP_URL_VALIDATOR_REGEX =
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/g;

const Search = () => {
  const [link, setLink] = useState("");
  const [short, setShort] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateURL = (string) => {
    return string.match(HTTP_URL_VALIDATOR_REGEX);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(link);
    if (validateURL(link)) {
      getLink();
      setLink("");
      setIsLoading(!isLoading);
    } else {
      setShort("Plese input a valid url");
    }
  };

  const getLink = async () => {
    await shrtcode
      .get(`shorten?url=${link}`)
      .then((response) => {
        setShort(response.data.result.short_link);
        setIsLoading(false);
        // console.log(short);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <TextField
          style={{ marginBottom: "20px" }}
          label="Input your link"
          variant="outlined"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        {!isLoading && (
          <Button
            style={{ marginBottom: "20px" }}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        )}

        {isLoading && <LinearProgress />}
      </form>

      {short && (
        <>
          <h2>Short link</h2>
          <a style={{ textDecoration: "none" }} href={`http://${short}`}>
            {short}
          </a>
        </>
      )}
    </>
  );
};

export default Search;
