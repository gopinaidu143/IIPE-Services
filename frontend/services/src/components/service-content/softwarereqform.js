import React, { useState, useEffect } from 'react';

function SoftwareRequisitionForm() {
  const [formData, setFormData] = useState({
    date: '',
    name: '',
    programme: '',
    rollNumber: '',
    branch: '',
    email: '',
    mobileNumber: '',
    hostler: '',
    software: '',
    purpose: '',
    networkClient: '',
    operatingSystem: '',
    networkClientDurationFrom: '',
    networkClientDurationTo: '',
    termsAccepted: false, // Added for terms acceptance
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Automatically set today's date when the component loads
    const today = new Date().toISOString().split('T')[0];
    setFormData((prevData) => ({
      ...prevData,
      date: today,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.programme) newErrors.programme = 'Programme is required';
    if (!formData.rollNumber) newErrors.rollNumber = 'Roll number is required';
    if (!formData.branch) newErrors.branch = 'Branch is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.mobileNumber) newErrors.mobileNumber = 'Mobile number is required';
    if (!formData.software) newErrors.software = 'Software is required';
    if (!formData.purpose) newErrors.purpose = 'Purpose is required';
    if (!formData.networkClient) newErrors.networkClient = 'Network client is required';
    if (!formData.operatingSystem) newErrors.operatingSystem = 'Operating system is required';
    if (!formData.networkClientDurationFrom) newErrors.networkClientDurationFrom = 'Network client duration from date is required';
    if (!formData.networkClientDurationTo) newErrors.networkClientDurationTo = 'Network client duration to date is required';
    if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(formData);
      alert('Form submitted successfully');
    } else {
      alert('Please fix the errors in the form');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <h2 style={styles.headerText}>Software Requisition Form</h2>
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.gridContainer}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                style={styles.input}
                readOnly
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.name && <span style={styles.error}>{errors.name}</span>}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Programme:</label>
              <input
                type="text"
                name="programme"
                value={formData.programme}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.programme && <span style={styles.error}>{errors.programme}</span>}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Roll Number:</label>
              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.rollNumber && <span style={styles.error}>{errors.rollNumber}</span>}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Branch & Specialization / Project:</label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.branch && <span style={styles.error}>{errors.branch}</span>}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.email && <span style={styles.error}>{errors.email}</span>}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Mobile Number:</label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.mobileNumber && <span style={styles.error}>{errors.mobileNumber}</span>}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Hostler/Day Scholar:</label>
              <input
                type="text"
                name="hostler"
                value={formData.hostler}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Required Software/Service:</label>
              <input
                type="text"
                name="software"
                value={formData.software}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.software && <span style={styles.error}>{errors.software}</span>}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Purpose:</label>
              <input
                type="text"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.purpose && <span style={styles.error}>{errors.purpose}</span>}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Remote Access/Network Client:</label>
              <input
                type="text"
                name="networkClient"
                value={formData.networkClient}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.networkClient && <span style={styles.error}>{errors.networkClient}</span>}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Operating System:</label>
              <select
                name="operatingSystem"
                value={formData.operatingSystem}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">Select OS</option>
                <option value="Windows">Windows</option>
                <option value="Ubuntu">Ubuntu</option>
                <option value="Mac">Mac</option>
              </select>
              {errors.operatingSystem && <span style={styles.error}>{errors.operatingSystem}</span>}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Network Client Duration From:</label>
              <input
                type="date"
                name="networkClientDurationFrom"
                value={formData.networkClientDurationFrom}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.networkClientDurationFrom && <span style={styles.error}>{errors.networkClientDurationFrom}</span>}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Network Client Duration To:</label>
              <input
                type="date"
                name="networkClientDurationTo"
                value={formData.networkClientDurationTo}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.networkClientDurationTo && <span style={styles.error}>{errors.networkClientDurationTo}</span>}
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
            <button type="submit" style={styles.button}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

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
  checkbox: {
    marginRight: '0.5rem',
  },
  termsContainer: {
    marginTop: '1rem',
    padding: '0.5rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
    backgroundColor: '#f9fafb',
  },
};

export default SoftwareRequisitionForm;