import {Routes, Route} from "react-router-dom";
import SignIn from "./pages/login/SignIn";
import SignUp from "./pages/login/SignUp";
// import Footer from "./components/Footer";
// import Navbar from "./components/Navbar";

function App(){
  return (

    
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>


   
    
  );
}

export default App;
