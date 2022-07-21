import React, { useEffect, useState } from 'react';
import './App.css';

import Home from './pages/Home/Home';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LoadingModal from './components/Loading/LoadingModal';
import Search from './pages/Search/Search';
import Contact from './pages/Contact/Contact';
import NoResults from './pages/NoResults/NoResults';

function App() {

  const [appStarting, setAppStarting] = useState(true);

  useEffect(() => {
    const loadingModal: HTMLElement = document.querySelector('#loadingModal')!;
    fadeOutModal(loadingModal);
  },[]);

  function fadeOutModal(loadingModal: HTMLElement) {
    setTimeout(() => {
      loadingModal.style.transition = "0.4s";
      loadingModal.style.opacity = '0';
    }, 2200); 
    setTimeout(() => {
      setAppStarting(false);
    }, 2400);
  }

  return (
    <div className="App">

      {appStarting && <LoadingModal />}
      <Router>
      {/* NAVBAR START */}
      <div id='appNavbar'>
        <Navbar />
      </div>
      {/* NAVBAR END */}

      {/* DISPLAY CONTENT START */}
      <div id="appDisplay">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:query" element={<Search />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/null" element={<NoResults />} />
          </Routes>
        
      </div>
      {/* DISPLAY CONTENT END */}
      </Router>
    </div>
  );
}

export default App;
