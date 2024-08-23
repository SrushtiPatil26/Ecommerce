import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./navbar.css";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoSearch } from "react-icons/io5";

function Navbar() {
  const history = useHistory();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const searchText = searchQuery.toLowerCase().trim();
    if (searchText) {
      const allTextNodes = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT
      );
      let found = false;
      while (allTextNodes.nextNode()) {
        const node = allTextNodes.currentNode;
        if (node.textContent.toLowerCase().includes(searchText)) {
          found = true;
          node.parentElement.scrollIntoView({ behavior: "smooth" });
          break;
        }
      }
      if (!found) {
        alert(`No matches found for "${searchText}"`);
      }
    }
    setSearchQuery("");
  };

    const handleSignUpClick = () => {
    history.push("/register");
  };

  return (
    <div className="navbar">
      <div className="header-part">
        <p>
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        </p>
        <button type="submit">Shop Now</button>
        <select>
          <option>English</option>
          <option>UK</option>
          <option>US</option>
        </select>
      </div>
      <div className="nav">
        <h1>Exclusive</h1>
        <ul>
          <li>Home</li>
          <li>Contact</li>
          <li>About</li>
          <li onClick={handleSignUpClick}>Sign up</li>
        </ul>
        <form onSubmit={handleSearchSubmit} className="search-container">
          <input
            type="search"
            placeholder="What are you looking for?"
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit" className="search-icon">
            <IoSearch />
          </button>
        </form>
        <FaRegHeart />
        <MdOutlineShoppingCart />
      </div>
    </div>
  );
}

export default Navbar;
