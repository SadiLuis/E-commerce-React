import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
//import Register from "./Components/Register/Register";
import Detail from "./Screens/Details/Details";
import Home from "./Screens/Home/Home";
import Product from "./Components/AdminProduct/Product"





function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        {/*<Route path="/registro" element={<Register />} />*/}
        <Route path="/detail/:idProduct" element={<Detail />} />
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Product />} />
      </Routes>

    </div>
  );
}

export default App;
