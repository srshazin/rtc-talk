import React from "react";

const Loader: React.FC<{ variant?: "primary" }> = ({ variant }) => {
  return <div className={`loader ${variant}`}></div>;
};

export default Loader;
