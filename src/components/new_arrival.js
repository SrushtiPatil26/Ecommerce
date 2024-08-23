import React from "react";
import "./arrival.css";
import img1 from "./assets/a1.png";
import img2 from "./assets/a2.png";
import img3 from "./assets/a3.png";
import img4 from "./assets/a4.png";
import img5 from "./assets/dev1.png";
import img6 from "./assets/dev2.png";
import img7 from "./assets/dev3.png";

function new_arrival() {
  return (
    <div className="arrival">
      <hr></hr>
      <div className="outer">
        <h1>Featured</h1>
      </div>
      <h1>New Arrival</h1>

      <div className="arrivals">
        <div className="left-arrival">
          <img src={img1} alt="" />
        </div>
        <div className="right-arrival">
          <div className="upper">
            <img src={img2} alt="" />
          </div>
          <div className="lower">
            <img src={img3} alt="" />
            <img src={img4} alt="" />
          </div>
        </div>
      </div>

      <div className="devs">
        <img src={img5} alt="" />
        <img src={img6} alt="" />
        <img src={img7} alt="" />
      </div>
    </div>
  );
}

export default new_arrival;
