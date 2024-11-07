// opd form 
import React, { useState } from 'react';
import Navbar from './navbar1';

function OPDReferralForm() {
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeCode: '',
    contactNumber: '',
    patientName: '',
    relationshipWithEmployee: '',
    patientAadhar: '',
    patientAge: '',
    patientGender: '',
    visitStartDate: '',
    visitEndDate: '',
    chosenHospital: '',
    todayDate: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    // Required fields
    if (!formData.employeeName) newErrors.employeeName = 'Employee name is required';
    if (!formData.employeeCode) newErrors.employeeCode = 'Employee code is required';
    if (!formData.contactNumber) newErrors.contactNumber = 'Contact number is required';
    if (!formData.patientName) newErrors.patientName = 'Patient name is required';
    if (!formData.patientAadhar) newErrors.patientAadhar = 'Aadhar number is required';
    if (!formData.patientAge) newErrors.patientAge = 'Patient age is required';
    if (!formData.visitStartDate) newErrors.visitStartDate = 'Visit start date is required';
    if (!formData.visitEndDate) newErrors.visitEndDate = 'Visit end date is required';
    if (!formData.chosenHospital) newErrors.chosenHospital = 'Please choose a hospital';

    // Contact number validation
    if (formData.contactNumber && !/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Contact number must be 10 digits';
    }

    // Aadhar validation
    if (formData.patientAadhar && !/^\d{12}$/.test(formData.patientAadhar)) {
      newErrors.patientAadhar = 'Aadhar number must be 12 digits';
    }

    // Age validation
    if (formData.patientAge && (isNaN(formData.patientAge) || formData.patientAge <= 0)) {
      newErrors.patientAge = 'Age must be a positive number';
    }

    // Date validation: Start date should not be after end date
    if (formData.visitStartDate && formData.visitEndDate && formData.visitStartDate > formData.visitEndDate) {
      newErrors.visitEndDate = 'End date must be after start date';
    }

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
    <div style={styles.body}>
    <Navbar/>
    
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Outpatient Referral Form</h2>

        <div style={styles.formGrid}>
          {/* Today's Date Field */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Today's Date:</label>
            <input
              type="date"
              name="todayDate"
              value={formData.todayDate}
              style={styles.input}
              readOnly
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Name of Employee/Student:</label>
            <input
              type="text"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.employeeName && <span style={styles.error}>{errors.employeeName}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Employee/Student Code:</label>
            <input
              type="text"
              name="employeeCode"
              value={formData.employeeCode}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.employeeCode && <span style={styles.error}>{errors.employeeCode}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Contact No of the Employee/Student:</label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.contactNumber && <span style={styles.error}>{errors.contactNumber}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Name of the Patient:</label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.patientName && <span style={styles.error}>{errors.patientName}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Patient’s Aadhar No:</label>
            <input
              type="tel"
              name="patientAadhar"
              value={formData.patientAadhar}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.patientAadhar && <span style={styles.error}>{errors.patientAadhar}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Age:</label>
            <input
              type="tel"
              name="patientAge"
              value={formData.patientAge}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.patientAge && <span style={styles.error}>{errors.patientAge}</span>}
          </div>
             <div style={styles.formGroup}>
             <SelectField 
              label="Gender" 
              name="patientGender" 
              value={formData.patientGender} 
              onChange={handleChange} 
              options={['Male', 'Female', 'Other']} 
            />   
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Tentative Visit Start Date:</label>
            <input
              type="date"
              name="visitStartDate"
              value={formData.visitStartDate}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.visitStartDate && <span style={styles.error}>{errors.visitStartDate}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Tentative Visit End Date:</label>
            <input
              type="date"
              name="visitEndDate"
              value={formData.visitEndDate}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.visitEndDate && <span style={styles.error}>{errors.visitEndDate}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>I voluntarily choose:</label>
            <input
              type="text"
              name="chosenHospital"
              value={formData.chosenHospital}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.chosenHospital && <span style={styles.error}>{errors.chosenHospital}</span>}
            <span style={styles.text}> Hospital for OPD treatment.</span>
          </div>
        </div>

        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
}
const SelectField = ({ label, name, value, onChange, options }) => (
  <div>
    <label style={styles.label}>{label}:</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required
      style={styles.input}
    >
      <option value="">Select</option>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);
const styles = {
  body: {
    backgroundColor: '#f4f4f9',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  form: {
    marginTop: '120px',
    maxWidth: '1000px',
    width: '100%',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif'
  },
  heading: {
    textAlign: 'center',
    color: '#333'
  },
  formGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
  },
  formGroup: {
    flex: '1 1 calc(50% - 15px)',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#555'
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  text: {
    marginTop: '5px',
    fontSize: '14px',
    color: '#555'
  },
  button: {
    width: '15%',
    padding: '10px',
    marginTop: '20px',
    marginLeft: '400px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#ff9833',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default OPDReferralForm;
