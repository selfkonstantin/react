import React from "react";
import classes from "./Loader.module.scss";

const Loader = ({ loading, children }) => {
  return <div className={loading ? classes.loader : ""}>{children}</div>;
};

export default Loader;
