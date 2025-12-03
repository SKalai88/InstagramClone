// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import * as React from "react";
// import Button from "@mui/material/Button";
// import Container from '@mui/material/Container';
// import  { Typography,Box, Skeleton } from '@mui/material';
 import MiniDrawer from './MainDrawer';
import Layout from './ThreeColumnlayout';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Profile from './pages/Profile';
import CenterPanePage from './components/StoriesCarousel';


function App() {
 

  return (
   
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/Story" element={<CenterPanePage />} />
      </Routes>
    </BrowserRouter> 
     {/* <Layout/> */}
    {/* <Home/> */}

     </> 
   
  )
}

export default App
