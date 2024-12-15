// import React, { useState, useEffect, useContext, useCallback } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../assets/logo.jpg";
// import axios from "axios";
// import AuthContext from "../context/AuthContext";

// const Navbar = () => {
//   const { user, isAuthenticated, logoutUser } = useContext(AuthContext);
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();

//   const logoutAndRedirect = () => {
//     logoutUser();
//     // navigate("/"); // Redirect to home page after logout
//   };

//   return (
//     <nav className="navbar">
//       <img src={logo} alt="Logo" className="logo" />
//       <div className="nav-links">
//         <Link to="/" className="link">
//           <i className="fas fa-home"></i> Home
//         </Link>
//         <div className="dropdown">
//           <button onClick={() => setIsOpen(!isOpen)} className="dropdown-btn">
//             {user || "Guest"} <i className={`fas fa-chevron-${isOpen ? "up" : "down"}`}></i>
//           </button>
//           <div className={`dropdown-content ${isOpen ? "show" : ""}`}>
//             {isAuthenticated ? (
//               <button onClick={logoutAndRedirect} className="logout-btn">
//                 <i className="fas fa-sign-out-alt"></i> Logout
//               </button>
//             ) : (
//               <Link to="/login" className="link">
//                 <i className="fas fa-sign-in-alt"></i> Login
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// const ServiceCard = ({ name, description }) => (
//   <div className="service-card">
//     <h3 className="service-name">{name}</h3>
//     <p className="service-description">{description || "No description available"}</p>
//   </div>
// );

// const ServicesPage = () => {
//   const [filteredServices, setFilteredServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { user, role, isAuthenticated } = useContext(AuthContext);

//   const fetchServices = useCallback(async () => {
//     const apiUrl = isAuthenticated ? `/api/services/?role=${role}` : "/api/services/";
//     try {
//       const response = await axios.get(apiUrl);
//       setFilteredServices(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error fetching services:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [role, isAuthenticated]);

//   useEffect(() => {
//     fetchServices();
//   }, [fetchServices]);

//   return (
//     <div className="services-page">
//       <Navbar />
//       <div className="services-container">
//         <h1 className="services-header">Our Services</h1>
//         {loading ? (
//           <div className="loading">Loading...</div>
//         ) : (
//           <div className="services-grid">
//             {filteredServices.length > 0 ? (
//               filteredServices.map((service, index) => (
//                 <ServiceCard
//                   key={index}
//                   name={service.service_name}
//                   description={service.description}
//                 />
//               ))
//             ) : (
//               <p>No services found</p>
//             )}
//           </div>
//         )}
//       </div>
//       <style jsx>{`
//         /* Navbar Styles */
//         .navbar {
//           background-color: #2c3e50;
//           padding: 15px 30px;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//         }

//         .navbar .logo {
//           height: 80px;
//           border-radius: 10px;
//         }

//         .navbar .nav-links {
//           display: flex;
//           align-items: center;
//         }

//         .navbar .link {
//           color: white;
//           text-decoration: none;
//           margin-left: 20px;
//           font-size: 18px;
//           transition: color 0.3s ease;
//         }

//         .navbar .link:hover {
//           color: #f39c12;
//         }

//         .navbar .dropdown {
//           position: relative;
//         }

//         .navbar .dropdown-btn {
//           background: none;
//           border: none;
//           color: white;
//           font-size: 18px;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//         }

//         .navbar .dropdown-content {
//           display: none;
//           position: absolute;
//           background-color: black;
//           padding: 10px 20px;
//           box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
//           right: 0;
//           border-radius: 5px;
//         }

//         .navbar .dropdown-content.show {
//           display: block;
//         }

//         .navbar .logout-btn {
//           background: none;
//           border: none;
//           color: #e74c3c;
//           cursor: pointer;
//         }

//         /* Service Page Styles */
//         .services-page {
//           background-color: #f4f6f9;
//           padding: 20px;
//         }

//         .services-container {
//           max-width: 1200px;
//           margin: 0 auto;
//         }

//         .services-header {
//           font-size: 2.5rem;
//           font-weight: bold;
//           text-align: center;
//           color: #2c3e50;
//           margin-bottom: 40px;
//         }

//         .services-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//           gap: 30px;
//         }

