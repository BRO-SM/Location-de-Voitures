import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './components/pages/Home'
import NavBar from './components/pages/NavBar'
import Addcar from './components/cars/Addcar'
import CarDetails from './components/cars/CarDetails'
import UpdateCar from './components/cars/UpdateCar'
import Cars from './components/cars/cars'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cars" element={<Cars/>} />
        <Route path="/add-car" element={<Addcar/>} />
        <Route path='/carDetails/:id'element={<CarDetails/>}/>
        <Route path='/updateCar/:id'element={<UpdateCar/>}/>
        
        

      </Routes>

      


    </div>
  )
}

export default App
