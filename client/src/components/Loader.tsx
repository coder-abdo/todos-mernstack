import React from "react";
import loader from "../images/loader.gif";
export const Loader = () => {
  return (
    <>
      <img
        src={loader}
        alt="loader"
        style={{ margin: "0 auto", width: "200px", display: "block" }}
      />
    </>
  );
};
