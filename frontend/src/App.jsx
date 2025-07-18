import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import NavBar from "./pages/NavBar";
import Addcar from "./pages/cars/Addcar";
import CarDetails from "./pages/cars/CarDetails";
import UpdateCar from "./pages/cars/UpdateCar";
import Cars from "./pages/cars/Cars";
import Footer from "./pages/Footer";
import Contact from "./pages/Contact";

function App() {
  

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/add-car" element={<Addcar />} />
        <Route path="/carDetails/:id" element={<CarDetails />} />
        <Route path="/updateCar/:id" element={<UpdateCar />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
