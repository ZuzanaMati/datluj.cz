import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import image from "./typing.jpg";

const FrontPage = () => {
  return (
    <div className="front_page">
      <h1 className="title">Aplikace DATLOVÁNÍ</h1>
      <div className="flex">
        <img src={image} />
        <div className="front_page_links">
          <Link to="/trenink">Procvičování bez časového omezení</Link>
          <Link to="/datlovani">Hra s časovým cílem</Link>
          <Link to="/results">Výsledky</Link>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
