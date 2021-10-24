import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const Spinner = () => {
  return (
    <Loader
      type="TailSpin"
      color="#00BFFF"
      height={80}
      width={80}
      timeout={3000}
      style={{ textAlign: "center" }}
    />
  );
};

export default Spinner;
