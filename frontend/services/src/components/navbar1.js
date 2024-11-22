import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const navigate = useNavigate();

  const { user, role, authTokens, isAuthenticated, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // You can add any additional effects based on authentication status here
  }, [isAuthenticated, user]);

  const isMobile = windowWidth < 1000;

  const logout = () => {
    logoutUser();
  };

  const styles = {
    navbar: {
      backgroundColor: "#2c3e50",
      width: "100%",
      position: "absolute",
      left: 0,
      zIndex: 1001,
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease",
    },
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 30px",
      position: "relative",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    // logoContainer: {
    //   display: "flex",
    //   alignItems: "center",
    // },
    // logo: {
    //   maxHeight: "80px",
    //   width: "100px",
    //   marginRight: "15px",
    // },
    instituteName: {
      color: "white",
      fontWeight: "bold",
      fontFamily: "Arial, sans-serif",
      fontSize: isMobile ? "1.5rem" : "2rem",
      transition: "all 0.3s ease",
    },
    menuContainer: {
      display: isMobile ? "none" : "flex",
      alignItems: "center",
      marginLeft: "auto",
    },
    menuItem: {
      color: "white",
      fontSize: "1.1rem",
      marginLeft: "30px",
      textDecoration: "none",
      padding: "12px 18px",
      position: "relative",
      cursor: "pointer",
      borderRadius: "4px",
      transition: "background-color 0.3s ease",
    },
    menuItemHover: {
      backgroundColor: "#34495e",
    },
    hamburger: {
      display: isMobile ? "block" : "none",
      color: "white",
      cursor: "pointer",
      padding: "10px",
      border: "none",
      background: "none",
      fontSize: "1.5rem",
    },
    mobileMenu: {
      display: isOpen ? "block" : "none",
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      backgroundColor: "#34495e",
      padding: "10px 0",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    mobileMenuItem: {
      color: "white",
      padding: "12px 20px",
      display: "block",
      borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    dropdown: (isVisible) => ({
      position: "absolute",
      top: "100%",
      left: 0,
      backgroundColor: "#343f5e",
      minWidth: "180px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
      display: isVisible ? "block" : "none",
      zIndex: 1001,
      borderRadius: "4px",
    }),
    dropdownItem: {
      color: "white",
      padding: "10px 15px",
      display: "block",
      textDecoration: "none",
      transition: "background-color 0.3s ease",
    },
    dropdownItemHover: {
      backgroundColor: "#1abc9c",
    },
    menuItemContainer: {
      position: "relative",
      display: "inline-block",
    },
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Academics", path: "/academics" },
    {
      name: "People",
      dropdownItems: [
        { name: "Faculty", path: "/people/faculty" },
        { name: "Staff", path: "/people/staff" },
      ],
    },
    {
      name: "Students",
      dropdownItems: [
        { name: "Undergrad", path: "/students/undergrad" },
        { name: "Postgrad", path: "/students/postgrad" },
      ],
    },
    { name: "Placements", path: "/placements" },
    { name: "Services", path: "/services" },
    {
      name: isAuthenticated ? user : "Login",
      dropdownItems: isAuthenticated
        ? [{ name: "Logout", path: "#", onClick: logout }]
        : [
            { name: "Student", path: "/login?role=Student" },
            { name: "Employee", path: "/login?role=Employee" },
            { name: "Faculty", path: "/login?role=Faculty" },
            { name: "ExEmployee", path: "/login?role=ExEmployee" },
            { name: "Alumni", path: "/login?role=Alumni" },
            { name: "Reset Password", path: "/reset-password" },
          ],
    },
  ];

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        {/* <div style={styles.logoContainer}>
          <img src="/path-to-your-logo.png" alt="Logo" style={styles.logo} />
          <span style={styles.instituteName}>IIPE</span>
        </div> */}

        {/* Desktop Menu */}
        <div style={styles.menuContainer}>
          {navLinks.map((link, index) => (
            <div
              key={link.name}
              style={styles.menuItemContainer}
              onMouseEnter={() => setHoveredItem(link.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {link.path ? (
                <a
                  href={link.path}
                  style={{
                    ...styles.menuItem,
                    ...(hoveredItem === link.name ? styles.menuItemHover : {}),
                  }}
                  onClick={link.onClick}
                >
                  {link.name}
                </a>
              ) : (
                <div style={styles.menuItem}>
                  {link.name}
                </div>
              )}
              {link.dropdownItems && (
                <div style={styles.dropdown(hoveredItem === link.name)}>
                  {link.dropdownItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.path}
                      style={styles.dropdownItem}
                      onClick={item.onClick}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Hamburger Menu */}
        <button onClick={() => setIsOpen(!isOpen)} style={styles.hamburger}>
          ☰
        </button>

        {/* Mobile Menu */}
        <div style={styles.mobileMenu}>
          {navLinks.map((link) => (
            <div key={link.name}>
              {link.path ? (
                <a href={link.path} style={styles.mobileMenuItem} onClick={link.onClick}>
                  {link.name}
                </a>
              ) : (
                <div style={styles.mobileMenuItem}>
                  {link.name}
                </div>
              )}
              {link.dropdownItems && (
                <div>
                  {link.dropdownItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.path}
                      style={{...styles.mobileMenuItem, paddingLeft: '30px'}}
                      onClick={item.onClick}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar1;