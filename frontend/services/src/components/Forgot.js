// import React, { useState } from "react";
// import Navbar1 from "./navbar1";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState(new Array(6).fill(""));
//   const [showOtpInput, setShowOtpInput] = useState(false);
//   const [showResetPassword, setShowResetPassword] = useState(false);
//   const [message, setMessage] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [reEnterPassword, setReEnterPassword] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [showPassword, setShowPassword] = useState(false); // For password visibility
//   const mockOtp = "123456"; // Mock OTP for verification

//   const validateEmail = (email) => {
//     // Basic regex for email validation
//     return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
//   };

//   const validatePassword = (password) => {
//     // Password must be at least 8 characters with an uppercase, lowercase, and number
//     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (!validateEmail(email)) {
//       setEmailError("Please enter a valid email address.");
//       return;
//     }
//     setEmailError("");

//     // Simulate OTP being sent
//     setMessage("Mock OTP sent successfully. Please check your email.");
//     setShowOtpInput(true); // Show OTP input fields and hide email form
//   };

//   const handleOtpChange = (element, index) => {
//     if (/^[0-9]$/.test(element.value) || element.value === "") {
//       const newOtp = [...otp];
//       newOtp[index] = element.value;
//       setOtp(newOtp);

//       // Automatically focus the next box if a digit is entered
//       if (element.nextSibling && element.value) {
//         element.nextSibling.focus();
//       }
//     }
//   };

//   const handleVerifyOtp = () => {
//     const enteredOtp = otp.join("");
//     if (enteredOtp === mockOtp) {
//       setMessage("OTP verified successfully.");
//       setShowResetPassword(true); // Show reset password fields
//       setShowOtpInput(false); // Hide OTP input fields
//     } else {
//       setMessage("Invalid OTP. Please try again.");
//     }
//   };

//   const handleResetPassword = (event) => {
//     event.preventDefault();
//     if (!validatePassword(newPassword)) {
//       setPasswordError(
//         "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, and a number."
//       );
//       return;
//     }
//     setPasswordError("");
//     if (newPassword !== reEnterPassword) {
//       setMessage("Passwords do not match. Please try again.");
//       return;
//     }
//     setMessage("Password reset successfully.");
//   };

//   const styles = {
//     card: {
//       backgroundColor: "white",
//       borderRadius: "9px",
//       boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//       padding: "30px",
//       width: "350px",
//       textAlign: "center",
//       marginBottom: "100px",
//       marginTop: "200px",
//     },
//     container: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       height: "100vh",
//       backgroundColor: "#f4f4f4",
//     },
//     otpInput: {
//       width: "40px",
//       height: "40px",
//       margin: "5px",
//       fontSize: "18px",
//       textAlign: "center",
//       borderRadius: "3px",
//       border: "1px solid #ccc",
//     },
//   };
//   const eyeIcon = (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="20"
//       height="20"
//       fill="currentColor"
//       viewBox="0 0 16 16"
//     >
//       <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
//       <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />
//     </svg>
//   );

//   const eyeSlashIcon = (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="20"
//       height="20"
//       fill="currentColor"
//       viewBox="0 0 16 16"
//     >
//       <path d="M13.359 11.238c-.895.905-2.06 1.79-3.355 1.79-3.018 0-5.5-4.5-5.5-4.5s2.482-4.5 5.5-4.5a5.352 5.352 0 0 1 3.355 1.79l.929-.928C12.794 2.684 10.565 2 8 2 3 2 0 8 0 8s3 6 8 6c2.566 0 4.794-.684 6.288-1.71l-.929-.928z" />
//       <path d="M11.75 5.25A3.5 3.5 0 1 0 4.75 8c0-.392.107-.76.289-1.089l1.392 1.392a2.5 2.5 0 1 1 3.535-3.535l1.392 1.392a3.5 3.5 0 0 0-.138-1.91zM5.232 4.04A4.355 4.355 0 0 1 8 3c2.019 0 4.5 3.5 4.5 3.5s-.754 1.155-1.683 1.897L5.232 4.04z" />
//     </svg>
//   );

//   return (
//     <>
//     <Navbar1/>
    
//     <div style={styles.container}>
      
//       <div style={styles.card}>
//         {/* Forgot Password Form */}
//         {!showOtpInput && !showResetPassword && (
//           <>
//             <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
//               Forgot Password
//             </h2>
//             <form onSubmit={handleSubmit}>
//               <div style={{ marginBottom: "15px", position: "relative" }}>
//                 <input
//                   type="email"
//                   id="email"
//                   placeholder="Enter Registered email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   style={{
//                     width: "90%",
//                     padding: "10px",
//                     border: "1px solid #ccc",
//                     borderRadius: "3px",
//                   }}
//                 />
//                 {emailError && <p style={{ color: "red" }}>{emailError}</p>}
//               </div>
//               <button
//                 type="submit"
//                 style={{
//                   backgroundColor: "#ff9833",
//                   color: "white",
//                   padding: "10px 15px",
//                   border: "none",
//                   borderRadius: "3px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Send OTP
//               </button>
//               {message && (
//                 <p
//                   style={{
//                     marginTop: "15px",
//                     color: message.includes("Error") ? "red" : "green",
//                   }}
//                 >
//                   {message}
//                 </p>
//               )}
//             </form>
//           </>
//         )}

