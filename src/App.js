import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Detail from "./Screens/Details/Details";
import Home from "./Screens/Home/Home";
import  NavBarAll from "./Components/NavBar/NavBar"
import ContactForm from "./Components/ContactForm/ContactForm";
import Profile from "./Screens/Profile/Profile"





function App() {
  return (
    <div className="App">
       
        <NavBarAll /> 
         
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/detail/:idProduct" element={<Detail />} />
        <Route path="/" element={<Home />} />
        <Route path="/contactform" element={<ContactForm />} />
        <Route path="/profile" element={<Profile/>} />
        
      </Routes>
      

    </div>
  );
}

export default App;
