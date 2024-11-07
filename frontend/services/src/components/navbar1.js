// import React, { useState, useEffect } from "react";
// import logo from "../assets/logo.jpg";
// import axios from "axios";

// const Navbar1 = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [hoveredItem, setHoveredItem] = useState(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 1000);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     // Check if tokens exist in session storage to set authentication status
//     const accessToken = sessionStorage.getItem("access_token");
//     const refreshToken = localStorage.getItem("refresh_token");
//     setIsAuthenticated(!!accessToken && !!refreshToken);
//   }, []);

//   const logout = async () => {
//     const refreshToken = sessionStorage.getItem("refresh_token");

//     try {
//       const response = await axios.post(
//         "/api/logout/",
//         { refresh: refreshToken },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
//           },
//         }
//       );

//       if (response.status === 205) {
//         sessionStorage.clear();
//         localStorage.clear();
//         setIsAuthenticated(false); // Update authentication status
//         alert("Logout successfully.");
//         window.location.href = "/";
//       }
//     } catch (error) {
//       console.error("Logout error:", error);
//       alert("Something went wrong. Please try again.");
//     }
//   };



//   const styles = {
//     navbar: {
//       backgroundColor: "#f47c21",
//       width: "100%",
//       position: "fixed",
//       top: 0,
//       left: 0,
//       zIndex: 1001,
//       boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//     },
//     container: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//       minHeight: "100px",
//       padding: "0 20px",
//       position: "relative",
//     },
//     logoContainer: {
//       display: "flex",
//       alignItems: "center",
//     },
//     logo: {
//       maxHeight: "100px",
//       width: "120px",
//       marginRight: "15px",
//     },
//     instituteName: {
//       color: "white",
//       fontWeight: "bold",
//       fontFamily: "Times New Roman",
//       fontSize: isMobile ? "1.5rem" : "1.8rem",
//     },
//     menuContainer: {
//       display: isMobile ? "none" : "flex",
//       alignItems: "center",
//       marginLeft: "auto",
//     },
//     menuItem: {
//       color: "white",
//       fontSize: "1rem",
//       marginLeft: "20px",
//       textDecoration: "none",
//       padding: "10px 15px",
//       position: "relative",
//       cursor: "pointer",
//     },
//     hamburger: {
//       display: isMobile ? "block" : "none",
//       color: "white",
//       cursor: "pointer",
//       padding: "10px",
//       border: "none",
//       background: "none",
//     },
//     mobileMenu: {
//       display: isOpen ? "block" : "none",
//       position: "absolute",
//       top: "100%",
//       left: 0,
//       right: 0,
//       backgroundColor: "#f47c21",
//       padding: "10px 0",
//       boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
//     },
//     mobileMenuItem: {
//       color: "white",
//       padding: "12px 20px",
//       display: "block",
//       borderBottom: "1px solid rgba(255,255,255,0.1)",
//       cursor: "pointer",
//     },
//     dropdown: (isVisible) => ({
//       position: "absolute",
//       top: "100%",
//       left: 0,
//       backgroundColor: "#f47c21",
//       minWidth: "200px",
//       boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
//       display: isVisible ? "block" : "none",
//       zIndex: 1001,
//     }),
//     dropdownMobile: {
//       position: "static",
//       backgroundColor: "rgba(255,255,255,0.1)",
//       boxShadow: "none",
//       display: "block",
//       padding: "0 20px",
//     },
//     dropdownItem: {
//       color: "white",
//       padding: "10px 15px",
//       display: "block",
//       textDecoration: "none",
//       whiteSpace: "nowrap",
//       transition: "background-color 0.3s",
//     },
//     menuItemContainer: {
//       position: "relative",
//       display: "inline-block",
//     },
//   };


