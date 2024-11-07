import React, { useState } from 'react';
// import Navbar from '../navbar'; // Ensure the path to Navbar is correct

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div>
      {/* <Navbar /> Added Navbar component */}
      <div style={styles.container}>
        <div style={styles.card}> {/* Added card style */}
          <h2 style={styles.title}>Admin Login</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              style={styles.input}
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={styles.input}
              required
            />
            <button type="submit" style={styles.button}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Full height for centering
    backgroundColor: '#f4f4f4', // Background color for contrast
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '9px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '30px', // Increased padding for the card
    width: '350px', // Fixed width for the card
    textAlign: 'center', // Center text within the card
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px', // Increase font size for the title
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: '15px', // Adjusted margin for spacing between fields
    padding: '10px',
    width: '100%', // Full width of the card
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box', // Include padding in width calculation
    fontSize: '16px', // Increase font size for better readability
  },
  button: {
    padding: '12px', // Increased padding for button
    backgroundColor: '#ff9833', // Your theme color
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px', // Increased font size for better readability
  },
  registerText: {
    marginTop: '15px',
  },
  registerLink: {
    color: '#007bff', // Link color
    textDecoration: 'none',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};

export default Admin;
