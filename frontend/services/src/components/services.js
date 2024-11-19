import React, { useState, useEffect, useContext, useCallback } from "react";
import AuthContext from "../context/AuthContext";
import OPD from "./service-content/OPD";
import AdminPage from "./service-content/adminopd";
import SoftwareRequisitionForm from "./service-content/softwarereqform";
import Emailrequisition from "./service-content/std_email_reqform";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChevronDown,
  faSignOutAlt,
  faKey,
  faFileAlt,
  faBell,
  faClipboard,
  faLaptop,
  faBuilding,
  faEnvelope,
  faBox,
  faGraduationCap,
  faBars,
  faTimes,
  faStickyNote,
  faQuestionCircle,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import logo from "../assets/logo.png";
import Circular from "./service-content/circular";
import Event from  "./service-content/events";
import UserOPD from "./service-content/useropd";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    fontFamily: "Times New Roman",
  },
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.2rem 1rem",
    backgroundColor: "#2c3e50",
    color: "white",
  },
  logo: {
    width: "65px",
    height: "89px",
    objectFit: "contain",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  dropdownButton: {
    background: "none",
    border: "none",
    color: "white",
    cursor: "pointer",
    padding: 0,
  },
  dropdown: {
    position: "absolute",
    right: 0,
    top: "100%",
    backgroundColor: "white",
    border: "1px solid #ddd",
    borderRadius: "4px",
    padding: "0.5rem",
    marginTop: "0.5rem",
  },
  logoutButton: {
    display: "flex",
    alignItems: "center",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#2c3e50",
  },
  loginButton: {
    display: "flex",
    alignItems: "center",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#2c3e50",
  },
  mainContent: {
    display: "flex",
    flexGrow: 1,
    marginTop: "4rem",
  },
  sidebar: {
    backgroundColor: "#f1f5f9",
    transition: "all 0.3s ease-in-out",
    position: "fixed",
    left: 0,
    top: "4rem",
    width: "16rem",
    height: "calc(100vh - 4rem)",
    boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
    zIndex: 500,
    overflowY: "auto",
  },
  sidebarHeader: {
    position: "sticky",
    top: 0,
    backgroundColor: "#f1f5f9",
    zIndex: 10,
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sidebarTitle: {
    fontSize: "1.7rem",
    fontWeight: "bold",
    marginTop: "50px",
  },
  servicesList: {
    listStyle: "none",
    padding: "0 1rem",
    margin: 0,
  },
  serviceItem: {
    marginBottom: "0.5rem",
  },
  serviceButton: {
    width: "100%",
    textAlign: "left",
    padding: "0.75rem",
    borderRadius: "0.375rem",
    transition: "all 0.2s ease-in-out",
    display: "flex",
    alignItems: "center",
    border: "none",
    background: "none",
    cursor: "pointer",
  },
  serviceButtonSelected: {
    backgroundColor: "#e2e8f0", // Light gray background for selected service
    color: "#2c3e50", // Dark text color for selected service
  },
  serviceIcon: {
    marginRight: "0.75rem",
    transition: "all 0.3s",
    fontSize: "1.3rem",
  },
  serviceName: {
    transition: "all 0.3s",
    fontSize: "1.3rem",
    fontFamily: "Times New Roman",
  },
  mainArea: {
    flexGrow: 1,
    padding: "2rem",
    overflowY: "auto",
    transition: "margin-left 0.3s ease-in-out",
  },
  mobileMenuButton: {
    display: "block",
    background: "none",
    border: "none",
    color: "white",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
  sidebarHidden: {
    transform: "translateX(-100%)",
  },
};

export default function Services() {
  const { logoutUser , isAuthenticated, user, role } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentService, setCurrentService] = useState();
  const [serviceContent, setServiceContent] = useState(null);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    const apiUrl = isAuthenticated ? `/api/services/?role=${role}` : "/api/services/";
    try {
      const response = await axios.get(apiUrl);
      setServices(
        response.data.map((service) => ({
          ...service,
          icon: getIconByName(service.service_name),
        }))
      );
      if (response.data.length > 0) {
        setSelectedService(response.data[0].slug);
        setCurrentService(response.data[0].service_name);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  }, [role, isAuthenticated]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (currentService === "OPD Form") {
      setServiceContent(<UserOPD />);
    } else if (currentService === "Circulars") {
      setServiceContent(<Circular />);
    } else if (currentService === "Notifications") {
      setServiceContent(<AdminPage />);
    } else if (currentService === "Events") {
      setServiceContent(<Event />);
    } else if (currentService === "Software Requisition") {
      setServiceContent(<SoftwareRequisitionForm />);
    } else if (currentService === "Email Requisition") {
      setServiceContent(<Emailrequisition />);
    } else if (currentService === "Guesthouse Booking") {
      navigate("/GuestHousebooking");
    } else {
      setServiceContent(<>{currentService}</>);
    }
  }, [currentService]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleServiceClick = (slug) => {
    setSelectedService(slug);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const sidebarStyle = {
    ...styles.sidebar,
    ...(isSidebarOpen ? {} : styles.sidebarHidden),
  };

  const mainAreaStyle = {
    ...styles.mainArea,
    marginLeft: isMobile ? "0" : isSidebarOpen ? "16rem" : "0",
  };

  const handleLogout = () => {
    logoutUser ();
    navigate('/login');
  };

  const getIconByName = (name) => {
    switch (name) {
      case "OPD Form":
 return faClipboard;
      case "Webmail Password Change":
        return faKey;
      case "Circulars":
        return faFileAlt;
      case "Notifications":
        return faBell;
      case "IT Services":
        return faLaptop;
      case "Guesthouse Booking":
        return faBuilding;
      case "Email Requisition":
        return faEnvelope;
      case "Software Requisition":
        return faBox;
      case "Academic Services":
        return faGraduationCap;
      case "Office Memorandums":
        return faStickyNote;
      case "Events":
        return faCalendarAlt;
      default:
        return faQuestionCircle;
    }
  };

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            style={styles.mobileMenuButton}
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
          </button>
          <img src={logo} alt="Institute Logo" style={styles.logo} />
        </div>
        <h1 style={{ fontSize: "1.2rem", margin: 10, textAlign: "center", flex: 1 }}>
          INDIAN INSTITUTE OF PETROLEUM AND ENERGY
        </h1>
        <div style={styles.navRight}>
          <button onClick={() => navigate('/')} style={styles.dropdownButton}>
            <FontAwesomeIcon icon={faHome} />
          </button>
          <span>{isAuthenticated ? user : "Guest"}</span>
          <div style={{ position: "relative" }}>
            <button
              style={styles.dropdownButton}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
            {isDropdownOpen && (
              <div style={styles.dropdown}>
                {isAuthenticated ? (
                  <button style={styles.logoutButton} onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    Logout
                  </button>
                ) : (
                  <button style={styles.loginButton} onClick={() => navigate('/login')}>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    Login
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
      <div style={styles.mainContent}>
        <aside style={sidebarStyle}>
          <div style={styles.sidebarHeader}>
            <h2 style={styles.sidebarTitle}>Services</h2>
          </div>
          <ul style={styles.servicesList}>
            {services.map((service) => (
              <li key={service.slug} style={styles.serviceItem}>
                <button
                  onClick={() => {
                    handleServiceClick(service.slug);
                    setCurrentService(service.service_name);
                  }}
                  style={{
                    ...styles.serviceButton,
                    ...(selectedService === service.slug ? styles.serviceButtonSelected : {}),
                  }}
                >
                  <FontAwesomeIcon
                    icon={service.icon}
                    style={styles.serviceIcon}
                  />
                  <span style={styles.serviceName}>{service.service_name}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <main style={mainAreaStyle}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p>Selected Service: {selectedService}</p>
              <div>{serviceContent}</div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}