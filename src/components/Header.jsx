import React from "react";
import { Link } from "react-router-dom";
import "../assets/scss/App.scss";

function Header() {
  return (
    <div className="Header">
      <header className="header-container">
        {/* NAVBAR */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/myalbum">My Album</Link>
            </li>
            <li>
              <Link to="/readme">ReadMe</Link>
            </li>
          </ul>
        </nav>
        <h1>SlapSticker</h1>
        <p>
          Have you ever said something so dumb, you just wanted to slap
          yourself? Well now you can!
        </p>
      </header>
    </div>
  );
}

export default Header;
