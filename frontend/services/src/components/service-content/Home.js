import React, { useState, useEffect } from "react";
import Navbar from "../../navbar";
import CentralAcademicBlock from "../../assets/CentralAcademicBlock.jpg";
import Centralavenue from "../../assets/centralavenue.jpg";
import Rooms from "../../assets/TypicalRoom.jpg";
import Office from "../../assets/OfficeCoridor.jpg";
import gallery1 from "../../assets/FacultyCabins.jpg";
import gallery2 from "../../assets/FacultyQuarters.jpg";
import gallery3 from "../../assets/HODCabins.jpg";
import gallery4 from "../../assets/Classroom1.jpg";
import gallery5 from "../../assets/ComputerCenter.jpg";
import gallery6 from "../../assets/Student Hostels.jpg";
// import gallery7 from "../assets/Labs1.jpg";

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentGuestHouse, setCurrentGuestHouse] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const backgroundImages = [CentralAcademicBlock, Centralavenue, Rooms, Office];
  const guestHouseImages = [
    { src: Office, label: "GUEST HOUSE A" },
    { src: Rooms, label: "GUEST HOUSE B" },
    { src: Centralavenue, label: "GUEST HOUSE C" },
    { src: CentralAcademicBlock, label: "GUEST HOUSE D" },
  ];
  const galleryImages = [
    { src: gallery1, alt: "Institution 1" },
    { src: gallery2, alt: "Institution 2" },
    { src: gallery3, alt: "Institution 3" },
    { src: gallery4, alt: "Institution 4" },
    { src: gallery5, alt: "Institution 5" },
    { src: gallery6, alt: "Institution 6" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  useEffect(() => {
    const guestHouseInterval = setInterval(() => {
      setCurrentGuestHouse((prev) => (prev + 1) % guestHouseImages.length);
    }, 5000);
    return () => clearInterval(guestHouseInterval);
  }, [guestHouseImages.length]);

  const nextSlide = () => {
    setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
  };

  const prevSlide = () => {
    setCurrentImage((prev) =>
      prev === 0 ? backgroundImages.length - 1 : prev - 1
    );
  };

  const styles = {
    header: {
      height: "100vh",
      backgroundImage: `url(${backgroundImages[currentImage]})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      transition: "background-image 0.5s ease-in-out",
      position: "relative",
      marginTop: "100px",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
    },
    sliderArrow: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      color: "orange",
      padding: "1rem",
      cursor: "pointer",
      border: "none",
      borderRadius: "50%",
      width: "50px",
      height: "50px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
      transition: "background-color 0.3s",
      zIndex: 10,
    },
    prevArrow: {
      left: "20px",
    },
    nextArrow: {
      right: "20px",
    },
    sliderDots: {
      position: "absolute",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      gap: "10px",
      zIndex: 10,
    },
    dot: {
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    activeDot: {
      backgroundColor: "white",
    },
    sections: {
      padding: "4rem 2rem",
      maxWidth: "1200px",
      margin: "0 auto",
      position: "relative",
      backgroundColor: "transparent",
    },
    quickLinks: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "30px",
      gap: "2rem",
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      opacity: ".85",
    },
    quickLinksText: {
      display: "flex",
      alignItems: "center",
      fontSize: "1.5rem",
      color: "white",
    },
    iconCircle: {
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      backgroundColor: "orange",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontSize: "1.2rem",
      marginRight: "0.5rem",
    },
    quickLinkButton: {
      backgroundColor: "#004d99",
      color: "white",
      border: "none",
      borderRadius: "5px",
      padding: "1rem 2rem",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "all 0.5s",
      width: "100%",
      marginBottom: "1rem",
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    aboutUsSection: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "2rem",
      marginBottom: "4rem",
    },
    aboutUsImage: {
      width: "100%",
      maxWidth: "100vw",
      borderRadius: "8px",
    },
    aboutUsText: {
      width: "100%",
      color: "black",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "1.5rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.2s",
      cursor: "pointer",
      minWidth: "250px",
    },
    buttonGroup: {
      display: "flex",
      gap: "1rem",
      marginTop: "1rem",
    },
    button: {
      padding: "1rem 2rem",
      fontSize: "1.1rem",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      transition: "all 0.3s",
    },
    notice: {
      backgroundColor: "#f8f9fa",
      border: "1px solid #dee2e6",
      borderRadius: "8px",
      padding: "1rem",
      marginTop: "2rem",
    },
    guestHouseSection: {
      padding: "4rem 2rem",
      backgroundColor: "#f5f5f5",
      textAlign: "center",
    },
    guestHouseContainer: {
      position: "relative",
      maxWidth: "100%",
      height: "50vh",
      overflow: "hidden",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    guestHouseImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "8px",
      transition: "transform 0.4s ease, opacity 0.5s ease-in-out",
    },
    guestHouseLabel: {
      position: "absolute",
      bottom: "20px",
      left: "20px",
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      color: "orange",
      padding: "1rem",
      borderRadius: "5px",
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    gallerySection: {
      padding: "4rem 2rem",
      backgroundColor: "#f9f9f9",
    },
    galleryHeading: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#333",
      textAlign: "center",
      marginBottom: "2rem",
    },
    galleryContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
      gap: "2rem",
      width: "100%",
    },
    galleryImage: {
      width: "100%",
      height: "250px",
      objectFit: "cover",
      borderRadius: "8px",
      transition: "transform 0.4s ease, box-shadow 0.4s ease",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      cursor: "pointer",
    },
  };

  return (
    <div>
      <Navbar />
      <header style={styles.header}>
        <button
          style={{ ...styles.sliderArrow, ...styles.prevArrow }}
          onClick={prevSlide}
        >
          ‹
        </button>
        <button
          style={{ ...styles.sliderArrow, ...styles.nextArrow }}
          onClick={nextSlide}
        >
          ›
        </button>
        <div style={styles.sliderDots}>
          {backgroundImages.map((_, index) => (
            <div
              key={index}
              style={{
                ...styles.dot,
                ...(currentImage === index ? styles.activeDot : {}),
              }}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
        <div style={styles.overlay}>
          <p
            style={{
              fontSize: "1.2rem",
              marginBottom: "2rem",
              maxWidth: "800px",
              textAlign: "center",
            }}
          >
            Official accommodation facility for visiting faculty, staff, and
            authorized guests
          </p>
          <h1
            style={{
              fontSize: "3rem",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            LOGIN
          </h1>
          <div style={styles.buttonGroup}>
            <button
              style={{
                ...styles.button,
                backgroundColor: "#004d99",
                color: "white",
              }}
            >
              LOGIN
            </button>
          </div>
        </div>
      </header>

      <section style={styles.sections}>
        <div style={styles.quickLinks}>
          <div style={styles.quickLinksText}>
            <div style={styles.iconCircle}>✔</div>
            <span style={{ color: "white", fontWeight: "bold" }}>
              Quick Links
            </span>
          </div>
          <div style={styles.buttonContainer}>
            {[
              "FACULTY REGISTRATION",
              "EX-EMPLOYEE REGISTRATION",
              "STUDENT REGISTRATION",
              "ALUMNI REGISTRATION",
              "EMPLOYEE REGISTRATION",
            ].map((link) => (
              <button key={link} style={styles.quickLinkButton}>
                {link}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.guestHouseSection}>
        <h2>GUEST HOUSES</h2>
        <div style={styles.guestHouseContainer}>
          <img
            src={guestHouseImages[currentGuestHouse].src}
            alt="Guest House"
            style={styles.guestHouseImage}
          />
          <div style={styles.guestHouseLabel}>
            {guestHouseImages[currentGuestHouse].label}
          </div>
          <div style={styles.sliderDots}>
            {guestHouseImages.map((_, index) => (
              <div
                key={index}
                style={{
                  ...styles.dot,
                  ...(currentGuestHouse === index ? styles.activeDot : {}),
                }}
                onClick={() => setCurrentGuestHouse(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section style={styles.sections}>
        <div style={styles.notice}>
          <h3 style={{ color: "#dc3545", marginBottom: "1rem" }}>
            Important Notice
          </h3>
          <ul style={{ lineHeight: "1.6" }}>
            <li>
              Booking requires valid institutional ID or official authorization
            </li>
            <li>Minimum 48 hours advance booking required</li>
            <li>
              Maximum stay duration: 7 days (extensions subject to approval)
            </li>
          </ul>
        </div>
      </section>

      <section style={styles.sections}>
        <div style={styles.aboutUsSection}>
          <img
            src={CentralAcademicBlock}
            alt="IIPE Roorkee Logo"
            style={styles.aboutUsImage}
          />
          <div style={styles.aboutUsText}>
            <h2 style={{ fontSize: "2rem", color: "black" }}>ABOUT US</h2>
            <p>
              IIPE Visakhapatnam strongly believes in the old Indian adage
              "Athithi Devo Bhava". We give our visitors the best facilities be
              it in terms of service, ambience or food. The campus has three
              guest houses to accommodate the guests and delegates who visit the
              campus.
            </p>
            <p>
              The Guest House consists of a number of units in buildings located
              within the Institute campus. All the rooms are furnished, most
              have attached facilities, and a few have kitchenettes. Effort is
              made to appropriately accommodate Distinguished Visitors and
              Visiting Academics, including visiting doctoral students in the
              various guest rooms.
            </p>
            <p>
              The Guest Houses have an in-house dining facility, which provides
              meals to visitors accommodated in the guest rooms. Many members of
              the Institute also use the Guest House during the lunch hour, and
              in the early evening for refreshments.
            </p>
          </div>
        </div>
      </section>

      <section style={styles.sections}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
          FACILITIES
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
          }}
        >
          {[
            "Conference Room",
            "Dining Hall",
            "Wi-Fi Access",
            "Parking",
            "Security Service",
            "Housekeeping",
            "VIP Suites",
          ].map((facility) => (
            <div key={facility} style={styles.card}>
              <h3 style={{ color: "#006633" }}>{facility}</h3>
              <p>
                Standard institutional {facility.toLowerCase()} services
                available
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.sections}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
          BOOKING GUIDELINES
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
          }}
        >
          <div>
            <h3 style={{ color: "#004d99", marginBottom: "1rem" }}>
              Eligibility
            </h3>
            <ul style={{ lineHeight: "1.6" }}>
              <li>Faculty members</li>
              <li>Administrative staff</li>
              <li>Visiting scholars</li>
              <li>Official guests</li>
              <li>Research collaborators</li>
            </ul>
          </div>
          <div>
            <h3 style={{ color: "#004d99", marginBottom: "1rem" }}>
              Required Documents
            </h3>
            <ul style={{ lineHeight: "2" }}>
              <li>Institution ID card</li>
              <li>Official invitation letter</li>
              <li>Department authorization</li>
              <li>Valid government ID</li>
            </ul>
          </div>
        </div>
      </section>

      <h2 style={styles.galleryHeading}>GALLERY</h2>
      <section style={styles.gallerySection}>
        <div style={styles.galleryContainer}>
          {galleryImages.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              style={{
                ...styles.galleryImage,
                transform: hoveredIndex === index ? "scale(1.1)" : "scale(1)",
                boxShadow:
                  hoveredIndex === index
                    ? "0 8px 16px rgba(0, 0, 0, 0.3)"
                    : "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </section>

      <footer
        style={{
          backgroundColor: "#004d99",
          color: "white",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <p>© 2024 Central Institution Guest House. All rights reserved.</p>
        <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
          For emergency assistance, contact: +1 (555) 123-4567
        </p>
      </footer>
    </div>
  );
};

export default Home;
