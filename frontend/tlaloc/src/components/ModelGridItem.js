import React from "react";
import { Link } from "react-router-dom";
const ModelGridItem = ({ username, thumbnail }) => {
  return (
    <div className="card-custom">
      <Link to={{ pathname: `/${username}` }} state={{ username: username }} key={username}>
        <img src={thumbnail} alt={username}></img>
      </Link>
      <p>{username}</p>
    </div>
  );
};

export default ModelGridItem;