//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "About IIPE", path: "/about" },
//     { name: "Academics", path: "/academics" },
//     {
//       name: "People",
//       dropdownItems: [
//         { name: "Faculty", path: "/people/faculty" },
//         { name: "Staff", path: "/people/staff" },
//       ],
//     },
//     {
//       name: "Students",
//       dropdownItems: [
//         { name: "Undergrad", path: "/students/undergrad" },
//         { name: "Postgrad", path: "/students/postgrad" },
//       ],
//     },
//     { name: "Placements", path: "/placements" },
//     {
//       name: "Resources",
//       dropdownItems: [
//         { name: "Library", path: "/resources/library" },
//         { name: "Labs", path: "/resources/labs" },
//         { name: "GuestHouse booking", path: "/GuestHousebooking" },
//         { name: "OPD", path: "/OPD" },
//       ],
//     },
//     {
//       name: "User",
//       dropdownItems: isAuthenticated
//         ? [{ name: "Logout", path: "/", onClick: () => logout()  }]
//         : [
//             { name: "Student", path: "/login?role=Student" },
//             { name: "Employee", path: "/login?role=Employee" },
//             { name: "Faculty", path: "/login?role=Faculty" },
//             { name: "ExEmployee", path: "/login?role=ExEmployee" },
//             { name: "Alumni", path: "/login?role=Alumni" },
//           ],
//     },
//   ];

//   return (
//     <nav style={styles.navbar}>
//       <div style={styles.container}>
//         <div style={styles.logoContainer}>
//           <img src={logo} alt="Institute Logo" style={styles.logo} />
//           <span style={styles.instituteName}>IIPE</span>
//         </div>

//         {/* Desktop Menu */}
//         <div style={styles.menuContainer}>
//           {navLinks.map((link, index) => (
//             <div
//               key={link.name}
//               style={styles.menuItemContainer}
//               onMouseEnter={() => setHoveredItem(link.name)}
//               onMouseLeave={() => setHoveredItem(null)}
//             >
//               {link.path ? (
//                 <a
//                   href={link.path}
//                   style={styles.menuItem}
//                   onClick={link.onClick}
//                 >
//                   {link.name}
//                 </a>
//               ) : (
//                 <div style={styles.menuItem}>
//                   {link.name}
//                 </div>
//               )}
//               {link.dropdownItems && (
//                 <div style={styles.dropdown(hoveredItem === link.name)}>
//                   {link.dropdownItems.map((item) => (
//                     item.onClick ? (
//                       <button
//                         key={index}
//                         onClick={item.onClick}
//                         style={styles.dropdownItem}
//                       >
//                         {item.name}
//                       </button>
//                     ) :<a
//                       key={item.name}
//                       href={item.path}
//                       style={styles.dropdownItem}
//                       onClick={item.onClick}
//                     >
//                       {item.name}
//                     </a>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Hamburger Menu */}
//         <button onClick={() => setIsOpen(!isOpen)} style={styles.hamburger}>
//           <svg /* SVG icon code */ />
//         </button>

//         {/* Mobile Menu */}
//         <div style={styles.mobileMenu}>
//           {navLinks.map((link) => (
//             <div key={link.name}>
//               {link.path ? (
//                 <a href={link.path} style={styles.mobileMenuItem} onClick={link.onClick}>
//                   {link.name}
//                 </a>
//               ) : (
//                 <div
//                   style={styles.mobileMenuItem}
//                   onClick={() =>
//                     setActiveDropdown(activeDropdown === link.name ? null : link.name)
//                   }
//                 >
//                   {link.name}
//                 </div>
//               )}
//               {link.dropdownItems && activeDropdown === link.name && (
//                 <div style={{ ...styles.dropdown(true), ...styles.dropdownMobile }}>
//                   {link.dropdownItems.map((item) => (
//                     <a
//                       key={item.name}
//                       href={item.path}
//                       style={styles.dropdownItem}
//                       onClick={item.onClick}
//                     >
//                       {item.name}
//                     </a>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar1;


