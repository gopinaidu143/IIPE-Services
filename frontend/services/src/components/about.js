import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import ga from '../assets/ga.jpg';
import gb from '../assets/gb.jpg';
import gc from '../assets/gc.jpg';
import Navbar from '../navbar';

const About = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '50px 20px',
      backgroundColor: '#f9f9f9',
      minHeight: '100vh',
    },
    card: {
        marginTop:'70px',
      width: '100%',
      padding: '20px',
      marginBottom: '40px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f0f0f0',
      textAlign: 'center',
    },
    cardTitle: {
      fontSize: '1.5em',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#333',
    },
    cardDescription: {
      fontSize: '1em',
      lineHeight: '1.5',
      color: '#555',
    },
    guestContainer: {
      position: 'relative',
      width: '100%',
      maxWidth: '1200px',
      height: '400px',
      marginBottom: '40px',
      overflow: 'hidden',
      borderRadius: '12px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
      transition: 'transform 0.3s ease',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: 'blur(0)',
    },
    overlayLeft: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '40%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      color: '#f5f5f5',
      backgroundColor: 'rgba(0, 30, 60, 0.6)',
      padding: '25px',
      textAlign: 'left',
      transition: 'background-color 0.3s ease',
    },
    overlayRight: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: '40%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-end',
      color: '#f5f5f5',
      backgroundColor: 'rgba(0, 30, 60, 0.6)',
      padding: '25px',
      textAlign: 'right',
      transition: 'background-color 0.3s ease',
    },
    title: {
      fontSize: '2em',
      fontWeight: '600',
      marginBottom: '12px',
      color: '#ffc107',
      transition: 'color 0.3s ease',
    },
    description: {
      fontSize: '1.1em',
      lineHeight: '1.6',
      marginBottom: '20px',
      color: '#dcdcdc',
    },
    button: {
      backgroundColor: '#ffc107',
      color: '#333',
      padding: '12px 25px',
      border: 'none',
      borderRadius: '5px',
      fontSize: '1em',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    buttonHover: {
      backgroundColor: '#e0a800',
    },
    guestContainerHover: {
      transform: 'scale(1.02)',
    },
    overlayHover: {
      backgroundColor: 'rgba(0, 30, 60, 0.8)',
    },
    titleHover: {
      color: '#ffdd57',
    },
  };

  return (
    <div style={styles.container}>
      <Navbar />

      {/* Card for About Guesthouses */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>ABOUT GUEST HOUSES</h2>
      </div>

      {/* Guest House A - Text on Left */}
      <div
        style={{ ...styles.guestContainer, transition: 'transform 0.3s ease' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = styles.guestContainerHover.transform;
          e.currentTarget.querySelector('.overlayLeft').style.backgroundColor = styles.overlayHover.backgroundColor;
          e.currentTarget.querySelector('.titleA').style.color = styles.titleHover.color;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = '';
          e.currentTarget.querySelector('.overlayLeft').style.backgroundColor = 'rgba(0, 30, 60, 0.6)';
          e.currentTarget.querySelector('.titleA').style.color = styles.title.color;
        }}
      >
        <img src={ga} alt="GuestHouse A" style={styles.image} />
        <div className="overlayLeft" style={styles.overlayLeft}>
          <h1 className="titleA" style={styles.title}>GuestHouse A</h1>
          <p style={styles.description}>
            GuestHouse A is a prominent campus guest house that caters to VIPs and other esteemed visitors.
            It features 28 fully furnished and air-conditioned rooms and suites, along with a committee room and dining hall, ensuring guests enjoy a comfortable, well-equipped stay.
          </p>
          <Link to="/guesthouses/a">
            <Button
              style={styles.button}
              onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            >
              VIEW DETAILS
            </Button>
          </Link>
        </div>
      </div>

      {/* Guest House B - Text on Right */}
      <div
        style={{ ...styles.guestContainer, transition: 'transform 0.3s ease' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = styles.guestContainerHover.transform;
          e.currentTarget.querySelector('.overlayRight').style.backgroundColor = styles.overlayHover.backgroundColor;
          e.currentTarget.querySelector('.titleB').style.color = styles.titleHover.color;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = '';
          e.currentTarget.querySelector('.overlayRight').style.backgroundColor = 'rgba(0, 30, 60, 0.6)';
          e.currentTarget.querySelector('.titleB').style.color = styles.title.color;
        }}
      >
        <img src={gb} alt="GuestHouse B" style={styles.image} />
        <div className="overlayRight" style={styles.overlayRight}>
          <h1 className="titleB" style={styles.title}>GuestHouse B</h1>
          <p style={styles.description}>
            GuestHouse B is a prominent campus guest house that caters to VIPs and other esteemed visitors.
            It features 28 fully furnished and air-conditioned rooms and suites, along with a committee room and dining hall, ensuring guests enjoy a comfortable, well-equipped stay.
          </p>
          <Link to="/guesthouses/b">
            <Button
              style={styles.button}
              onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            >
              VIEW DETAILS
            </Button>
          </Link>
        </div>
      </div>

      {/* Guest House C - Text on Left */}
      <div
        style={{ ...styles.guestContainer, transition: 'transform 0.3s ease' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = styles.guestContainerHover.transform;
          e.currentTarget.querySelector('.overlayLeft').style.backgroundColor = styles.overlayHover.backgroundColor;
          e.currentTarget.querySelector('.titleC').style.color = styles.titleHover.color;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = '';
          e.currentTarget.querySelector('.overlayLeft').style.backgroundColor = 'rgba(0, 30, 60, 0.6)';
          e.currentTarget.querySelector('.titleC').style.color = styles.title.color;
        }}
      >
        <img src={gc} alt="GuestHouse C" style={styles.image} />
        <div className="overlayLeft" style={styles.overlayLeft}>
          <h1 className="titleC" style={styles.title}>GuestHouse C</h1>
          <p style={styles.description}>
            GuestHouse C is designed for guests seeking both luxury and privacy. It features
            spacious rooms, a conference room, dining hall, and exceptional amenities for a refined stay experience.
          </p>
          <Link to="/guesthouses/c">
            <Button
              style={styles.button}
              onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            >
              VIEW DETAILS
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
