import React, { useState } from 'react';

export default function MemoForm() {
  const [formData, setFormData] = useState({
    memoId: '',
    memoType: '',
    issuedBy: '',
    dateOfIssue: '',
    subject: '',
    file: null,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      file: e.target.files[0],
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.memoId) newErrors.memoId = 'Memo ID is required';
    if (!formData.memoType) newErrors.memoType = 'Memo type is required';
    if (!formData.issuedBy) newErrors.issuedBy = 'Issued by is required';
    if (!formData.dateOfIssue) newErrors.dateOfIssue = 'Date of issue is required';
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.file) newErrors.file = 'File is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted:', formData);
      // Here you would typically send the data to your backend
    } else {
      console.log('Form has errors');
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
      margin: '0 1rem',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <h2 style={styles.headerText}>MEMO FORM</h2>
        </div>
        <div style={styles.form}>
          <form onSubmit={handleSubmit}>
            <div style={styles.gridContainer}>
              <div style={styles.inputGroup}>
                <label htmlFor="memoId" style={styles.label}>Memo ID:</label>
                <input
                  id="memoId"
                  name="memoId"
                  value={formData.memoId}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.memoId && <span style={styles.error}>{errors.memoId}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="memoType" style={styles.label}>Memo Type:</label>
                <select
                  id="memoType"
                  name="memoType"
                  value={formData.memoType}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="">Select Memo Type</option>
                  <option value="establishment">Establishment Section</option>
                  <option value="ltc">LTC</option>
                  <option value="medical">Medical</option>
                </select>
                {errors.memoType && <span style={styles.error}>{errors.memoType}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="issuedBy" style={styles.label}>Issued By:</label>
                <select
                  id="issuedBy"
                  name="issuedBy"
                  value={formData.issuedBy}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="">Select Issued By</option>
                  <option value="dept">Department</option>
                  <option value="ministry">Ministry</option>
                </select>
                {errors.issuedBy && <span style={styles.error}>{errors.issuedBy}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="dateOfIssue" style={styles.label}>Date of Issue:</label>
                <input
                  id="dateOfIssue"
                  type="date"
                  name="dateOfIssue"
                  value={formData.dateOfIssue}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.dateOfIssue && <span style={styles.error}>{errors.dateOfIssue}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="subject" style={styles.label}>Subject:</label>
                <input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.subject && <span style={styles.error}>{errors.subject}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="file" style={styles.label}>Upload File:</label>
                <input
                  id="file"
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  style={styles.input}
                />
                {errors.file && <span style={styles.error}>{errors.file}</span>}
              </div>
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