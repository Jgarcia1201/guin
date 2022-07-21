import React from "react";

import "./LoadingModal.css";

const LoadingModal = () => {
     return (
          <div id="loadingModal">
               <div id="penguinAnimation">
                    <svg version="1.1" id="penguin" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="432px" height="862px" viewBox="0 0 432 862" enable-background="new 0 0 432 862" xmlSpace="preserve">
                         <path id="penguinPath" fill="none" stroke="#000000" stroke-width="10" stroke-miterlimit="10" d="M135.127,836.08c0-16,1-33,51,0c14.334,9.667-9.666-92.333-25.5-131.666s-46.5-272.334-42.5-330.834c3.333-84.167,46-210.833,33.334-230.167c-12.667-19.333-47.643-35.928-71.334-42.5c-23.851-6.616-29-8.75-65.333-22.833c-10.667-2.667,0.333-5.75,10.583-4.5s54,11.427,99.5-0.287c26-7.463,43.25-2.963,57.5,3.787s21.25,13.5,21.25,17s-24.75,25.75-79.5-4.75s-21.333-58.583,0.333-67.917s118.666-21.667,164,22.667s101.667,116,130.667,450c17,195-22,299.5-25.5,323c-5.25,25.375-12,65.5-31.5-4.5s-96-230.5-109-372.5s16.333-102.333,19-184.333c-0.333-13.667-4.334-26.667-28.333,13.333c-24.001,40-39.333,86.333-45.333,30.333S277.46,105.08,316.46,222.746"/>
                    </svg>
                    <h1 id='loadingText'>GUIN</h1>
                    <p id='loadingSubText'>Twitter Sentiment Analysis</p>
               </div>
          </div>
     )
}

export default LoadingModal;