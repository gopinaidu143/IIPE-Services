//navbar.js

import React, { useState, useEffect } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import logo from "./assets/logo.jpg";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [dropdownTimer, setDropdownTimer] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1028);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = (itemName) => {
    if (isMobile) return;
    clearTimeout(dropdownTimer);
    setHoveredItem(itemName);
    if (["Guesthouses", "Utility", "User"].includes(itemName)) {
      setActiveDropdown(itemName);
    }
  };

  const handleDropdownMouseEnter = (itemName) => {
    if (isMobile) return;
    clearTimeout(dropdownTimer);
    setActiveDropdown(itemName);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    const timer = setTimeout(() => {
      setHoveredItem(null);
      setActiveDropdown(null);
    }, 300);
    setDropdownTimer(timer);
  };

  const handleDropdownItemClick = () => {
    setActiveDropdown(null);
    setHoveredItem(null);
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const styles = {
    navbar: {
      backgroundColor: "#ff9833",
      width: "100%",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: "center",
      justifyContent: "space-between",
      minHeight: "100px",
      border: "none",
      boxShadow: "none",
      borderBottom: "2px solid #ccc",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 1000,
      padding: "0 20px",
      boxSizing: "border-box",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      width: isMobile ? "100%" : "auto",
    },
    logo: {
      maxHeight: "100px",
      width: "120px",
      marginRight: "15px",
    },
    instituteName: {
      color: "white",
      fontWeight: "bold",
      fontFamily: "times new roman",
      fontSize: "1.8rem",
    },
    menuContainer: {
      marginLeft: isMobile ? "0" : "auto",
      display: isMobile ? (isMenuOpen ? "flex" : "none") : "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: isMobile ? "flex-start" : "center",
      width: isMobile ? "100%" : "auto",
    },
    menuItem: {
      color: "white",
      fontSize: "1rem",
      marginLeft: isMobile ? "0" : "20px",
      textDecoration: "none",
      padding: "10px 15px",
      transition: "background-color 0.3s ease, color 0.3s ease",
      position: "relative",
      cursor: "pointer",
      width: isMobile ? "100%" : "auto",
    },
    hoveredMenuItem: {
      backgroundColor: "white",
      color: "black",
    },
    dropdown: (isActive) => ({
      display: isActive ? "block" : "none",
      position: isMobile ? "static" : "absolute",
      top: isMobile ? "auto" : "100%",
      left: 0,
      backgroundColor: "#ff9833",
      boxShadow: isMobile ? "none" : "0 2px 8px rgba(0, 0, 0, 0.2)",
      zIndex: 999,
      borderRadius: "4px",
      marginTop: isMobile ? "0" : "5px",
      width: isMobile ? "100%" : "200px",
      padding: "5px 0",
    }),
    dropdownItem: {
      color: "white",
      padding: "10px 15px",
      textDecoration: "none",
      display: "block",
      transition: "background-color 0.3s ease",
      whiteSpace: "nowrap",
      cursor: "pointer",
    },
    hoveredDropdownItem: {
      backgroundColor: "#333333",
    },
    hamburger: {
      display: isMobile ? "block" : "none",
      cursor: "pointer",
      position: "absolute",
      top: "20px",
      right: "20px",
      zIndex: 1001,
    },
    hamburgerLine: {
      width: "30px",
      height: "3px",
      backgroundColor: "white",
      margin: "6px 0",
    },
  };

  const renderDropdownContent = (type) => {
    const dropdowns = {
      Guesthouses: [
        { to: "/guesthouses/a", label: "Guesthouse A" },
        { to: "/guesthouses/b", label: "Guesthouse B" },
        { to: "/guesthouses/c", label: "Guesthouse C" },
      ],
      Utility: [
        { to: "/utility/feedback", label: "Feedback" },
        { to: "/utility/terms", label: "Terms and Conditions" },
      ],
      User: [
        { to: "/login?role=Student", label: "Student" },
        { to: "/login?role=Employee", label: "Employee" },
        { to: "/login?role=Faculty", label: "Faculty" },
        { to: "/login?role=ExEmployee", label: "ExEmployee" },
        { to: "/login?role=Alumni", label: "Alumni" },
        { to: "/", label: "Logout" },
      ],
    };

    return (
      <div
        style={styles.dropdown(
          activeDropdown === type || (isMobile && isMenuOpen)
        )}
        onMouseEnter={() => handleDropdownMouseEnter(type)}
        onMouseLeave={handleMouseLeave}
      >
        {dropdowns[type].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            style={{
              ...styles.dropdownItem,
              ...(hoveredItem === item.label ? styles.hoveredDropdownItem : {}),
            }}
            onMouseEnter={() => setHoveredItem(item.label)}
            onClick={handleDropdownItemClick}
          >
            {item.label}
          </Link>
        ))}
      </div>
    );
  };

  return (
    <Menu secondary style={styles.navbar}>
      <div style={styles.logoContainer}>
        <img src={logo} alt="Institute Logo" style={styles.logo} />
        <span style={styles.instituteName}>Guest House Booking System</span>
      </div>

      <div style={styles.hamburger} onClick={toggleMenu}>
        <div style={styles.hamburgerLine}></div>
        <div style={styles.hamburgerLine}></div>
        <div style={styles.hamburgerLine}></div>
      </div>

      <div style={styles.menuContainer}>
        <Menu.Item
          as={Link}
          to="/GuestHousebooking"
          style={{
            ...styles.menuItem,
            ...(hoveredItem === "Home" ? styles.hoveredMenuItem : {}),
          }}
          onMouseEnter={() => handleMouseEnter("Home")}
          onMouseLeave={handleMouseLeave}
          onClick={() => isMobile && setIsMenuOpen(false)}
        >
          Home
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/about"
          style={{
            ...styles.menuItem,
            ...(hoveredItem === "About" ? styles.hoveredMenuItem : {}),
          }}
          onMouseEnter={() => handleMouseEnter("About")}
          onMouseLeave={handleMouseLeave}
          onClick={() => isMobile && setIsMenuOpen(false)}
        >
          About
        </Menu.Item>

        <Menu.Item
          style={{
            ...styles.menuItem,
            ...(hoveredItem === "Guesthouses" ? styles.hoveredMenuItem : {}),
          }}
          onMouseEnter={() => handleMouseEnter("Guesthouses")}
          onMouseLeave={handleMouseLeave}
          onClick={() =>
            isMobile &&
            setActiveDropdown(
              activeDropdown === "Guesthouses" ? null : "Guesthouses"
            )
          }
        >
          Guesthouses
          {renderDropdownContent("Guesthouses")}
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/dining-menu"
          style={{
            ...styles.menuItem,
            ...(hoveredItem === "Dining Menu" ? styles.hoveredMenuItem : {}),
          }}
          onMouseEnter={() => handleMouseEnter("Dining Menu")}
          onMouseLeave={handleMouseLeave}
          onClick={() => isMobile && setIsMenuOpen(false)}
        >
          Dining Menu
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/Dining"
          style={{
            ...styles.menuItem,
            ...(hoveredItem === "Gallery" ? styles.hoveredMenuItem : {}),
          }}
          onMouseEnter={() => handleMouseEnter("Gallery")}
          onMouseLeave={handleMouseLeave}
          onClick={() => isMobile && setIsMenuOpen(false)}
        >
          Gallery
        </Menu.Item>

        <Menu.Item
          style={{
            ...styles.menuItem,
            ...(hoveredItem === "Utility" ? styles.hoveredMenuItem : {}),
          }}
          onMouseEnter={() => handleMouseEnter("Utility")}
          onMouseLeave={handleMouseLeave}
          onClick={() =>
            isMobile &&
            setActiveDropdown(activeDropdown === "Utility" ? null : "Utility")
          }
        >
          Utility
          {renderDropdownContent("Utility")}
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/admin"
          style={{
            ...styles.menuItem,
            ...(hoveredItem === "Admin" ? styles.hoveredMenuItem : {}),
          }}
          onMouseEnter={() => handleMouseEnter("Admin")}
          onMouseLeave={handleMouseLeave}
          onClick={() => isMobile && setIsMenuOpen(false)}
        >
          Admin
        </Menu.Item>

        <Menu.Item
          style={{
            ...styles.menuItem,
            ...(hoveredItem === "User" ? styles.hoveredMenuItem : {}),
          }}
          onMouseEnter={() => handleMouseEnter("User")}
          onMouseLeave={handleMouseLeave}
          onClick={() =>
            isMobile &&
            setActiveDropdown(activeDropdown === "User" ? null : "User")
          }
        >
          User
          {renderDropdownContent("User")}
        </Menu.Item>
      </div>
    </Menu>
  );
};

export default Navbar;
