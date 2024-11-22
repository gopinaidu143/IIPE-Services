import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EmailRequisitionForm() {
  const [errors, setErrors] = useState({});
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    program: "",
    department: "",
    person_email: "",
    contact_no: "",
    emergency_contact: "",
    hostler_dayscholar: "",
    termsAccepted: false,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("/api/departments/")
      .then((response) => {
        setDepartments(response.data.departments);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    // Clear the error when the user starts typing
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    let formErrors = {};
    
    if (!formData.name.trim()) {
      formErrors.name = "Name is required";
    }

    if (!formData.program.trim()) {
      formErrors.program = "Program is required";
    }

    if (!formData.department) {
      formErrors.department = "Department is required";
    }

    if (!formData.person_email.trim()) {
      formErrors.person_email = "Personal email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.person_email)) {
      formErrors.person_email = "Email is invalid";
    }

    if (!formData.contact_no.trim()) {
      formErrors.contact_no = "Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contact_no)) {
      formErrors.contact_no = "Contact number should be 10 digits";
    }

    if (!formData.emergency_contact.trim()) {
      formErrors.emergency_contact = "Emergency contact is required";
    } else if (!/^\d{10}$/.test(formData.emergency_contact)) {
      formErrors.emergency_contact = "Emergency contact should be 10 digits";
    }

    if (!formData.hostler_dayscholar) {
      formErrors.hostler_dayscholar = "Please select Hostler or Dayscholar";
    }

    if (!formData.termsAccepted) {
      formErrors.termsAccepted = "You must accept the terms and conditions";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .post("/api/email-requisition/", formData)
        .then((response) => {
          setMessage("Email requisition submitted successfully!");
          setFormData({
            name: "",
            program: "",
            department: "",
            person_email: "",
            contact_no: "",
            emergency_contact: "",
            hostler_dayscholar: "",
            termsAccepted: false,
          });
        })
        .catch((error) => {
          setMessage("Failed to submit email requisition.");
          console.error("Error submitting form:", error);
        });
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
      width: '100%',
      padding: '0.5rem',
      fontSize: '1rem',
      borderRadius: '0.375rem',
      border: '1px solid #d1d5db',
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
    message: {
      textAlign: 'center',
      marginBottom: '1rem',
      padding: '0.5rem',
      borderRadius: '0.375rem',
      backgroundColor: '#e0f2f1',
      color: '#00695c',
    },
    termsContainer: {
      marginTop: '1rem',
      padding: '0.5rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      backgroundColor: '#f9fafb',
    },
    error: {
      color: 'red',
      fontSize: '0.875rem',
      marginTop: '0.25rem',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <h2 style={styles.headerText}>EMAIL REQUISITION FORM</h2>
        </div>
        <div style={styles.form}>
          {message && <div style={styles.message}>{message}</div>}
          <form onSubmit={handleSubmit}>
            <div style={styles.gridContainer}>
              <div style={styles.inputGroup}>
                <label htmlFor="name" style={styles.label}>Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.name && <span style={styles.error}>{errors.name}</span>}
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="program" style={styles.label}>Program:</label>
                <input
                  type="text"
                  id="program"
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.program && <span style={styles.error}>{errors.program}</span>}
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="department" style={styles.label}>Department:</label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="">Select a department</option>
                  {departments.map((dept, index) => (
                    <option key={index} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                {errors.department && <span style={styles.error}>{errors.department}</span>}
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="person_email" style={styles.label}>Personal Email:</label>
                <input
                  type="email"
                  id="person_email"
                  name="person_email"
                  value={formData.person_email}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.person_email && <span style={styles.error}>{errors.person_email}</span>}
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="contact_no" style={styles.label}>Contact Number:</label>
                <input
                  type="text"
                  id="contact_no"
                  name="contact_no"
                  value={formData.contact_no}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.contact_no && <span style={styles.error}>{errors.contact_no}</span>}
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="emergency_contact" style={styles.label}>Emergency Contact:</label>
                <input
                  type="text"
                  id="emergency_contact"
                  name="emergency_contact"
                  value={formData.emergency_contact}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.emergency_contact && <span style={styles.error}>{errors.emergency_contact}</span>}
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="hostler_dayscholar" style={styles.label}>Hostler/Dayscholar:</label>
                <select
                  id="hostler_dayscholar"
                  name="hostler_dayscholar"
                  value={formData.hostler_dayscholar}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="">Select an option</option>
                  <option value="Hostler">Hostler</option>
                  <option value="Dayscholar">Dayscholar</option>
                </select>
                {errors.hostler_dayscholar && <span style={styles.error}>{errors.hostler_dayscholar}</span>}
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
              <button type="submit" style={styles.button}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}