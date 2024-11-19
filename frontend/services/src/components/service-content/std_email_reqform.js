import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';

export default function Emailrequisition() {
  const [formData, setFormData] = useState({
    date: '',
    program: '',
    rollNo: '',
    branch: '',
    personalEmail: '',
    emergencyContactNo: '',
    hostler: false,
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const { email, authTokens } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.program) newErrors.program = 'Program/Course is required';
    if (!formData.rollNo) newErrors.rollNo = 'Roll No is required';
    if (!formData.branch) newErrors.branch = 'Branch is required';
    if (!formData.personalEmail) newErrors.personalEmail = 'Personal Email ID is required';
    if (!formData.emergencyContactNo) newErrors.emergencyContactNo = 'Emergency Contact No is required';
    if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';

    if (formData.emergencyContactNo && !/^\d{10}$/.test(formData.emergencyContactNo)) {
      newErrors.emergencyContactNo = 'Emergency contact number must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validate()) {
      console.log(formData); // You can send this data to the server
      
      try {
        const response = await axios.post("/api/submit-opd/", formData, {
          withCredentials: true,
        });
        
        if (response.status === 200) {
          alert('Form submitted successfully');
          // Reset the form
          setFormData({
            date: '',
            program: '',
            rollNo: '',
            branch: '',
            personalEmail: '',
            emergencyContactNo: '',
            hostler: false,
            termsAccepted: false,
          });
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting the form');
      }
    } else {
      alert('Please fix the errors in the form');
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    formContainer: {
      width: '100%',
      maxWidth: '64rem',
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      overflow: 'hidden',
    },
    header: {
      padding: '1.5rem',
      backgroundColor: 'grey',
      color: 'white',
    },
    headerText: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textAlign: 'center',
      margin: 0,
    },
    form: {
      padding: '2rem',
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '2rem',
    },
    inputGroup: {
      marginBottom: '1rem',
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: 'bold',
      color: '#374151',
      marginBottom: '0.25rem',
    },
    input: {
      display: 'block',
      width: '96%',
      padding: '0.5rem',
      fontSize: '1rem',
      borderRadius: '0.375rem',
      border: '1px solid #d1d 5db',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    },
    select: {
      display: 'block',
      width: '100%',
      padding: '0.5rem',
      fontSize: '1rem',
      borderRadius: '0.375rem',
      border: '1px solid #d1d5db',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      backgroundColor: 'white',
    },
    error: {
      color: '#ef4444',
      fontSize: '0.75rem',
      marginTop: '0.25rem',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '1.5rem',
    },
    button: {
      backgroundColor: '#4CAF50',
      color: '#fff',
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '0.375rem',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    termsContainer: {
      marginTop: '1rem',
      padding: '0.5rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      backgroundColor: '#f9fafb',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <h2 style={styles.headerText}>Email Requisition Form</h2>
        </div>
        <div style={styles.form}>
          <form onSubmit={handleSubmit}>
            <div style={styles.gridContainer}>
              <div style={styles.inputGroup}>
                <label htmlFor="date" style={styles.label}>Date:</label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.date && <span style={styles.error}>{errors.date}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="program" style={styles.label}>Program/Course:</label>
                <input
                  id="program"
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.program && <span style={styles.error}>{errors.program}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="rollNo" style={styles.label}>Roll No:</label>
                <input
                  id="rollNo"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.rollNo && <span style={styles.error}>{errors.rollNo}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="branch" style={styles.label}>Branch:</label>
                <input
                  id="branch"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.branch && <span style={styles.error}>{errors.branch}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="personalEmail" style={styles.label}>Personal Email ID:</label>
                <input
                  id="personalEmail"
                  name="personalEmail"
                  type="email"
                  value={formData.personalEmail}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.personalEmail && <span style={styles.error}>{errors.personalEmail}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="emergencyContactNo" style={styles.label}>Emergency Contact No:</label>
                <input
                  id="emergencyContactNo"
                  name="emergencyContactNo"
                  value={formData.emergencyContactNo}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.emergencyContactNo && <span style={styles.error}>{errors.emergencyContactNo}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="hostler" style={styles.label}>Hostler/Day Scholar:</label>
                <select
                  id="hostler"
                  name="hostler"
                  value={formData.hostler ? 'Hostler' : 'Day Scholar'}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="Hostler">Hostler</option>
                  <option value="Day Scholar">Day Scholar</option>
                </select>
              </div>
            </div>

            <div style={styles.termsContainer}>
              <label style={styles.label}>
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                />
                I understand that all announcements related to the institute, academics and course works will be made through institute emailing facility (individual/group email) and through the institute website (https://www.iipe.ac.in). I undertake to abide by all rules and regulations (IT Policy) of IIPE while using IT assets (Email, Wi-Fi/Network and other computing facilities) at the institute.
              </label>
              {errors.termsAccepted && <span style={styles.error}>{errors.termsAccepted}</span>}
            </div>

            <div style={styles.buttonContainer}>
              <button type="submit" style={styles.button}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}