import axios from "axios";

export const refreshToken = async () => {
  try {
    const response = await axios.post("/api/token/refresh/", {}, {
      withCredentials: true, // Ensures cookies are sent
    });

    if (response.status === 200) {
      const { access } = response.data;

      // Store the new access token in session storage
      sessionStorage.setItem("access_token", access);
      console.log("Access token refreshed successfully.");
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    // Handle error (e.g., navigate to login if refresh token is expired)
  }
};
