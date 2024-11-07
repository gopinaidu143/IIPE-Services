import React, { useState, useEffect } from 'react';
import Navbar from '../navbar'; 
// import GuestB from '../assets/GuestB.jpg';

// Sample images array
const images = [
  require('../assets/GuestB.jpg'),  // Ensure all image paths are correct
  require('../assets/GuestC.jpg'),
  require('../assets/GuestA.jpg'),
];

function GuestHousePageB() {
  const [activeSection, setActiveSection] = useState('overview'); // State to track active tab
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State to track carousel index

  // Carousel navigation functions
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(goToNextImage, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  const content = {
    overview: (
      <>
        <h3 style={styles.aboutTitle}>ABOUT: Guest House B</h3>
        <p>
          The guest house at the Indian Institute of Petroleum and Energy (IIPE) in Visakhapatnam offers comfortable accommodations to visitors and guests affiliated with the institute. 
          Located within the expansive IIPE campus, the guest house aims to provide modern amenities suited for short-term stays. 
          Construction updates show significant progress on this facility, aligning with the institute’s goal to create a welcoming environment for academic visitors, guest lecturers, and prospective students.
        </p>
        <p>
          The guest house has hosted many national and international conferences. It features 1 dining room, 
          2 banquet halls, and 1 conference room with up-to-date facilities.
        </p>
      </>
    ),
    facilities: (
      <>
        <h3 style={styles.aboutTitle}>FACILITIES at Guest House B</h3>
        <ul style={styles.list}>
          <li>Utility Kit</li>
          <li>23-inch or larger TV</li>
          <li>Cable/satellite TV channels</li>
          <li>Air Conditioner</li>
          <li>Free High-Speed Wi-Fi Internet</li>
          <li>Breakfast, Lunch, Dinner</li>
          <li>Work desk</li>
          <li>Water Purification System</li>
          <li>Laundry</li>
          <li>Mineral Water</li>
          <li>Tea/Coffee Maker</li>
          <li>Fridge</li>
          <li>Doctor on Call</li>
          <li>Car Parking</li>
          <li>24-hour Security service</li>
          <li>Daily Newspaper</li>
        </ul>
      </>
    ),
    price: (
      <>
        <h3 style={styles.aboutTitle}>Room Prices</h3>
        <h4>AC Rooms</h4>
        <p>900 - 1200 PER ROOM + GST</p>
        <h4>AC Suite</h4>
        <p>1200 - 1400 PER ROOM + GST</p>
        <h4>Faculty Suite</h4>
        <p>1400 - 1600 PER ROOM + GST</p>
      </>
    ),
  };

  return (
    <div style={styles.page}>
      <Navbar /> {/* Your existing Navbar component */}
      
      <div style={styles.titleContainer}>
        <h1 style={styles.title}>GUEST HOUSE B</h1>
      </div>
      
      <div style={styles.mainContent}>
        {/* Carousel Image Section */}
        <div style={styles.carouselContainer}>
          <button onClick={goToPreviousImage} style={{ ...styles.carouselButton, left: 0 }}>&lt;</button>
          <img src={images[currentImageIndex]} alt="Guest House" style={styles.carouselImage} />
          <button onClick={goToNextImage} style={{ ...styles.carouselButton, right: 0 }}>&gt;</button>
        </div>
        
        <div style={styles.infoCard}>   
          <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>GUEST HOUSE B</h2>
          <p style={{ fontSize: '14px', margin: '5px 0', fontWeight: '500' }}>TOTAL ROOMS</p>
          <p style={{ fontSize: '40px', fontWeight: 'bold', margin: '0' }}>56</p>
          {/* <p style={{ fontSize: '14px', margin: '5px 0', fontWeight: '500' }}> Rooms         </p> */}
          <p style={{ fontSize: '14px', margin: '5px 0', fontWeight: '500' }}>AC ROOMS</p>
          <p style={{ fontSize: '40px', fontWeight: 'bold', margin: '0' }}>47</p>
          <p style={{ fontSize: '14px', margin: '5px 0', fontWeight: '500' }}>          </p>
          <p style={{ fontSize: '14px', margin: '5px 0', fontWeight: '500' }}>AC SUITE ROOMS</p>
          <p style={{ fontSize: '40px', fontWeight: 'bold', margin: '0' }}>2</p>
          <p style={{ fontSize: '14px', margin: '5px 0', fontWeight: '500' }}>          </p>
          <p style={{ fontSize: '14px', margin: '5px 0', fontWeight: '500' }}>FACULTY SUITE</p>
          <p style={{ fontSize: '40px', fontWeight: 'bold', margin: '0' }}>7</p>
          <p style={{ fontSize: '14px', margin: '5px 0', fontWeight: '500' }}>          </p>
          <p style={{ fontSize: '14px', margin: '5px 0', fontWeight: '500' }}>EXECUTIVE SUITE ROOMS</p>
          <p style={{ fontSize: '40px', fontWeight: 'bold', margin: '0' }}>25</p>
          <p style={{ fontSize: '14px', margin: '5px 0', fontWeight: '500' }}>          </p>
          <p style={{ fontSize: '14px', margin: '5px 0', fontWeight: '500' }}>EXECUTIVE STANDARD ROOMs</p>
          <p style={{ fontSize: '40px', fontWeight: 'bold', margin: '0' }}>10</p>
          <p style={{ fontSize: '14px', margin: '5px 0', fontWeight: '500' }}>          </p>
        </div>
      </div>

      <div style={styles.aboutSection}>
        <div style={styles.tabs}>
          <p 
            style={{ ...styles.tab, ...(activeSection === 'overview' && styles.activeTab) }}
            onClick={() => setActiveSection('overview')}
          >
            OVERVIEW
          </p>
          <p 
            style={{ ...styles.tab, ...(activeSection === 'facilities' && styles.activeTab) }}
            onClick={() => setActiveSection('facilities')}
          >
            FACILITIES
          </p>
          <p 
            style={{ ...styles.tab, ...(activeSection === 'price' && styles.activeTab) }}
            onClick={() => setActiveSection('price')}
          >
            PRICE
          </p>
        </div>

        <div style={styles.aboutContent}>
          {content[activeSection]}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { fontFamily: 'Arial, sans-serif' },
  titleContainer: {
    textAlign: 'center',
    marginTop: '110px',
    padding: '20px 0',
    backgroundColor: '#f0f0f0',
  },
  title: { fontSize: '2rem', margin: 0, color: '#333' },
  mainContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '20px',
    gap: '20px',
    flexWrap: 'wrap',
  },
  carouselContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '900px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselImage: { width: '100%', borderRadius: '10px' },
  carouselButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(0,0,0,0.5)',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.5rem',
    padding: '0 10px',
    zIndex: 2,
  },
  infoCard: {
    flex: 1,
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: '#f8f8f8',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    maxWidth: '700px',
    height: '480px',
  },
  aboutSection: {
    display: 'flex',
    gap: '20px',
    marginTop: '30px',
    padding: '20px',
    flexWrap: 'wrap',
  },
  tabs: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    minWidth: '150px',
  },
  tab: { fontSize: '1.2rem', padding: '10px', cursor: 'pointer' },
  activeTab: {
    fontWeight: 'bold',
    color: '#DAA520',
    borderLeft: '3px solid #DAA520',
  },
  aboutContent: { flex: 3, textAlign: 'left', width: '100%' },
  aboutTitle: { fontSize: '1.5rem', marginBottom: '10px' },
  list: { listStyleType: 'disc', paddingLeft: '20px', color: '#333' },
};

export default GuestHousePageB;
