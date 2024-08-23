import React from "react";
import "./category.css";
import img1 from "./assets/cat1.png";
import img2 from "./assets/cat2.png";
import img3 from "./assets/cat3.png";
import img4 from "./assets/cat4.png";
import img6 from "./assets/cat6.png";
import img7 from "./assets/fm11.png";

function category() {
  return (
    <div className="category">
      <hr></hr>
      <div className="outer">
        <h1>Category</h1>
      </div>
      <h1>Browse By Category</h1>
      <div className="categories-container">
        <div className="categories">
          <img src={img1} alt="" />
          <img src={img2} alt="" />
          <img src={img3} alt="" />
          <img src={img4} alt="" />
          <img src={img6} alt="" />
        </div>
      </div>

      <img src={img7} alt="" id="#im1" />
    </div>
  );
}

export default category;
