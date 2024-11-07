import axios from "axios";

const logout = async () => {
  const refreshToken = sessionStorage.getItem("refresh_token");

  try {
   
    const response = await axios.post(
      "/api/logout/",  
      { refresh: refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      }
    );

    if (response.status === 205) {
      sessionStorage.clear();
      alert("Logout successful.");
      window.location.href = "/"; 
    }
  } catch (error) {
    console.error("Logout error:", error);
    alert("Something went wrong. Please try again.");
  }
};

export default logout;