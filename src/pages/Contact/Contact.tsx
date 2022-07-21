import React from "react";

import './Contact.css';

const Contact = () => {

     return (
          <div id="contactContainer">
               <div id="contactDisplay">
                    <h1 id='cool'>Pretty Cool Huh?</h1>
                    <h3 id='connect'>Let's Connect</h3>
                    <div id="socialBox">
                         <a href="https://github.com/Jgarcia1201/" target="_blank" className="social">Github</a>
                         <a href="https://www.linkedin.com/in/jgarcia1201/" className="social" target="_blank">LinkedIn</a>
                    </div>
                    <p>James Garcia</p>
               </div>
          </div>
     )
}

export default Contact;