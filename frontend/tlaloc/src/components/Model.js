import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ModelGridItem from "./ModelGridItem";
import axios from "axios";

const Model = () => {
  const [images, setImages] = useState([]);
  const location = useLocation();
  const username = location.state.username;

  useEffect(() => {
    const url = `http://localhost:3001/instagram/api/image/getimages`;
    axios.post(url, { username: username, page: 0, pageSize: 20 }).then((response) => {     
      setImages(response.data);
    });
  }, []);

  return (
    <div>
      <div className="card-grid-custom">
        {images.map((image) => (
          <ModelGridItem key={image.id} {...image} />
        ))}
      </div>
    </div>
  );
};

export default Model;