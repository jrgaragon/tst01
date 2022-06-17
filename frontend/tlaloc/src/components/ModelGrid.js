import React, { useState, useEffect } from "react";
import ModelGridItem from "./ModelGridItem";
import axios from "axios";

const ModelGrid = () => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    const url = `http://localhost:3001/instagram/api/model/getmodels`;
    axios.post(url, { page: 0, pageSize: 20 }).then((response) => {
      console.log(response.data);
      setModels(response.data);
    });
  }, []);

  return (
    <div>
      <div className="card-grid-custom">
        {models.map((model) => (
          <ModelGridItem key={model.id} {...model} />
        ))}
      </div>     
    </div>
  );
};

export default ModelGrid;