//         .service-card {
//           background-color: #fff;
//           padding: 20px;
//           border-radius: 10px;
//           box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//           text-align: center;
//         }

//         .service-card:hover {
//           transform: translateY(-10px);
//           box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
//         }

//         .service-name {
//           font-size: 1.5rem;
//           color: #34495e;
//           margin-bottom: 10px;
//         }

//         .service-description {
//           color: #7f8c8d;
//           font-size: 1rem;
//         }

//         .loading {
//           text-align: center;
//           font-size: 1.5rem;
//           color: #7f8c8d;
//           margin-top: 40px;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ServicesPage;




import React, { useState, useEffect, useContext, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const { user, isAuthenticated, logoutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const logoutAndFetch = () => {
    logoutUser();
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="logo" />
      <div className="nav-links">
        <Link to="/" className="link">
          <i className="fas fa-home"></i> Home
        </Link>
        <div className="dropdown">
          <button onClick={() => setIsOpen(!isOpen)} className="dropdown-btn">
            {user || "Guest"} <i className={`fas fa-chevron-${isOpen ? "up" : "down"}`}></i>
          </button>
          <div className={`dropdown-content ${isOpen ? "show" : ""}`}>
            {isAuthenticated ? (
              <button onClick={logoutAndFetch} className="logout-btn">
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            ) : (
              <Link to="/login" className="link">
                <i className="fas fa-sign-in-alt"></i> Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const ServiceCard = ({ name, description }) => (
  <div className="service-card">
    <h3 className="service-name">{name}</h3>
    <p className="service-description">{description || "No description available"}</p>
  </div>
);

const ServicesPage = () => {
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { role, isAuthenticated,designation } = useContext(AuthContext);
  

  const fetchServices = useCallback(async () => {
    setLoading(true);
    console.log(designation);
    let apiUrl = "/api/services/";
    if (isAuthenticated) {
        apiUrl = `/api/services/?role=${role}`;
        if (role === "Employee" && designation) {
            apiUrl += `&designation=${designation}`;
        }
    }
    try {
      const response = await axios.get(apiUrl);
      setFilteredServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  }, [role, isAuthenticated]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices, isAuthenticated]);

  return (
    <div className="services-page">
      <Navbar />
      <div className="services-container">
        <h1 className="services-header">Our Services</h1>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="services-grid">
            {filteredServices.length > 0 ? (
              filteredServices.map((service, index) => (
                <ServiceCard
                  key={index}
                  name={service.service_name}
                  description={service.description}
                />
              ))
            ) : (
              <p>No services found</p>
            )}
          </div>
        )}
      </div>
      <style jsx>{`
        /* Navbar Styles */
        .navbar {
          background-color: #2c3e50;
          padding: 15px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .navbar .logo {
          height: 80px;
          border-radius: 10px;
        }
        .navbar .nav-links {
          display: flex;
          align-items: center;
        }
        .navbar .link {
          color: white;
          text-decoration: none;
          margin-left: 20px;
          font-size: 18px;
          transition: color 0.3s ease;
        }
        .navbar .link:hover {
          color: #f39c12;
        }
        .navbar .dropdown {
          position: relative;
        }
        .navbar .dropdown-btn {
          background: none;
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        .navbar .dropdown-content {
          display: none;
          position: absolute;
          background-color: black;
          padding: 10px 20px;
          box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
          right: 0;
          border-radius: 5px;
        }
        .navbar .dropdown-content.show {
          display: block;
        }
        .navbar .logout-btn {
          background: none;
          border: none;
          color: #e74c3c;
          cursor: pointer;
        }

        /* Service Page Styles */
        .services-page {
          background-color: #f4f6f9;
          padding: 20px;
        }

        .services-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .services-header {
          font-size: 2.5rem;
          font-weight: bold;
          text-align: center;
          color: #2c3e50;
          margin-bottom: 40px;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 30px;
        }

        .service-card {
          background-color: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          text-align: center;
        }

        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }

        .service-name {
          font-size: 1.5rem;
          color: #34495e;
          margin-bottom: 10px;
        }

        .service-description {
          color: #7f8c8d;
          font-size: 1rem;
        }

        .loading {
          text-align: center;
          font-size: 1.5rem;
          color: #7f8c8d;
          margin-top: 40px;
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;
