import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Dashboard from "./Screens/Dashboard/Dashboard";





function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Dashboard/>}/>
      </Routes>

    </div>
  );
}

export default App;
