import React from 'react';
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
// import People from './components/people';
import OPDReferralForm from './components/OPD';
import RegistrationForm from './pages/Register';
import Dining from './components/Dining';


function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Navbar1/>}/>
          <Route path="/admin1" element={<AdmLogin1 />}/>
          <Route path="/admin" element={<AdmLogin />} />
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/GuestHousebooking" element={<Booking/>}/>
          <Route path="/guesthouses/a" element={<GuestHousePage/>}/>
          <Route path="/guesthouses/b" element={<GuestHousePageB/>}/>
          <Route path="/guesthouses/c" element={<GuestHousePageC/>}/>
          <Route path="/about" element={<About/>}/>
          {/* <Route path="/people" element={<People/>}/> */}
          <Route path="/OPD" element={<OPDReferralForm/>}/>
          <Route path="/register" element={<RegistrationForm/>}/> 
          <Route path="/dining-menu" element={<Dining/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
