import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css"
import { auth } from "../firebase-config";
function Navbar() {
  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const logout = async () => {
    await signOut(auth);
  };
  return (
    <nav class="home-navbar navbar navbar-expand-lg">
      <h1 class="navbar-brand" href="#">MaxMoney</h1>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          {/* <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li> */}
        </ul>
        {user && user.uid ?
          <button className=" btn home-login" type="button" onClick={logout}>
            Logout
          </button>
          : <div>
            <Link to="/login">
              <button className=" btn home-login" type="button">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className=" btn home-getstarted" type="button">
                Get Started
              </button>
            </Link>
          </div>
        }
      </div>
    </nav>
  );
}

export default Navbar;




