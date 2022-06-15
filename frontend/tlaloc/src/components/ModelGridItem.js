import React from "react";
//import "./../index.css";

const ModelGridItem = ({ username, thumbnail }) => {
  return (
    <div className="card-custom">
      <img src={thumbnail}></img>
      <p>{username}</p>
    </div>
  );
};

export default ModelGridItem;