//         {/* OTP Input Fields */}
//         {showOtpInput && !showResetPassword && (
//           <div style={{ marginTop: "20px" }}>
//             <h3>Enter OTP</h3>
//             <div>
//               {otp.map((value, index) => (
//                 <input
//                   key={index}
//                   type="text"
//                   maxLength="1"
//                   value={value}
//                   onChange={(e) => handleOtpChange(e.target, index)}
//                   style={styles.otpInput}
//                 />
//               ))}
//             </div>
//             <button
//               onClick={handleVerifyOtp}
//               style={{
//                 marginTop: "15px",
//                 backgroundColor: "#ff9833",
//                 color: "white",
//                 padding: "10px 15px",
//                 border: "none",
//                 borderRadius: "3px",
//                 cursor: "pointer",
//               }}
//             >
//               Verify OTP
//             </button>
//             {message && (
//               <p
//                 style={{
//                   marginTop: "15px",
//                   color: message.includes("Invalid") ? "red" : "green",
//                 }}
//               >
//                 {message}
//               </p>
//             )}
//           </div>
//         )}

//         {/* Reset Password Fields */}
//         {showResetPassword && (
//           <>
//             <h2>Reset Password</h2>
//             <form onSubmit={handleResetPassword}>
//               <div style={{ marginBottom: "15px" }}>
//                 <input
//                   type="email"
//                   value={email}
//                   readOnly
//                   style={{
//                     width: "90%",
//                     padding: "10px",
//                     border: "1px solid #ccc",
//                     borderRadius: "3px",
//                     backgroundColor: "#f0f0f0",
//                   }}
//                 />
//               </div>
//               <div style={{ marginBottom: "15px", position: "relative" }}>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="New Password"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   required
//                   style={{
//                     width: "90%",
//                     padding: "10px",
//                     border: "1px solid #ccc",
//                     borderRadius: "3px",
//                   }}
//                 />
//                 <span
//                   onClick={() => setShowPassword(!showPassword)}
//                   style={{
//                     position: "absolute",
//                     right: "10px",
//                     top: "12px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   {showPassword ? eyeSlashIcon : eyeIcon}
//                 </span>
//               </div>
//               {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
//               <div style={{ marginBottom: "15px", position: "relative" }}>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Re-enter New Password"
//                   value={reEnterPassword}
//                   onChange={(e) => setReEnterPassword(e.target.value)}
//                   required
//                   style={{
//                     width: "90%",
//                     padding: "10px",
//                     border: "1px solid #ccc",
//                     borderRadius: "3px",
//                   }}
//                 />
//                 <span
//                   onClick={() => setShowPassword(!showPassword)}
//                   style={{
//                     position: "absolute",
//                     right: "10px",
//                     top: "12px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   {showPassword ? eyeSlashIcon : eyeIcon}
//                 </span>
//               </div>
//               <button
//                 type="submit"
//                 style={{
//                   backgroundColor: "#ff9833",
//                   color: "white",
//                   padding: "10px 15px",
//                   border: "none",
//                   borderRadius: "3px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Reset Password
//               </button>
//               {message && (
//                 <p
//                   style={{
//                     marginTop: "15px",
//                     color: message.includes("not match") ? "red" : "green",
//                   }}
//                 >
//                   {message}
//                 </p>
//               )}
//             </form>
//           </>
//         )}
//       </div>
//     </div>
//     </>
//   );
// };

// export default ForgotPassword;





import React, { useState } from "react";
import Navbar1 from "./navbar1";
import { redirect } from "react-router-dom";
import { useNavigate } from 'react-router-dom';



