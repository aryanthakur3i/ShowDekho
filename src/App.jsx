import React from 'react'
import Footer from './components/Footer'
import Home from './pages/Home'
import {Routes, Route} from "react-router-dom";
import SignIn from "./pages/login/SignIn";
import SignUp from "./pages/login/SignUp";



function App(){
  return (
    <>
    <Routes>
      <Route path="/" element={ <Home/> } />
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
      <Footer/>
    </>
  )
}

export default App;
