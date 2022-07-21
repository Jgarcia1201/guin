import React from "react";
import { Link } from "react-router-dom";
import './NoResults.css';


const NoResults = () => {
     return (
          <div id="noResultsContainer">
               <h1 id='nores'>NO RESULTS FOUND</h1>
               <Link to={"/"} id='noResLink'>HOME</Link>
          </div>
     )
}

export default NoResults;