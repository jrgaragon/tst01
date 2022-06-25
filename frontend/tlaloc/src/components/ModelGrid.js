import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ModelGridItem from "./ModelGridItem";
import Paginator from "./Paginator";
import axios from "axios";

const ModelGrid = () => {
  const location = useLocation();
  let page = 0

  if(location?.state?.page) {
    page = location.state.page
  } else if(sessionStorage.getItem("homePage")) {
    page = sessionStorage.getItem("homePage");
  }

  const [models, setModels] = useState([]);
  const [state, setState] = useState({
    path: "home",
    page: page,
    pages: 1,
    pageSize: 20
  });

  console.log(`---ModelGrid---page ${JSON.stringify(location?.state)}`)
  console.log(`---ModelGrid---page ${JSON.stringify(page)}`)

  useEffect(() => {
    const urlPages = `http://localhost:3001/instagram/api/model/getmodelpages`;
    axios.post(urlPages, { pageSize: state.pageSize }).then((response) => {
      setState({ ...state, pages: response.data.pages });
    });
  }, []);

  useEffect(() => {
    const url = `http://localhost:3001/instagram/api/model/getmodels`;
    axios.post(url, { page: state.page, pageSize: state.pageSize }).then((response) => {
      console.log(response.data);
      setModels(response.data);      
    });

    sessionStorage.setItem("homePage", state.page);

  }, [state]);

  return (
    <div>
      <Paginator setState={setState} state={state}></Paginator>
      <div className="card-grid-custom">
        {models.map((model) => (
          <ModelGridItem key={model.id} {...{ ...model, ...state }} />
        ))}
      </div>
    </div>
  );
};

export default ModelGrid;
