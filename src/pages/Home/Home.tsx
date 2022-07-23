import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import './Home.css';

const Home = () => {


     const backgroundVideo: any = require('../../assets/Home/Comp_1_42.mp4');
     const [query, setQuery] = useState("");
     const [showMessage, setShowMessage] = useState(false);
     const navigate = useNavigate();

     useEffect(() => {
          slowVideo();
     }, [])

     const slowVideo = () => {
          const vid: any = document.querySelector('#backgroundVideo');
          vid.playbackRate = .76;
          vid.setAttribute('muted', true);
          vid.setAttribute('playsinline', true);
          vid.setAttribute('autoplay', true);
          vid.setAttribute('loop', true);
     }

     function handleSearch(): any {
          const isValid = validation(query);
          if (isValid) {
               navigate(`search/${query}`)
          }
          else {
               setShowMessage(true);
          }
     }

     function validation(query: string) {
          if (query != "") {
               return true;
          }
          else return false;
     }

     function handleInputChange(e: any): void {
          setShowMessage(false);
          let update = (e.target as HTMLInputElement).value;
          let noLower = update.toLowerCase();
          let noPunc = noLower.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
          let noSpace = noPunc.replace(" ", "");
          setQuery(noSpace);
     }

     return (
          <div id='homeContainer'>

               <div id='videoBox'>
                    <video 
                         src={backgroundVideo} 
                         id="backgroundVideo"
                         autoPlay={true} 
                         muted={true}
                         loop={true} 
                         playsInline={true}
                         onCanPlay={(e) => {(e.target as HTMLVideoElement).muted=true;}}
                    >
                    </video>                 
               </div>

               <div id="homeContent">
                    <h1 id='homeTitle'>Sentiment Analysis Powered by Machine Learning</h1>
                    <p id="homeSubTitle">Enter a search term to analyze hundreds of tweets in seconds and view a visualization of recent public sentiment.</p>
                    <input type='text' id='searchBar' onChange={handleInputChange}></input>
                    <button id='analyzeButton' onClick={handleSearch}>ANALYZE</button>
                    {showMessage && <h4 id='validMessage'>Please Enter a Term To Analyze!</h4>}
               </div>

          </div>
     )
}

export default Home;