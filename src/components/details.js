import React from "react";
import "./details.css";
import Navbar from "./navbar";
import Footer from "../components/footer";
import detail1 from './assets/dt1.png';
import detail2 from './assets/dt2.png';
import detail3 from './assets/dt3.png';
import detail4 from './assets/dt4.png';
import del from './assets/del.png';
import star from './assets/star.png';
import detail5 from './assets/dt5.png';

function Details({ addToCart }) {
  const handleAddToCart = () => {
    // Assuming addToCart is a function passed as a prop from the parent component
    // You should replace this with your actual implementation
    addToCart({
      title: "Havic HV G-92 Gamepad",
      price: 192.00,
      quantity: 1,
      image: detail5 // Assuming detail5 is the image URL for the product
    });
  };

  return (
    <div className="detail">
      <Navbar />
      <span>
        Home / Products /<b>View Details</b>
      </span>

      <div className="details">
        <div className="l1">
            <img src={detail1} alt=""/>
            <img src={detail2} alt=""/>
            <img src={detail3} alt=""/>
            <img src={detail4} alt=""/>
        </div>
        <div className="l2">
            <img src={detail5} alt=""/>
        </div>
        <div className="l3">
            <h2>Havic HV G-92 Gamepad</h2>
            <img src={star} alt=""/>
            <h3>$192.00</h3>
            <p>PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.</p>
            <button onClick={handleAddToCart}>Buy Now</button>
            <hr></hr>
            <img src={del} alt=""/>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Details;
