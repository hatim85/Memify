import React, { useState, useEffect } from "react";
import { useAddress } from "@chopinframework/react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ImageProcessing from './pages/ImageProcessing';
import ResultPage from './pages/ResultPage';
import Login from "./Login";
import MyNFT from "./pages/MyNFT";
import AllMemes from "./pages/AllMemes";
import MemeDetails from "./pages/MemeDetails";
import {ToastContainer} from 'react-toastify'

function App() {
  

  return (
    <>
      
    <Router>
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/meme/:id" element={<MemeDetails />} />
        <Route path="/explorenft" element={<AllMemes/>} />
        <Route path="/mynft" element={<MyNFT/>} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/process" element={<ImageProcessing />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
      <ToastContainer/>
    </div>
  </Router>
    </>
  );
}

export default App;