import React, { useState, useEffect } from "react";
import logo from "../assets/logo.jpg";
import axios from "axios";

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    setIsAuthenticated(!!accessToken && !!refreshToken);
  }, []);


  
  useEffect(() => {
    const fetchServices = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userRole = storedUser ? storedUser.role : null;

      // Only fetch if user is authenticated and role is available
      if (isAuthenticated && userRole) {
        const apiUrl = `/api/services/?role=${userRole}`;
        try {
          const response = await axios.get(apiUrl);
          setResources(response.data); // Set resources here
          console.log("Fetched services:", response.data);
        } catch (error) {
          console.error("Error fetching services:", error);
        }
      }
      else{
        const apiUrl = "/api/services";
        try {
          const response = await axios.get(apiUrl);
          setResources(response.data); // Set resources here
          console.log("Fetched services:", response.data);
        } catch (error) {
          console.error("Error fetching services:", error);
        }
      }
    };

    fetchServices();
  }, [isAuthenticated]);

  const logout = async () => {
    try {
      const response = await axios.post(
        "/api/logout/",
        { refresh: sessionStorage.getItem("refresh_token") },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        }
      );
  
      if (response.status === 205) {
        sessionStorage.clear();
        localStorage.clear();
        setIsAuthenticated(false);
        setResources([]); // Clear resources on logout
        alert("Logout successfully.");
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  

    const styles = {
    navbar: {
      backgroundColor: "#f47c21",
      width: "100%",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 1001,
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      minHeight: "100px",
      padding: "0 20px",
      position: "relative",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
    },
    logo: {
      maxHeight: "100px",
      width: "120px",
      marginRight: "15px",
    },
    instituteName: {
      color: "white",
      fontWeight: "bold",
      fontFamily: "Times New Roman",
      fontSize: isMobile ? "1.5rem" : "1.8rem",
    },
    menuContainer: {
      display: isMobile ? "none" : "flex",
      alignItems: "center",
      marginLeft: "auto",
    },
    menuItem: {
      color: "white",
      fontSize: "1rem",
      marginLeft: "20px",
      textDecoration: "none",
      padding: "10px 15px",
      position: "relative",
      cursor: "pointer",
    },
    hamburger: {
      display: isMobile ? "block" : "none",
      color: "white",
      cursor: "pointer",
      padding: "10px",
      border: "none",
      background: "none",
    },
    mobileMenu: {
      display: isOpen ? "block" : "none",
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      backgroundColor: "#f47c21",
      padding: "10px 0",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    },
    mobileMenuItem: {
      color: "white",
      padding: "12px 20px",
      display: "block",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
      cursor: "pointer",
    },
    dropdown: (isVisible) => ({
      position: "absolute",
      top: "100%",
      left: 0,
      backgroundColor: "#f47c21",
      minWidth: "200px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      display: isVisible ? "block" : "none",
      zIndex: 1001,
    }),
    dropdownMobile: {
      position: "static",
      backgroundColor: "rgba(255,255,255,0.1)",
      boxShadow: "none",
      display: "block",
      padding: "0 20px",
    },
    dropdownItem: {
      color: "white",
      padding: "10px 15px",
      display: "block",
      textDecoration: "none",
      whiteSpace: "nowrap",
      transition: "background-color 0.3s",
    },
    menuItemContainer: {
      position: "relative",
      display: "inline-block",
    },
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About IIPE", path: "/about" },
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
    {
      name: "Resources",
      dropdownItems: resources.map((resource) => ({
        name: resource.service_name,
        
        path: '/',
      })),
    },
    {
      name: "User",
      dropdownItems: isAuthenticated
        ? [{ name: "Logout", path: "/", onClick: () => logout() }]
        : [
            { name: "Student", path: "/login?role=Student" },
            { name: "Employee", path: "/login?role=Employee" },
            { name: "Faculty", path: "/login?role=Faculty" },
            { name: "ExEmployee", path: "/login?role=ExEmployee" },
            { name: "Alumni", path: "/login?role=Alumni" },
          ],
    },
  ];

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <div style={styles.logoContainer}>
          <img src={logo} alt="Institute Logo" style={styles.logo} />
          <span style={styles.instituteName}>IIPE</span>
        </div>

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
                  style={styles.menuItem}
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
                    item.onClick ? (
                      <button
                        key={index}
                        onClick={item.onClick}
                        style={styles.dropdownItem}
                      >
                        {item.name}
                      </button>
                    ) : <a
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
          <svg /* SVG icon code */ />
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
                <div
                  style={styles.mobileMenuItem}
                  onClick={() =>
                    setActiveDropdown(activeDropdown === link.name ? null : link.name)
                  }
                >
                  {link.name}
                </div>
              )}
              {link.dropdownItems && activeDropdown === link.name && (
                <div style={{ ...styles.dropdown(true), ...styles.dropdownMobile }}>
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
      </div>
    </nav>
  );
};

export default Navbar1;