// import React from "react";
// import logo from "../assets/logo.png";

// const Header = ({ logoHeight, fontSize, flexDirection }) => {
//   const headerStyle = {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: flexDirection,
//     margin: "auto",
//     padding: "10px",
//     width: "100%",
//     borderBottom: "#2c3e50",
//   };

//   const logoStyle = {
//     width: "auto",
//     height: logoHeight,
//     border: "2px solid white",
//     marginRight: flexDirection === "row" ? "20px" : "0",
//     marginBottom: "10px",
//   };

//   const headerTextStyle = {
//     fontWeight: "bold",
//     fontFamily: "Tahoma",
//     color: "#2c3e50",
//     textAlign: "center",
//     fontSize: fontSize,
//   };
//   const getResponsiveStyles = () => {
//     if (windowWidth <= 480) {
//       return {
//         logoHeight: "70px",
//         fontSize: "0.8em",
//         flexDirection: "row",
//       };
//     } else if (windowWidth <= 670) {
//       return {
//         logoHeight: "80px",
//         fontSize: "1em",
//         flexDirection: "row",
//       };
//     } else if (windowWidth <= 846) {
//       return {
//         logoHeight: "90px",
//         fontSize: "1.2em",
//         flexDirection: "row",
//       };
//     } else {
//       return {
//         logoHeight: "120px",
//         fontSize: "1.5em",
//         flexDirection: "row",
//       };
//     }
//   };
//   return (
//     <div
//       style={{
//         maxWidth: "100%",
//         fontFamily: "tahoma",
//         padding: "20px",
//         backgroundColor: "white",
//       }}
//     >
//     <div style={headerStyle}>
//       <img src={logo} alt="Institute Logo" style={logoStyle} />
//       <div style={{ textAlign: "center" }}>
//         <h1 style={headerTextStyle}>
//           भारतीय पेट्रोलियम और ऊर्जा संस्थान, विशाखापत्तनम
//         </h1>
//         <h1 style={headerTextStyle}>
//           INDIAN INSTITUTE OF PETROLEUM & ENERGY, VISHAKAPATNAM
//         </h1>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Header;


import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";

const Header = () => {
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

  const { logoHeight, fontSize, flexDirection } = getResponsiveStyles();

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: flexDirection,
    margin: "auto",
    padding: "10px",
    width: "100%",
    borderBottom: "#2c3e50",
  };

  const logoStyle = {
    width: "auto",
    height: logoHeight,
    border: "2px solid white",
    marginRight: flexDirection === "row" ? "20px" : "0",
    marginBottom: "10px",
  };

  const headerTextStyle = {
    fontWeight: "bold",
    fontFamily: "Tahoma",
    color: "#2c3e50",
    textAlign: "center",
    fontSize: fontSize,
  };

  return (
    <div
      style={{
        maxWidth: "100%",
        fontFamily: "tahoma",
        // padding: "10px",
        backgroundColor: "white",
      }}
    >
      <div style={headerStyle}>
        <img src={logo} alt="Institute Logo" style={logoStyle} />
        <div style={{ textAlign: "center" }}>
        <h1 style={headerTextStyle}>
        భారతీయ పెట్రోలియం మరియు శక్తి సంస్థ, విశాఖపట్నం
          </h1>
          <h1 style={headerTextStyle}>
            भारतीय पेट्रोलियम और ऊर्जा संस्थान, विशाखापत्तनम
          </h1>
          <h1 style={headerTextStyle}>
            INDIAN INSTITUTE OF PETROLEUM & ENERGY, VISHAKAPATNAM
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Header;