const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // For password visibility
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");

    try {
      const response = await fetch('/api/forgot-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setShowOtpInput(true);
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleOtpChange = (element, index) => {
    if (/^[0-9]$/.test(element.value) || element.value === "") {
      const newOtp = [...otp];
      newOtp[index] = element.value;
      setOtp(newOtp);

      if (element.nextSibling && element.value) {
        element.nextSibling.focus();
      }
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");
    try {
      const response = await fetch('/api/verify-otp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp: enteredOtp }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setShowResetPassword(true);
        setShowOtpInput(false);
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (!validatePassword(newPassword)) {
      setPasswordError(
        "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, and a number."
      );
      return;
    }
    setPasswordError("");
    if (newPassword !== reEnterPassword) {
      setMessage("Passwords do not match. Please try again.");
      return;
    }

    try {
      const response = await fetch('/api/reset-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, new_password: newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        alert(data.message); // Show alert message
      setTimeout(() => {
        navigate('/'); // Redirect to home page after 2 seconds
      }, 2000);

        
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  const styles = {
    card: {
      backgroundColor: "white",
      borderRadius: "9px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      padding: "30px",
      width: "350px",
      textAlign: "center",
      marginBottom: "100px",
      marginTop: "200px",
    },
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f4f4f4",
    },
    otpInput: {
            width: "40px",
            height: "40px",
            margin: "5px",
            fontSize: "18px",
            textAlign: "center",
            borderRadius: "3px",
            border: "1px solid #ccc",
          },
  };


  const eyeIcon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />
        </svg>
      );
    
      const eyeSlashIcon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M13.359 11.238c-.895.905-2.06 1.79-3.355 1.79-3.018 0-5.5-4.5-5.5-4.5s2.482-4.5 5.5-4.5a5.352 5.352 0 0 1 3.355 1.79l.929-.928C12.794 2.684 10.565 2 8 2 3 2 0 8 0 8s3 6 8 6c2.566 0 4.794-.684 6.288-1.71l-.929-.928z" />
          <path d="M11.75 5.25A3.5 3.5 0 1 0 4.75 8c0-.392.107-.76.289-1.089l1.392 1.392a2.5 2.5 0 1 1 3.535-3.535l1.392 1.392a3.5 3.5 0 0 0-.138-1.91zM5.232 4.04A4.355 4.355 0 0 1 8 3c2.019 0 4.5 3.5 4.5 3.5s-.754 1.155-1.683 1.897L5.232 4.04z" />
        </svg>
      );

  return (
    <>
      <Navbar1 />
      <div style={styles.container}>
        <div style={styles.card}>
          {/* Forgot Password Form */}
          {!showOtpInput && !showResetPassword && (
            <>
              <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                Forgot Password
              </h2>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px", position: "relative" }}>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter Registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: "90%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "3px",
                    }}
                  />
                  {emailError && <p style={{ color: "red" }}>{emailError}</p>}
                </div>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#ff9833",
                    color: "white",
                    padding: "10px 15px",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                >
                  Send OTP
                </button>
                {message && (
                  <p
                    style={{
                      marginTop: "15px",
                      color: message.includes("Error") ? "red" : "green",
                    }}
                  >
                    {message}
                  </p>
                )}
              </form>
            </>
          )}

          {/* OTP Input Fields */}
          {showOtpInput && !showResetPassword && (
            <div style={{ marginTop: "20px" }}>
              <h3>Enter OTP</h3>
              <div>
                {otp.map((value, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={value}
                    onChange={(e) => handleOtpChange(e.target, index)}
                    style={styles.otpInput}
                  />
                ))}
              </div>
              <button
                onClick={handleVerifyOtp}
                style={{
                  marginTop: "15px",
                  backgroundColor: "#ff9833",
                  color: "white",
                  padding: "10px 15px",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
              >
                Verify OTP
              </button>
              {message && (
                <p
                  style={{
                    marginTop: "15px",
                    color: message.includes("Invalid") ? "red" : "green",
                  }}
                >
                  {message}
                </p>
              )}
            </div>
          )}

          {/* Reset Password Fields */}
          {showResetPassword && (
            <>
              <h2>Reset Password</h2>
              <form onSubmit={handleResetPassword}>
                <div style={{ marginBottom: "15px" }}>
                  <input
                    type="email"
                    value={email}
                    readOnly
                    style={{
                      width: "90%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "3px",
                      backgroundColor: "#f0f0f0",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "15px", position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    style={{
                      width: "90%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "3px",
                    }}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "12px",
                      cursor: "pointer",
                    }}
                  >
                    {showPassword ? eyeSlashIcon : eyeIcon}
                  </span>
                </div>
                {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
                <div style={{ marginBottom: "15px", position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Re-enter New Password"
                    value={reEnterPassword}
                    onChange={(e ) => setReEnterPassword(e.target.value)}
                    required
                    style={{
                      width: "90%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "3px",
                    }}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "12px",
                      cursor: "pointer",
                    }}
                  >
                    {showPassword ? eyeSlashIcon : eyeIcon}
                  </span>
                </div>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#ff9833",
                    color: "white",
                    padding: "10px 15px",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                >
                  Reset Password
                </button>
                {message && (
                  <p
                    style={{
                      marginTop: "15px",
                      color: message.includes("not match") ? "red" : "green",
                    }}
                  >
                    {message}
                  </p>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;