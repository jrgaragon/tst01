import React from "react";
import { Link } from "react-router-dom";
const ModelGridItem = ({ username, thumbnail, page }) => {
  console.log(`---ModelGridItem--Page-- ${page}`)
  return (
    <div className="card-custom">
      <Link to={{ pathname: `/model/${username}` }} state={{ username: username, page: page }} key={username}>
        <img src={thumbnail} alt={username}></img>
      </Link>
      <p>{username}</p>
    </div>
  );
};

export default ModelGridItem;
