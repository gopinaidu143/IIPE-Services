import React, { useState } from "react";
import axios from "axios";

export default function MemoForm() {
  const [formData, setFormData] = useState({
    reference_id: "",
    memo_type: "",
    issued_by: "",
    issued_date: "",
    subject: "",
    is_published: false,
    view_pdf: null,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const memoTypes = ["Establishment", "LTC", "Medical"];
  const issuedByOptions = ["Ministry", "Department"];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));

    // Clear the error when the user starts typing
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    let formErrors = {};
    
    if (!formData.reference_id.trim()) formErrors.reference_id = "Reference ID is required";
    if (!formData.memo_type) formErrors.memo_type = "Memo Type is required";
    if (!formData.issued_by) formErrors.issued_by = "Issued By is required";
    if (!formData.issued_date) formErrors.issued_date = "Issued Date is required";
    if (!formData.subject.trim()) formErrors.subject = "Subject is required";
    if (!formData.view_pdf) formErrors.view_pdf = "PDF file is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      try {
        const response = await axios.post("/api/memos/add/", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Memo created successfully:", response.data);
        setMessage("Memo created successfully!");
        // Reset the form
        setFormData({
          reference_id: "",
          memo_type: "",
          issued_by: "",
          issued_date: "",
          subject: "",
          is_published: false,
          view_pdf: null,
        });
        // Clear any existing errors
        setErrors({});
      } catch (error) {
        console.error("Error creating memo:", error.response.data);
        setMessage("Error creating memo. Please try again.");
      }
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
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '0.875rem',
      color: '#374151',
    },
    checkbox: {
      marginRight: '0.5rem',
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
    error: {
      color: 'red',
      fontSize: '0.875rem',
      marginTop: '0.25rem',
    },
    message: {
      textAlign: 'center',
      marginBottom: '1rem',
      padding: '0.5rem',
      borderRadius: '0.375rem',
      backgroundColor: '#e0f2f1',
      color: '#00695c',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <h2 style={styles.headerText}>MEMO FORM</h2>
        </div>
        <div style={styles.form}>
          {message && <div style={styles.message}>{message}</div>}
          <form onSubmit={handleSubmit}>
            <div style={styles.gridContainer}>
              <div style={styles.inputGroup}>
                <label htmlFor="reference_id" style={styles.label}>Reference ID:</label>
                <input
                  type="text"
                  id="reference_id"
                  name="reference_id"
                  value={formData.reference_id}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.reference_id && <span style={styles.error}>{errors.reference_id}</span>}
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="memo_type" style={styles.label}>Memo Type:</label>
                <select
                  id="memo_type"
                  name="memo_type"
                  value={formData.memo_type}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="">Select Memo Type</option>
                  {memoTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.memo_type && <span style={styles.error}>{errors.memo_type}</span>}
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="issued_by" style={styles.label}>Issued By:</label>
                <select
                  id="issued_by"
                  name="issued_by"
                  value={formData.issued_by}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="">Select Issuer</option>
                  {issuedByOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.issued_by && <span style={styles.error}>{errors.issued_by}</span>}
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="issued_date" style={styles.label}>Issued Date:</label>
                <input
                  type="date"
                  id="issued_date"
                  name="issued_date"
                  value={formData.issued_date}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.issued_date && <span style={styles.error}>{errors.issued_date}</span>}
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="subject" style={styles.label}>Subject:</label>
                <textarea
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  style={styles.textarea}
                ></textarea>
                {errors.subject && <span style={styles.error}>{errors.subject}</span>}
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="view_pdf" style={styles.label}>Upload PDF:</label>
                <input
                  type="file"
                  id="view_pdf"
                  name="view_pdf"
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.view_pdf && <span style={styles.error}>{errors.view_pdf}</span>}
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="is_published"
                    checked={formData.is_published}
                    onChange={handleChange}
                    style={styles.checkbox}
                  />
                  Is Published
                </label>
              </div>
            </div>
            <div style={styles.buttonContainer}>
              <button type="submit" style={styles.button}>Create Memo</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}