import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import GalleryGridItem from "./GalleryGridItem";
import ImageViewer from "./ImageViewer";
import Paginator from "./Paginator";
import axios from "axios";

const Model = () => {
  const [images, setImages] = useState([]);
  const [showImageViewer, setShowImageViewer] = useState({ show: false, selectedImage: "" });
  const location = useLocation();
  const username = location?.state?.username;
  const page = location?.state?.page;
  let imageListId = [];
  console.log(`---Location ${location?.state?.username}`);

  const [state, setState] = useState({
    path: "model",
    page: 0,
    pageSize: 20,
    pages: 1,
    username: username,
  });

  console.log(`---Model---State ${JSON.stringify(state)}`);
  console.log(`---Model---page ${JSON.stringify(page)}`);

  useEffect(() => {
    const url = `http://localhost:3001/instagram/api/image/getimages`;
    console.log({ username: state.username, page: state.page, pageSize: state.pageSize });
    axios.post(url, { username: state.username, page: state.page, pageSize: state.pageSize }).then((response) => {      
      response.data.imageListId = response.data.map((i) => i.id)
      setImages(response.data);
      //console.log(`--GetImages---`, images);
    });
  }, [state]);

  useEffect(() => {
    const urlPages = `http://localhost:3001/instagram/api/image/getimagepages`;
    axios.post(urlPages, { username: state.username, pageSize: state.pageSize }).then((response) => {
      setState({ ...state, pages: response.data.pages });
    });
  }, []);

  return (
    <div>
      <Link to={{ pathname: `/home` }} state={{ page: page }} key={username} className="btn btn-primary">
        Home
      </Link>

      <Paginator setState={setState} state={state}></Paginator>
      <div className="card-grid-custom">
        {images.map((image) => (
          <GalleryGridItem key={image.id} {...{ ...image, setShowImageViewer }} />
        ))}
      </div>
      {showImageViewer.show ? <ImageViewer {...{ setShowImageViewer, showImageViewer, imageListId: images.imageListId }} /> : null}
    </div>
  );
};

export default Model;
