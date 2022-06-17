import React, { useState, useEffect } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";
import "../index.css";

const ImageViewer = ({ setShowImageViewer, selectedImage }) => {
  const [image, setImage] = useState({});
  const onImageShow = (e) => {
    setShowImageViewer(false);
  };

  useEffect(() => {
    console.log(selectedImage);

    const url = `http://localhost:3001/instagram/api/image/getimage`;
    axios.post(url, { id: selectedImage }).then((response) => {
      setImage(response.data);
    });
  }, [selectedImage]);

  return (
    <div className="overlay">
      <div className="row">
        <div className="column-50px">
          <ul>
            <li>
              <button>B</button>
            </li>
            <li>
              <button>F</button>
            </li>
            <li>
              <button>S</button>
            </li>
            <li>
              <button>M</button>
            </li>
            <li>
              <button onClick={onImageShow}>x</button>
            </li>
          </ul>
        </div>
        <div className="column-90">
          <div>
            <img src={image.image} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
