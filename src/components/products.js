import React, { useState, useEffect } from "react";
import "./products.css";
import img1 from "./assets/p1.png";
import img2 from "./assets/p2.png";
import img3 from "./assets/p3.png";
import img4 from "./assets/p4.png";

function Products({ addToCart, cartItems, removeFromCart }) {
  const [message, setMessage] = useState(""); // State variable for message
  const [hiddenButtons, setHiddenButtons] = useState(Array(4).fill(false)); // State variable for hidden buttons

  const imageData = [
    {
      src: img1,
      alt: "Image 1",
      title: "Breed Dry Dog Food",
      price: "700.00",
    },
    {
      src: img2,
      alt: "Image 2",
      title: "CANON EOS DSLR Camera",
      price: "27890.00",
    },
    {
      src: img3,
      alt: "Image 3",
      title: "ASUS FHD Gaming Laptop",
      price: "80000.00",
    },
    {
      src: img4,
      alt: "Image 4",
      title: "Jr. Zoom Soccer Cleats",
      price: "7160.00",
    },
    
  ];

  useEffect(() => {
    if (cartItems) {
      // Update hidden buttons when cart items change
      const updatedHiddenButtons = Array(4).fill(false);
      cartItems.forEach((item) => {
        const index = imageData.findIndex((product) => product.title === item.title);
        if (index !== -1) {
          updatedHiddenButtons[index] = true;
        }
      });
      setHiddenButtons(updatedHiddenButtons);
    }
  }, [cartItems, imageData]);

  const handleAddToCart = (product, index) => {
    addToCart(product);
    setMessage(`${product.title} added to cart`); // Set the message
    // Clear the message after a certain time
    setTimeout(() => {
      setMessage("");
    }, 2000);
    // Hide the button for the clicked product
    setHiddenButtons((prevHiddenButtons) => {
      const updatedHiddenButtons = [...prevHiddenButtons];
      updatedHiddenButtons[index] = true;
      return updatedHiddenButtons;
    });
  };

  const handleRemoveFromCart = (product) => {
    removeFromCart(product);
    const index = imageData.findIndex((item) => item.title === product.title);
    setHiddenButtons((prevHiddenButtons) => {
      const updatedHiddenButtons = [...prevHiddenButtons];
      updatedHiddenButtons[index] = false;
      return updatedHiddenButtons;
    });
  };

  // Function to check if a product is in the cart
  const isInCart = (product) => {
    return cartItems && cartItems.some((item) => item.title === product.title); // Add null check
  };

  return (
    <div className="products">
      <hr />
      <div className="outer">
        <h1>Products</h1>
      </div>
      <h1>Explore Our Products</h1>

      {message && <p className="message">{message}</p>} {/* Render message if present */}

      <div className="images">
        {imageData.map((product, index) => (
          <div key={index} className="image-item">
            <img src={product.src} alt={product.alt} />
            <div className="image-details">
              <h3>{product.title}</h3>
              <h4>{product.price}</h4>
              {!isInCart(product) && !hiddenButtons[index] && ( // Check if button should be visible
                <button onClick={() => handleAddToCart(product, index)}>Add To Cart</button>
              )}
              {isInCart(product) && (
                <button onClick={() => handleRemoveFromCart(product)}>Remove From Cart</button>
              )}
              <button className="view" id="view">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
