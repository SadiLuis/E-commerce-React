import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Detail from "./Screens/Details/Details";
import Home from "./Screens/Home/Home";
import Cart from './Components/Cart/Cart'
import Carousel from "./Components/Carousel/Carousel";




function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/detail/:idProduct" element={<Detail />} />
        <Route path="/" element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="/carousel" element={<Carousel />} />
      </Routes>

    </div>
  );
}

export default App;
