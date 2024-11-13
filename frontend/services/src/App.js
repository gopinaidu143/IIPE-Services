import React, { useEffect } from 'react';
import { refreshToken } from './components/refreshtoken';
import "@fortawesome/fontawesome-free/css/all.min.css";
// import Navbar from './navbar';
import Navbar1 from './components/navbar1';
import { Routes, Route } from 'react-router-dom';
import User from './components/user'; 
import Loginpage from './pages/login';
import AdmLogin from './components/Admin';
import AdmLogin1 from './components/Admin1';
import Booking from './components/Booking';
import GuestHousePage from './pages/GuestA';
import GuestHousePageB from './pages/GuestB';
import GuestHousePageC from './pages/GuestC';
import About from './components/about';
import ServicesPage from './pages/services';
// import People from './components/people';
import OPD from './components/OPD';
import RegistrationForm from './pages/Register';
import Dining from './components/Dining';
import { AuthProvider } from "./context/AuthContext";
import AdminPage from './components/adminopd';
import UserOPD from './components/useropd';



function App() {

  return (
    <>
      <div>
      <AuthProvider>
        <Routes>
          
          <Route path="/" element={<Navbar1/>}/>
          <Route path="/services" element={<ServicesPage />}/>
          <Route path="/admin1" element={<AdmLogin1 />}/>
          <Route path="/admin" element={<AdmLogin />} />
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/GuestHousebooking" element={<Booking/>}/>
          <Route path="/guesthouses/a" element={<GuestHousePage/>}/>
          <Route path="/guesthouses/b" element={<GuestHousePageB/>}/>
          <Route path="/guesthouses/c" element={<GuestHousePageC/>}/>
          <Route path="/about" element={<OPD/>}/>
          <Route path="/academics" element={<UserOPD/>}/>
          <Route path="/placements" element={<AdminPage/>}/>

          {/* <Route path="/people" element={<People/>}/> */}
          {/* <Route path="/OPD" element={<OPD/>}/> */}
          <Route path="/register" element={<RegistrationForm/>}/> 
          <Route path="/dining-menu" element={<Dining/>}/>
          
        </Routes>
        </AuthProvider>

      </div>
    </>
  );
}

export default App;