import React, { useState, useEffect } from "react";
import "./flash.css";
import img1 from './assets/fm2.png'
import img2 from './assets/fm3.png'
import img3 from './assets/fm4.png'
import img4 from './assets/fm6.png'
import img5 from './assets/fm7.png'

function FlashSales({ addToCart }) {
  const [remainingTime, setRemainingTime] = useState({
    days: 3,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Sample data for images
  const imageData = [
    {
      src: img1,
      alt: "Image 1",
      title: "HAVIT HV-G92 Gamepad",
      price: "$120.00"
    },
    {
      src: img2,
      alt: "Image 2",
      title: "AK-900 Wired Keyboard",
     
      price: "$960.00"
    },
    {
      src: img3,
      alt: "Image 3",
      title: "IPS LCD Gaming Monitor",
    
      price: "$370.00"
    },
    {
      src: img4,
      alt: "Image 4",
      title: "S-Series Comfort Chair ",
      price: "$440.00"
    },
    {
      src: img5,
      alt: "Image 5",
      title: "The north coat for winter",
      
      price: "$350.00"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      // Decrease remaining time every second
      setRemainingTime((prevTime) => {
        const { days, hours, minutes, seconds } = prevTime;
        let newSeconds = seconds - 1;
        let newMinutes = minutes;
        let newHours = hours;
        let newDays = days;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }
        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }
        if (newHours < 0) {
          newHours = 23;
          newDays -= 1;
        }
        if (newDays < 0) {
          // Reset to initial value (3 days)
          clearInterval(timer);
          return { days: 3, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
          days: newDays,
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup function to clear interval
  }, []);

  return (
    <div className="flash_sales">
        <hr></hr>
        <div className="outer">
            <h1>Today's</h1>
        </div>
      <h1>Flash Sales</h1>
      <div className="time-counter">
        <div className="time1">
          <p>Days</p>
          <strong>{remainingTime.days}</strong>
        </div>
        <div className="time1">
          <p>Hours</p>
          <strong>{remainingTime.hours}</strong>
        </div>
        <div className="time1">
          <p>Minutes</p>
          <strong>{remainingTime.minutes}</strong>
        </div>
        <div className="time1">
          <p>Seconds</p>
          <strong>{remainingTime.seconds}</strong>
        </div>
      </div>

      <div className="images">
  {imageData.map((image, index) => (
    <div key={index} className="image-item">
      <img src={image.src} alt={image.alt} />
      <div className="image-details">
        <h3>{image.title}</h3>
        <h4>{image.price}</h4><br />
        <button onClick={() => addToCart(image)}>Add To Cart</button>
      </div>
    </div>
  ))}
</div>

    </div>
  );
}

export default FlashSales;
