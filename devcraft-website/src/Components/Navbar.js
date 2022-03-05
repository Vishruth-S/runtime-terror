import React from "react";
import "../css/Navbar.css"
function Navbar() {
  return (
    <div className="home-navbar">
      <img
        src="https://cdn.dribbble.com/users/24078/screenshots/15522433/media/e92e58ec9d338a234945ae3d3ffd5be3.jpg?compress=1&resize=400x300&vertical=top"
        className="logo"
        alt="logo"
      />
      <div className="home-navleft">
        <button className=" btn home-login" type="button">
          Login
        </button>

        <button className=" btn home-getstarted" type="button">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Navbar;
