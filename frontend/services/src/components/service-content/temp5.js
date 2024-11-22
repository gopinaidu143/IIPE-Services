import React, { useState, useEffect } from "react";
import axios from "axios";

const SoftwareRequisitionForm = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    program: "",
    roll_no: "",
    department: "",
    email: "",
    contact_no: "",
    hostler_dayscholar: "",
    purpose: "",
    required_software: "",
    remote_access: "",
    choosen_os: "",
    from_date: "",
    to_date: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
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
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let formErrors = {};
    
    if (!formData.name.trim()) formErrors.name = "Name is required";
    if (!formData.program) formErrors.program = "Program is required";
    if (!formData.roll_no.trim()) formErrors.roll_no = "Roll Number is required";
    if (!formData.department) formErrors.department = "Department is required";
    
    if (!formData.email.trim()) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email is invalid";
    }
    
    if (!formData.contact_no.trim()) {
      formErrors.contact_no = "Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contact_no)) {
      formErrors.contact_no = "Contact number should be 10 digits";
    }
    
    if (!formData.hostler_dayscholar) formErrors.hostler_dayscholar = "Please select Hostler or Dayscholar";
    if (!formData.purpose.trim()) formErrors.purpose = "Purpose is required";
    if (!formData.required_software.trim()) formErrors.required_software = "Required software is required";
    if (!formData.remote_access.trim()) formErrors.remote_access = "Remote Access is required";
    if (!formData.choosen_os) formErrors.choosen_os = "Chosen OS is required";
    if (!formData.from_date) formErrors.from_date = "From Date is required";
    if (!formData.to_date) formErrors.to_date = "To Date is required";
    if (!formData.termsAccepted) formErrors.termsAccepted = "You must accept the terms and conditions";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .post("/api/software-requisition/", formData)
        .then((response) => {
          setMessage("Software requisition submitted successfully!");
          setFormData({
            name: "",
            program: "",
            roll_no: "",
            department: "",
            email: "",
            contact_no: "",
            hostler_dayscholar: "",
            purpose: "",
            required_software: "",
            remote_access: "",
            choosen_os: "",
            from_date: "",
            to_date: "",
            termsAccepted: false,
          });
        })
        .catch((error) => {
          setMessage("Failed to submit software requisition.");
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
    textarea: {
      display: 'block',
      width: '100%',
      padding: '0.5rem',
      fontSize: '1rem',
      borderRadius: '0.375rem',
      border: '1px solid #d1d5db',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      minHeight: '100px',
      resize: 'vertical',
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
    error: {
      color: 'red',
      fontSize: '0.875rem',
      marginTop: '0.25rem',
    },
    termsContainer: {
      marginTop: '1rem',
      padding: '0.5rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      backgroundColor: '#f9fafb',
    },
    checkbox: {
      marginRight: '0.5rem',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <h2 style={styles.headerText}>SOFTWARE REQUISITION FORM</h2>
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
                <select
                  id="program"
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="">Select a program</option>
                  <option value="B.Tech.">B.Tech.</option>
                  <option value="M.Tech.">M.Tech.</option>
                  <option value="Ph.D.">Ph.D.</option>
                  <option value="M.Sc.">M.Sc.</option>
                </select>
                {errors.program && <span style={styles.error}>{errors.program}</span>}
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="roll_no" style={styles.label}>Roll Number:</label>
                <input
                  type="text"
                  id="roll_no"
                  name="roll_no"
                  value={formData.roll_no}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.roll_no && <span style={styles.error}>{errors.roll_no}</span>}
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
                <label htmlFor="email" style={styles.label}>Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.email && <span style={styles.error}>{errors.email}</span>}
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
              <div style={styles.inputGroup}>
                <label htmlFor="choosen_os" style={styles.label}>Chosen OS:</label>
                <select
                  id="choosen_os"
                  name="choosen_os"
                  value={formData.choosen_os}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="">Select an OS</option>
                  <option value="Windows">Windows</option>
                  <option value="Ubuntu">Ubuntu</option>
                  <option value="Mac">Mac</option>
                </select>
                {errors.choosen_os && <span style={styles.error}>{errors.choosen_os}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="required_software" style={styles.label}>Required Software:</label>
                <textarea
                  id="required_software"
                  name="required_software"
                  value={formData.required_software}
                  onChange={handleChange}
                  style={styles.textarea}
                ></textarea>
                {errors.required_software && <span style={styles.error}>{errors.required_software}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="purpose" style={styles.label}>Purpose:</label>
                <textarea
                  id="purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  style={styles.textarea}
                ></textarea>
                {errors.purpose && <span style={styles.error}>{errors.purpose}</span>}
              </div>
              
              
              
              <div style={styles.inputGroup}>
                <label htmlFor="from_date" style={styles.label}>From Date:</label>
                <input
                  type="date"
                  id="from_date"
                  name="from_date"
                  value={formData.from_date}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.from_date && <span style={styles.error}>{errors.from_date}</span>}
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="to_date" style={styles.label}>To Date:</label>
                <input
                  type="date"
                  id="to_date"
                  name="to_date"
                  value={formData.to_date}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.to_date && <span style={styles.error}>{errors.to_date}</span>}
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="remote_access" style={styles.label}>Remote Access:</label>
                <input
                  type="text"
                  id="remote_access"
                  name="remote_access"
                  value={formData.remote_access}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.remote_access && <span style={styles.error}>{errors.remote_access}</span>}
              </div>
            </div>
            <div style={styles.termsContainer}>
              <label style={styles.label}>
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  style={styles.checkbox}
                />
                I undertake to abide by all rules and regulations (IT Policy) of IIPE and return the license to the institute at the end of the above stated duration.
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
};

export default SoftwareRequisitionForm;