import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Detail from "./Screens/Details/Details";
import Home from "./Screens/Home/Home";
import Landing from './Screens/Landing/Landing'
import  NavBarAll from "./Components/NavBar/NavBar"
import ContactForm from "./Components/ContactForm/ContactForm";
import EditProduct from "./Components/AdminProduct/EditProduct"
import Profile from "./Screens/Profile/Profile"

import Cart from './Components/Cart/Cart'
import Dashboard from "./Screens/Dashboard/Dashboard";







function App() {
  return (
    <div className="App">
       
        <NavBarAll /> 
         
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/dashboard/admin" element={<Dashboard />} />
        <Route path="/dashboard/admin/EditProduct/:idProduct" element={<EditProduct />} />
        <Route path="/register" element={<Register />} />
        <Route path="/detail/:idProduct" element={<Detail />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contactform" element={<ContactForm />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path='/cart' element={<Cart />} />
        <Route exact path="/" element={<Landing />} />
        {/* <Route path="/user" element={<Profile/>}/> */}


      </Routes>
      

    </div>
  );
}

export default App;
