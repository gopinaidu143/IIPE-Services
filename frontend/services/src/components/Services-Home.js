import React, { useState, useEffect, useRef } from "react";
import Navbar1 from './navbar1';
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotel,
  faFileMedical,
  faBell,
  faLaptop,
  faGraduationCap,
  faFileAlt,
  faKey,
  faDownload,
  faEnvelope,
  faStickyNote,
  faChevronLeft,
  faChevronRight,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

// Assume these imports are correct and the images are available
import CentralAcademicBlock from "../assets/CentralAcademicBlock.jpg";
import Centralavenue from "../assets/centralavenue.jpg";
import Rooms from "../assets/TypicalRoom.jpg";
import Header from "./header"
import Footer from "./footer"

export default function UniversityHomepage() {
  const navigate = useNavigate();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [swipeStart, setSwipeStart] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const circularRef = useRef(null);
  const notificationRef = useRef(null);
  const eventRef = useRef(null);
  const [isCircularHovered, setIsCircularHovered] = useState(false);
  const [isNotificationHovered, setIsNotificationHovered] = useState(false);
  const [isEventHovered, setIsEventHovered] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);

  const circulars = [
    {
      id: 1,
      title: "Important Announcement",
      date: "2023-05-01",
      link: "#",
      isNew: true,
    },
    { id: 2, title: "Upcoming Event", date: "2023-05-15", link: "#" },
    {
      id: 3,
      title: "New Policy Update",
      date: "2023-05-20",
      link: "#",
      isNew: true,
    },
    { id: 4, title: "Faculty Meeting", date: "2023-05-25", link: "#" },
    { id: 5, title: "Research Symposium", date: "2023-06-01", link: "#" },
    { id: 6, title: "Campus News", date: "2023-06-05", link: "#", isNew: true },
    { id: 7, title: "Library Update", date: "2023-06-10", link: "#" },
    { id: 8, title: "Sports Event", date: "2023-06-15", link: "#" },
  ];

  const notifications = [
    {
      id: 1,
      title: "New Course Registration",
      date: "2023-05-02",
      link: "#",
      isNew: true,
    },
    { id: 2, title: "Exam Schedule Released", date: "2023-05-10", link: "#" },
    {
      id: 3,
      title: "Campus Maintenance Notice",
      date: "2023-05-18",
      link: "#",
    },
    {
      id: 4,
      title: "Scholarship Applications Open",
      date: "2023-05-22",
      link: "#",
      isNew: true,
    },
    {
      id: 5,
      title: "Guest Lecture Announcement",
      date: "2023-05-28",
      link: "#",
    },
    { id: 6, title: "Library Hours Extended", date: "2023-06-03", link: "#" },
    {
      id: 7,
      title: "Career Fair Registration",
      date: "2023-06-08",
      link: "#",
      isNew: true,
    },
    {
      id: 8,
      title: "Summer Internship Opportunities",
      date: "2023-06-12",
      link: "#",
    },
  ];

  const events = [
    { id: 1, title: "Orientation Day", date: "2023-05-05", link: "#" },
    { id: 2, title: "Alumni Meet", date: "2023-05-12", link: "#", isNew: true },
    { id: 3, title: "Tech Fest", date: "2023-05-19", link: "#" },
    { id: 4, title: "Annual Sports Day", date: "2023-05-26", link: "#" },
    {
      id: 5,
      title: "Cultural Night",
      date: "2023-06-02",
      link: "#",
      isNew: true,
    },
    { id: 6, title: "Graduation Ceremony", date: "2023-06-09", link: "#" },
    {
      id: 7,
      title: "Industry-Academia Conclave",
      date: "2023-06-16",
      link: "#",
    },
    {
      id: 8,
      title: "Research Symposium",
      date: "2023-06-23",
      link: "#",
      isNew: true,
    },
  ];

  const services = [
    { id: 1, title: "GUEST HOUSE BOOKING", icon: faHotel },
    { id: 2, title: "OPD FORM", icon: faFileMedical },
    { id: 3, title: "NOTIFICATIONS", icon: faBell },
    { id: 4, title: "IT SERVICES", icon: faLaptop },
    { id: 5, title: "ACADEMIC SERVICES", icon: faGraduationCap },
    { id: 6, title: "CIRCULAR", icon: faFileAlt },
    { id: 7, title: "WEBMAIL PASSWORD CHANGE", icon: faKey },
    { id: 8, title: "SOFTWARE REQUISITION", icon: faDownload },
    { id: 9, title: "EMAIL ACQUISITION", icon: faEnvelope },
    { id: 10, title: "OFFICE MEMORANDUMS", icon: faStickyNote },
  ];

  const photos = [CentralAcademicBlock, Centralavenue, Rooms];

  const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex(
      (prevIndex) => (prevIndex - 1 + photos.length) % photos.length
    );
  };

  const handleCardClick = (serviceId) => {
    console.log("hello");
    navigate(`/service/${serviceId}`);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const animateSection = (ref, isHovered) => {
      if (ref.current && !isHovered) {
        let animationId;
        let start;

        const step = (timestamp) => {
          if (start === undefined) {
            start = timestamp;
          }
          const elapsed = timestamp - start;

          if (ref.current) {
            const totalHeight = ref.current.scrollHeight / 2;
            const scrollPosition = (elapsed * 0.05) % totalHeight;
            ref.current.style.transform = `translateY(-${scrollPosition}px)`;
          }

          animationId = requestAnimationFrame(step);
        };

        animationId = requestAnimationFrame(step);

        return () => {
          cancelAnimationFrame(animationId);
        };
      }
    };

    const stopCircularAnimation = animateSection(
      circularRef,
      isCircularHovered
    );
    const stopNotificationAnimation = animateSection(
      notificationRef,
      isNotificationHovered
    );
    const stopEventAnimation = animateSection(eventRef, isEventHovered);

    return () => {
      if (stopCircularAnimation) stopCircularAnimation();
      if (stopNotificationAnimation) stopNotificationAnimation();
      if (stopEventAnimation) stopEventAnimation();
    };
  }, [isCircularHovered, isNotificationHovered, isEventHovered]);

  useEffect(() => {
    if (!isCardHovered) {
      const timer = setInterval(() => {
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % services.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isCardHovered, services.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextPhoto();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleTouchStart = (e) => {
    setSwipeStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (swipeStart === null) return;

    const swipeEnd = e.touches[0].clientX;
    const diff = swipeStart - swipeEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextPhoto();
      } else {
        prevPhoto();
      }
      setSwipeStart(null);
    }
  };

  const handleTouchEnd = () => {
    setSwipeStart(null);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getResponsiveStyles = () => {
    if (windowWidth <= 480) {
      return {
        logoHeight: "70px",
        fontSize: "0.8em",
        flexDirection: "row",
      };
    } else if (windowWidth <= 670) {
      return {
        logoHeight: "80px",
        fontSize: "1em",
        flexDirection: "row",
      };
    } else if (windowWidth <= 846) {
      return {
        logoHeight: "90px",
        fontSize: "1.2em",
        flexDirection: "row",
      };
    } else {
      return {
        logoHeight: "120px",
        fontSize: "1.5em",
        flexDirection: "row",
      };
    }
  };


  const renderSection = (
    title,
    icon,
    data,
    ref,
    isHovered,
    setIsHovered,
    linkTo
  ) => (
    <div
      style={{
        width: isMobile ? "100%" : "calc(33.33% - 20px)",
        height: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        marginBottom: isMobile ? "20px" : "0",
      }}
    >
      <div
        style={{
          backgroundColor: "#2c3e50",
          color: "white",
          padding: "10px",
          textAlign: "center",
          fontSize: "1.2rem",
          fontWeight: "bold",
        }}
      >
        <FontAwesomeIcon icon={icon} /> {title}
      </div>
      <div
        style={{
          flex: 1,
          overflowY: "hidden",
          position: "relative",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={ref}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {[...data, ...data].map((item, itemIndex) => (
            <a
              key={`${item.id}-${itemIndex}`}
              href={item.link}
              style={{
                backgroundColor: "#ecf0f1",
                borderRadius: "8px",
                margin: "10px",
                padding: "15px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  marginBottom: "5px",
                  color: "#2c3e50",
                  textAlign: "center",
                }}
              >
                {item.title}
                {item.isNew && (
                  <span
                    style={{
                      display: "inline-block",
                      backgroundColor: "#e74c3c",
                      color: "white",
                      fontSize: "0.7rem",
                      padding: "2px 5px",
                      borderRadius: "3px",
                      marginLeft: "5px",
                    }}
                  >
                    New
                  </span>
                )}
              </div>
              <div
                style={{
                  fontSize: "0.9rem",
                  color: "#7f8c8d",
                  textAlign: "center",
                }}
              >
                {item.date}
              </div>
            </a>
          ))}
        </div>
      </div>
      <Link
        to={linkTo}
        style={{
          display: "block",
          backgroundColor: "#3498db",
          color: "white",
          textAlign: "center",
          padding: "10px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        See All {title}
      </Link>
    </div>
  );

  return (
    <div
      style={{
        maxWidth: "100%",
        fontFamily: "tahoma",
        padding: "20px",
        backgroundColor: "white",
      }}
    >
      <Header />
      
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "30px",
        }}
      > 
      <div style={{display: "flex",flexDirection: "column",padding:"20px"}}>
      <Navbar1 />
      </div>
        
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1500px",
            height: "400px",
            marginTop: "70px",
            marginBottom: "20px",
            overflow: "hidden",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >

          {photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Carousel ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "fill",
                transition: "opacity 0.5s ease-in-out",
                opacity: index === currentPhotoIndex ? 1 : 0,
                position: index === currentPhotoIndex ? "relative" : "absolute",
                top: 0,
                left: 0,
              }}
            />
          ))}
          {!isMobile && (
            <>
              <button
                onClick={prevPhoto}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "10px",
                  transform: "translateY(-50%)",
                  background: "rgba(0,0,0,0.5)",
                  color: "white",
                  border: "none",
                  padding: "15px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  transition: "background 0.3s ease",
                  zIndex: 10,
                }}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button
                onClick={nextPhoto}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  background: "rgba(0,0,0,0.5)",
                  color: "white",
                  border: "none",
                  padding: "15px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  transition: "background 0.3s ease",
                  zIndex: 10,
                }}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "1500px",
            marginBottom: "30px",
          }}
        >
          {renderSection(
            "Circulars",
            faFileAlt,
            circulars,
            circularRef,
            isCircularHovered,
            setIsCircularHovered,
            "/circulars"
          )}
          {renderSection(
            "Notifications",
            faBell,
            notifications,
            notificationRef,
            isNotificationHovered,
            setIsNotificationHovered,
            "/notifications"
          )}
          {renderSection(
            "Events",
            faCalendarAlt,
            events,
            eventRef,
            isEventHovered,
            setIsEventHovered,
            "/events"
          )}
        </div>
      </div>
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 20px",
          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#2c3e50",
            fontSize: "2.5rem",
            marginBottom: "40px",
            fontWeight: "bold",
          }}
        >
          IIPE SERVICES
        </h1>
        <div
          style={{
            position: "relative",
            height: "400px",
            overflow: "hidden",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          }}
          onMouseEnter={() => setIsCardHovered(true)}
          onMouseLeave={() => setIsCardHovered(false)}
        >
          {services.map((service, index) => {
            const offset =
              ((index - currentCardIndex + services.length) % services.length) -
              1;
            const isActive = offset === 0;
            const zIndex = services.length - Math.abs(offset);

            return (
              <div
                key={service.id}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "50%",
                  height: "50%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px",
                  borderRadius: "15px",
                  backgroundColor: isActive ? "#2c3e50" : "#3498db",
                  boxShadow: isActive
                    ? "0 10px 20px rgba(52, 152, 219, 0.3)"
                    : "0 5px 15px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.5s ease-in-out",
                  opacity: isActive ? 1 : 0.7,
                  transform: `
                    translate(-50%, -50%)
                    translateX(${offset * 60}%)
                    scale(${1 - Math.abs(offset) * 0.4})
                  `,
                  zIndex: zIndex,
                }}
                onClick={() => handleCardClick(service.id)}
              >
                <FontAwesomeIcon
                  icon={service.icon}
                  style={{
                    fontSize: "4rem",
                    marginBottom: "20px",
                    color: "white",
                    filter: `drop-shadow(0 2px 5px rgba(0, 0, 0, 0.2))`,
                  }}
                />
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "white",
                    textAlign: "center",
                    margin: "0",
                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {service.title}
                </h2>
              </div>
            );
          })}
          <button
            onClick={() =>
              setCurrentCardIndex(
                (prevIndex) =>
                  (prevIndex - 1 + services.length) % services.length
              )
            }
            style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              color: "#2c3e50",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              fontSize: "1.2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: services.length + 1,
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.9)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.7)")
            }
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            onClick={() =>
              setCurrentCardIndex(
                (prevIndex) => (prevIndex + 1) % services.length
              )
            }
            style={{
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              color: "#2c3e50",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              fontSize: "1.2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: services.length + 1,
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.9)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.7)")
            }
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
