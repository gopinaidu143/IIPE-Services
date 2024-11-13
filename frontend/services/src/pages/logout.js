// import axios from "axios";

// export const handleLogout = async (navigate, callback) => {
//   try {
//     const response = await axios.post(
//       "/api/logout/",
//       {}, // No body content needed as we are using cookies
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${sessionStorage.getItem("access_token")}`, // Add the access token in the Authorization header
//         },
//         withCredentials: true, // Ensure cookies are sent with the request
//       }
//     );

//     if (response.status === 205) {
//       // Clear session and local storage
//       sessionStorage.clear();
//       localStorage.clear();
//       alert("Logout successful.");

//       // // Navigate to the homepage or login page
//       // navigate("/");

//       if (callback) callback();
//     }
//   } catch (error) {
//     console.error("Logout error:", error);
//     alert("Something went wrong. Please try again.");
//   }
// };
import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const LogoutButton = () => {
    const { logoutUser } = useContext(AuthContext);

    return <button onClick={logoutUser}>Logout</button>;
};

export default LogoutButton;
