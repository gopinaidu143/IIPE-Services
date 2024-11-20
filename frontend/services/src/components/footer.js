// src/components/Footer.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png'; // Adjust the path as necessary

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const isMobile = window.innerWidth <= 768;
  const isSmallMobile = window.innerWidth <= 480;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}>
      {/* Footer Section */}
      <footer style={{
        backgroundColor: '#305c94',
        color: 'white',
        fontSize: isSmallMobile ? '10px' : '14px',
        textAlign: 'center',
        padding: isSmallMobile ? '20px' : '30px',
        width: '95%',
        marginTop: 'auto'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'left',
          gap: isMobile ? '15px' : '20px'
        }}>
          {/* Top Section with Logo, Contact, Links, and Emergency */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            width: '100%',
            maxWidth: '1200px'
          }}>
            {/* Left Section with Logo */}
            <div style={{ width: isSmallMobile ? '80px' : '120px', margin: 'auto 10px' }}>
              <img src={logo} alt="IIPE logo" style={{ width: '100%' }} />
            </div>

            {/* Contact Details */}
            <div style={{ minWidth: '150px', margin: '0 10px', textAlign: isMobile ? 'center' : 'left' }}>
              <h4>CONTACT DETAILS</h4>
              <p>
                <strong>Shri. Sunny John</strong><br />
                 Officer,<br />
                <br />
                <FontAwesomeIcon icon={faMapMarkerAlt} /> IIPE, Vizag - 530003
                <br />
                Andhra Pradesh, India<br />
                <br />
                <FontAwesomeIcon icon={faPhone} /> <a href="Tel: +91 9908423552" style={{ color: 'white', textDecoration: 'none' }}> +91 9908423552</a><br />
                <FontAwesomeIcon icon={faEnvelope} /> <a href="office@iipe.ac.in" style={{ color: 'white', textDecoration: 'none' }}>office@iipe.ac.in</a>
              </p>
            </div>

            {/* Useful Links */}
            <div style={{ minWidth: '150px', margin: '0 10px', textAlign: isMobile ? 'center' : 'left' }}>
              <h4>USEFUL LINKS</h4>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li><a href="https://www.iipe.ac.in" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>IIPE</a></li>
                <li><a href="/safety" style={{ color: 'white', textDecoration: 'none' }}>OPD</a></li>
                <li><a href="/security" style={{ color: 'white', textDecoration: 'none' }}>Circulars</a></li>
                <li><a href="/feedback" style={{ color: 'white', textDecoration: 'none' }}>Notifications</a></li>
                <li><a href="/virtual-tour" style={{ color: 'white', textDecoration: 'none' }}>Events</a></li>
                <li><a href="/institute-hospital" style={{ color: 'white', textDecoration: 'none' }}>GuestHousebooking</a></li>
              </ul>
            </div>

            {/* Emergency Contact Details */}
            <div style={{ minWidth: '150px', margin: '0 10px', textAlign: isMobile ? 'center' : 'left' }}>
              <h4>EMERGENCY CONTACT DETAILS</h4>
              <p>
                Safety Officer:<br />
                <a href="tel:+911332284026" style={{ color: 'white', textDecoration: 'none' }}>+91-1332-284026, 203</a><br />
                <br />
                Security Control Room:<br />
                <a href="tel:+911332284181" style={{ color: 'white', textDecoration: 'none' }}>+91-1332-284181, 4311</a><br />
                <br />
                Hospital Emergency:<br />
                <a href="tel:+911332284260" style={{ color: 'white', textDecoration: 'none' }}>+91-1332-284260</a>
              </p>
            </div>

            {/* Right Section with Map */}
            <div style={{ width: '100%', maxWidth: isMobile ? '100%' : '200px', margin: 'auto 10px' }}>
              <iframe
                src="https://maps.google.com/maps?q=IIPE&hl=en&z=14&amp;output=embed"
                title="IIPE Location Map"
                style={{ border: '0', width: '100%', height: isMobile ? '200px' : '150px' }}
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Bottom Text */}
          <div style={{ marginTop: '20px', fontSize: isSmallMobile ? '10px' : '14px', color: 'white', textAlign: isMobile ? 'center' : 'left' }}>
            &copy; {currentYear} | All rights reserved | Design & Maintained for INDIAN INSTITUTE OF PETROLEUM AND ENERGY (IIPE)
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;