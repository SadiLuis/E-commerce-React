import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Detail from "./Screens/Details/Details";





function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/detail/:idProduct" element={<Detail />} />
      </Routes>

    </div>
  );
}

export default App;
