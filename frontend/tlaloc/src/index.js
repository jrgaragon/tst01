import React from "react";
import ReactDOM from "react-dom/client";
import Tlaloc from "./Tlaloc";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Model from "./components/Model";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Tlaloc />} />
      <Route path="/:modelname" element={<Model />} />
    </Routes>
  </BrowserRouter>
);
