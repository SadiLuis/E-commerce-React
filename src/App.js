import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Detail from "./Screens/Details/Details";
import Home from "./Screens/Home/Home";
import Cart from './Components/Cart/Cart'

import Profile from "./Screens/Profile/Profile";





function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/detail/:idProduct" element={<Detail />} />
        <Route path="/" element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="/user" element={<Profile/>}/>

      </Routes>

    </div>
  );
}

export default App;
