import React, { useState, useEffect } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";
import "../index.css";

const ImageViewer = ({ setShowImageViewer, showImageViewer, imageListId }) => {
  const [image, setImage] = useState({});
  const onImageShow = (e) => {
    setShowImageViewer({ show: false });
  };

  useEffect(() => {
    console.log(showImageViewer.selectedImage);

    const url = `http://localhost:3001/instagram/api/image/getimage`;
    axios.post(url, { id: showImageViewer.selectedImage }).then((response) => {
      setImage(response.data);
    });
  }, [showImageViewer]);

  //console.log('<<<ImageViewer>>>', imageListId);

  const getCurrentIndex = () => {
    const currentIndex = imageListId.indexOf(showImageViewer.selectedImage);
    return currentIndex;
  }
  
  const onNext = (e) => {
    let currentIndex = getCurrentIndex();
    currentIndex++;


    if(currentIndex < imageListId.length) {      
      const currentImage = imageListId[currentIndex];
      setShowImageViewer({ selectedImage: currentImage, show: true });
    }   
  }

  const onPrevious = (e) => {
    let currentIndex = getCurrentIndex();
    currentIndex--;

    if(currentIndex >= 0) {      
      const currentImage = imageListId[currentIndex];
      setShowImageViewer({ selectedImage: currentImage, show: true });
    }   
  }

  return (
    <div className="overlay">
      <div className="row">
        <div className="column-50px">
          <ul>
            <li>
              <button className="btn btn-dark btn-sm" onClick={onNext}>Next</button>
            </li>
            <li>
              <button className="btn btn-dark btn-sm" onClick={onPrevious}>Previous</button>
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
