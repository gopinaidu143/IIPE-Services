import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    let [authTokens, setAuthTokens] = useState(()=> sessionStorage.getItem('access_token') ? sessionStorage.getItem('access_token') : null)
    let [isAuthenticated, setIsAuthenticated] = useState(()=> sessionStorage.getItem('access_token') ? true : false)
    let [user, setUser] = useState(()=> sessionStorage.getItem('access_token') ? jwtDecode(sessionStorage.getItem('access_token')).username : null)
    let [role, setRole] = useState(()=> sessionStorage.getItem('access_token') ? jwtDecode(sessionStorage.getItem('access_token')).role : null)
    let [email, setMail] = useState(()=> sessionStorage.getItem('access_token') ? jwtDecode(sessionStorage.getItem('access_token')).email : null)
    // let [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    // Login function
    const loginUser = async (email, password, role) => {
        try {
            const response = await axios.post('/api/login/', {
                email,
                password,
                role,
            }, {
                withCredentials: true,
            });

            const { access, user, message } = response.data;
            sessionStorage.setItem('access_token', access);
            localStorage.setItem('user', JSON.stringify(user));
            const decodeData = jwtDecode(access);
            setAuthTokens(access);
            setUser(decodeData['username']);
            setRole(decodeData['role']);
           
            setMail(decodeData['email']);
            setIsAuthenticated(true);
            alert(message);
            // console.log(jwtDecode(sessionStorage.getItem('access_token')).username)
            // console.log(user,role,email,authTokens);

            navigate('/'); // Redirect to home page or another protected route
        } catch (error) {
            console.error("Login failed", error);
            alert("Invalid email, password, or role. Please try again.");
        }
    };

    // useEffect(() => {
    //     if (user && role && email && authTokens) {
    //         console.log("User:", user, "Role:", role, "Email:", email, "Auth Tokens:", authTokens);
    //         console.log(sessionStorage.getItem("access_token"));
    //     }
    // }, [user, role, email, authTokens]);

    // Logout function
    // Updated logoutUser function
    const logoutUser = async () => {
        try {
            const token = sessionStorage.getItem('access_token');
    
            // Make logout request with the parsed access token
            const response = await axios.post(
                '/api/logout/',
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, // Attach token correctly
                    },
                    withCredentials: true,
                }
            );
            console.log(response.status)
            // Confirm response status for successful logout
            if (response.status === 205) {
                console.log("Logout response:", response.data);
    
                // Clear session storage first
                sessionStorage.clear();
                localStorage.clear();
    
                // Update state immediately after clearing storage
                setAuthTokens(null);
                setUser(null);
                setMail(null);
                setRole(null);
                setIsAuthenticated(false);    
                alert("Logout successful.");
                // navigate('/login'); // Redirect to login page
            } else {
                sessionStorage.clear();
                localStorage.clear();
    
                // Update state immediately after clearing storage
                setAuthTokens(null);
                setUser(null);
                setMail(null);
                setRole(null);
                setIsAuthenticated(false);    
                alert("Logout successful.");
                console.error("Unexpected logout response:", response);
                alert("Something went wrong with logout. Please try again.");
            }
        } catch (error) {
                sessionStorage.clear();
                localStorage.clear();
    
                // Update state immediately after clearing storage
                setAuthTokens(null);
                setUser(null);
                setMail(null);
                setRole(null);
                setIsAuthenticated(false);    
                alert("Logout successful.");
            console.error("Logout error:", error);
            alert("Something went wrong. Please try again.");
        }
    };
    


    // Token refresh function
    const refreshToken = async () => {
        try {
            const response = await axios.post("/api/token/refresh/", {}, {
                withCredentials: true,
            });
            if (response.status === 200) {
                const { access } = response.data;
                sessionStorage.setItem("access_token", access);
                setAuthTokens(access);
                console.log("Access token refreshed successfully.");
            } else {
                logoutUser(); // Optional: Automatically logout if refresh fails
            }
        } catch (error) {
            console.error("Error refreshing token:", error);
            logoutUser(); // Logout if token refresh fails
        }
    };
    

    useEffect(() => {
        const fourMinutes = 1000 * 60 * 27;
    
        const interval = setInterval(() => {
            if (authTokens) {
                refreshToken();
            }
        }, fourMinutes);
    
        return () => clearInterval(interval);
    }, [authTokens]);
    

    const contextData = {
        user:user,
        role:role,
        email:email,
        authTokens:authTokens,
        isAuthenticated:isAuthenticated,
        loginUser:loginUser,
        logoutUser:logoutUser,
        
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};
