import React, { useState, useEffect, useContext, useCallback } from "react";
import AuthContext from "../context/AuthContext";
import OPD from "./service-content/OPD";
import Home from "./service-content/Home";
import MemoForm from "./service-content/OfficememoForm";
import MemoList from "./service-content/OfficememoList";
import OfficeMemoData from "./service-content/OfficememoData";
import CircularForm from "./service-content/CircularList";
import AllCircularView from "./service-content/Allciecularview";
import AllEventView from "./service-content/Alleventview";
// import EventForm from "./service-content/temp2";
// import MemoForm from "./service-content/temp3";
// import EmailRequisitionForm from "./service-content/temp4";
// import SoftwareRequisitionForm from "./service-content/temp5";
import CircularData from "./service-content/CircularForm";
import CircularManagement from "./service-content/CircularData";
import EventList from "./service-content/EventList";
import EventForm from "./service-content/EventForm";
import EventData from "./service-content/EventData";
import SoftwareRequisitionForm from "./service-content/softwarereqform";
import AdminSoftwareView from "./service-content/Adminsoftwareview";
import Emailrequisition from "./service-content/std_email_reqform";
import AdminEmailView from "./service-content/Adminmailview";
import LoginRequired from "./service-content/loginrequired";
import UserOPD from "./service-content/useropd";
import AdminPage from "./service-content/adminopd";
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
import Event from  "./service-content/EventForm"
import AllMemos from "./service-content/Allmemoview";

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
    zIndex: 50,
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
    overflowY: "auto",
    height: "calc(100vh - 4rem)",
    position: "fixed",
    left: 0,
    top: "4rem",
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
    transition: "opacity 0.3s",
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
    backgroundColor: "#e2e8f0",
    color: "#2c3e50",
  },
  serviceButtonHover: {
    backgroundColor: "#d1d5db",
    color: "#2c3e50",
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
    transition: "all 0.3s ease-in-out",
  },
  hamburgerMenu: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "1.5rem",
    cursor: "pointer",
    marginRight: "1rem",
  },
};

export default function Services() {
  const { logoutUser, isAuthenticated, user, role,designation } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [currentService, setCurrentService] = useState();
  const [serviceContent, setServiceContent] = useState(null);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    console.log(designation);
    let apiUrl = "/api/services/";

    if (isAuthenticated) {
      apiUrl = `/api/services/?role=${role}`;
      if (role === "Employee" && designation) {
          apiUrl += `&designation=${designation}`;
      }
  }    try {
      const response = await axios.get(apiUrl);
      setServices(
        response.data.map((service) => ({
          ...service,
          icon: getIconByName(service.service_name),
        }))
      );
     
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
      if (!mobile) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // console.log("Current service changed:", currentService);
    if (currentService === "OPD Service") {
      // setServiceContent(<OPD />);
      
      if (isAuthenticated) {
        setServiceContent(<UserOPD />);
      }
      else{
        setServiceContent(<LoginRequired />);
      }

    }
    else if(currentService === "OPD Request") {
      // setServiceContent(<OPD />);
      
      if (isAuthenticated) {
        setServiceContent(<AdminPage />);
      }
      else{
        setServiceContent(<LoginRequired />);
      }

    }
    else if (currentService === "Circulars"){
      setServiceContent(<AllCircularView />);
    } 
    else if (currentService === "Circular/ Notification/ Orders"){
      setServiceContent(<CircularManagement />);
    } 

    else if (currentService === "Notifications"){
      setServiceContent(<AllCircularView />);//this is dummy circular
    } 
    else if (currentService === "Office Orders"){
      setServiceContent(<AllCircularView />);//this is dummy circular
    } 
    // else if (currentService === "Notifications") {
    //   setServiceContent(<CircularList onEdit={handleEditCircular} />); // Pass the handler
    // }
    else if (currentService === "Events"){
        setServiceContent(<AllEventView/>);
  
    } 
    else if (currentService === "Publish Events"){
      setServiceContent(<EventData/>);
    } 
    
    else if (currentService === "Software Requisition"){
      // setServiceContent(<SoftwareRequisitionForm />);
      
      if (isAuthenticated) {
        setServiceContent(<SoftwareRequisitionForm />);
      }
      else{
        setServiceContent(<LoginRequired />);
      }
    } 
    else if (currentService === "Software Requisition Request"){
      setServiceContent(<AdminSoftwareView />);
    } 
    else if (currentService === "Email Requisition"){
      setServiceContent(<Emailrequisition />);
    } 
    else if (currentService === "Email Requisition Request"){
      setServiceContent(<AdminEmailView />);
    } 
    else if (currentService === "Guesthouse Booking"){
      // navigate("/GuestHousebooking");
      setServiceContent(<MemoForm />);
    } 
    else if (currentService === "Office Memorandums"){
      // setServiceContent(<Memorandums />);
      setServiceContent(<OfficeMemoData/>);
    } 
    else if (currentService === "Office Memos"){
      setServiceContent(<AllMemos/>);
    } 
    else if (currentService === "IT Services"){
      setServiceContent(<CircularData/>);   
     } 
    else {
      setServiceContent(<>{currentService}</>);
    }
  }, [currentService, navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleServiceClick = (slug, serviceName) => {
    // console.log("Service clicked:", slug, serviceName);
    setSelectedService(slug);
    setCurrentService(serviceName);
    
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };
 

  const sidebarStyle = {
    ...styles.sidebar,
    width: isSidebarOpen ? "16rem" : "0",
    transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
  };

  const mainAreaStyle = {
    ...styles.mainArea,
    marginLeft: isMobile ? "0" : isSidebarOpen ? "16rem" : "0",
  };

  const hamburgerMenuStyle = {
    ...styles.hamburgerMenu,
    display: "block", 
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const getIconByName = (name) => {
    switch (name) {
      case "OPD Service":
        return faClipboard;
      case "OPD Request":
        return faClipboard;
      case "Webmail Password Change":
        return faKey;
      case "Circulars":
        return faFileAlt;
      case "Circular/ Notification/ Orders":
        return faFileAlt;
      case "Notifications":
        return faBell;
      case "Office Orders":
        return faBell;
      case "IT Services":
        return faLaptop;
      case "Guesthouse Booking":
        return faBuilding;
      case "Email Requisition":
        return faEnvelope;
      case "Email Requisition Request":
        return faEnvelope;
      case "Software Requisition":
        return faBox;
      case "Software Requisition Request":
        return faBox;
      case "Academic Services":
        return faGraduationCap;
      case "Office Memorandums":
        return faStickyNote;
      case "Office Memos":
        return faStickyNote;
      case "Events":
        return faCalendarAlt;
      case "Publish Events":
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
            style={hamburgerMenuStyle}
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
            {isMobile && (
              <button
                style={styles.hamburgerMenu}
                onClick={toggleSidebar}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </div>
          <ul style={styles.servicesList}>
            {services.map((service) => (
              <li key={service.slug} style={styles.serviceItem}>
                <button
                  onClick={() => {
                    handleServiceClick(service.slug, service.service_name);
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
          ) : currentService ? (
            <>
              <p>Selected Service: {currentService}</p>
              <div>{serviceContent}</div>
            </>
          ) : (
            <p>Welcome to the Services Dashboard. Please select a service from the sidebar.</p>
          )}
        </main>
      </div>
    </div>
  );
}