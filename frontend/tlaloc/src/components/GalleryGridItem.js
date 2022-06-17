import React from "react";
//import { Link } from "react-router-dom";

const GalleryGridItem = ({ id, username, thumbnail, setShowImageViewer }) => {
  const onImageShow = (e) => {
    setShowImageViewer({ show: true, selectedImage: id });
    //setSelectedImage(id);
  };
  return (
    <div className="card-custom">
      <img src={thumbnail} alt={username} onClick={onImageShow}></img>
      <p>{id}</p>
    </div>
  );
};

export default GalleryGridItem;
