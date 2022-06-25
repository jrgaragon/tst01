import React from "react";
import ReactDOM from "react-dom/client";
import Tlaloc from "./Tlaloc";
import ModelGrid from "./components/ModelGrid";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Model from "./components/Model";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/home" element={<ModelGrid />} />
      <Route path="/model/:modelname" element={<Model />} />
    </Routes>
  </BrowserRouter>
);
