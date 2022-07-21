import React from "react";

import "./Navbar.css";

import GuinLogo from '../../assets/Navbar/penguinLogo.webp';
import { Link } from "react-router-dom";

const Navbar = () => {
     return (
          <nav id="navBarContainer">
               <div id="logoBox">
                    <img src={GuinLogo} id="penguinLogo"></img>
                    <h1 id="logoText">GUIN</h1>
               </div>
               <div id='linkBox'>
                         <Link className="navlink" to={'/'}>HOME</Link>
                         <Link to={'/contact'} className="navlink">CONTACT</Link>
               </div>

          </nav>
     )
}

export default Navbar;