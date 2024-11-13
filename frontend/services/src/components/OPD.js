import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

export default function OPD() {
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeCode: '',
    contactNumber: '',
    DependentName: '',
    relationshipWithEmployee: '',
    DependentId: '',
    DependentAge: '',
    DependentGender: '',
    visitFromDate: '',
    visitToDate: '',
    chosenHospital: '',
    todayDate: new Date().toISOString().split('T')[0],
    DateOfBirth: '',
    PhotoProof: '',
  });
  const [errors, setErrors] = useState({});
  const [employeeData, setEmployeeData] = useState({});
  const [dependents, setDependents] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const { email, authTokens } = useContext(AuthContext);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`/api/employee-data/${email}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authTokens}`,
          },
          withCredentials: true,
        });
        setEmployeeData(response.data);
        setFormData(prevData => ({
          ...prevData,
          employeeName: response.data.employee.username,
          employeeCode: response.data.employee.user_id,
          contactNumber: response.data.employee.contact_no,
        }));
        setDependents(response.data.dependents || []);
        setHospitals(response.data.hospitals || []);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };
    fetchEmployeeData();
  }, [email, authTokens]);

  const mapGender = (genderCode) => {
    switch (genderCode) {
      case 'M':
        return 'Male';
      case 'F':
        return 'Female';
      case 'O':
        return 'Others';
      default:
        return 'Not Specified';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === 'DependentName') {
      const selectedDependent = dependents.find(dep => dep.dependent_name === value);
      if (selectedDependent) {
        setFormData(prevData => ({
          ...prevData,
          DependentId: selectedDependent.dependent_id,
          relationshipWithEmployee: selectedDependent.relation,
          DateOfBirth: selectedDependent.dob,
          DependentGender: mapGender(selectedDependent.gender),
          PhotoProof: selectedDependent.id_proof_base64,
        }));
        const dob = new Date(selectedDependent.dob);
        const age = new Date().getFullYear() - dob.getFullYear();
        const monthDiff = new Date().getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && new Date().getDate() < dob.getDate())) {
          age--;
        }
        setFormData(prevData => ({
          ...prevData,
          DependentAge: age,
        }));
      }
    }

    if (name === 'chosenHospital') {
      const selectedHospital = hospitals.find(hosp => hosp.hospital_name === value);
      if (selectedHospital) {
        setFormData(prevData => ({
          ...prevData,
          chosenHospital: selectedHospital.hospital_name,
        }));
      }
    }

    if (name === 'DateOfBirth') {
      const dob = new Date(value);
      const age = new Date().getFullYear() - dob.getFullYear();
      const monthDiff = new Date().getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && new Date().getDate() < dob.getDate())) {
        age--;
      }
      setFormData(prevData => ({
        ...prevData,
        DateOfBirth: value,
        DependentAge: age,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.employeeName) newErrors.employeeName = 'Employee name is required';
    if (!formData.employeeCode) newErrors.employeeCode = 'Employee code is required';
    if (!formData.contactNumber) newErrors.contactNumber = 'Contact number is required';
    if (!formData.DependentName) newErrors.DependentName = 'Dependent name is required';
    if (!formData.DependentId) newErrors.DependentId = 'Aadhar number is required';
    if (!formData.DependentAge) newErrors.DependentAge = 'Dependent age is required';
    if (!formData.visitFromDate) newErrors.visitFromDate = 'Visit from date is required';
    if (!formData.visitToDate) newErrors.visitToDate = 'Visit to date is required';
    if (!formData.chosenHospital) newErrors.chosenHospital = 'Please choose a hospital';

    if (formData.contactNumber && !/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Contact number must be 10 digits';
    }

    // if (formData.DependentId && !/^\d{12}$/.test(formData.DependentId)) {
    //   newErrors.DependentId = 'Aadhar number must be 12 digits';
    // }

    if (formData.DependentAge && (isNaN(formData.DependentAge) || formData.DependentAge <= 0)) {
      newErrors.DependentAge = 'Age must be a positive number';
    }

    if (formData.visitFromDate && formData.visitToDate && formData.visitFromDate > formData.visitToDate) {
      newErrors.visitToDate = 'To date must be after from date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      const { PhotoProof, ...formDataWithoutPhoto } = formData; // Exclude PhotoProof
      console.log(formDataWithoutPhoto); // Log the form data without the photo
      
      const response = axios.post("/api/submit-opd/", {formDataWithoutPhoto}, {
        withCredentials: true,
    });
    if(response.status == 200 ){
      alert('Form submitted successfully');
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
    },
    photoContainer: {
      width: '12rem',
      height: '12rem',
      margin: '0 auto',
      position: 'relative',
    },
    photo: {
      borderRadius: '0.375rem',
      objectFit: 'cover',
      width: '100%',
      height: '100%',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <h2 style={styles.headerText}>OPD REFERRAL FORM</h2>
        </div>
        <div style={styles.form}>
          <form onSubmit={handleSubmit}>
            <div style={styles.gridContainer}>
              <div style={styles.inputGroup}>
                <label htmlFor="todayDate" style={styles.label}>Today's Date:</label>
                <input
                  id="todayDate"
                  type="date"
                  name="todayDate"
                  value={formData.todayDate}
                  readOnly
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="employeeName" style={styles.label}>Name of Employee/Faculty:</label>
                <input
                  id="employeeName"
                  name="employeeName"
                  value={formData.employeeName}
                  readOnly
                  style={styles.input}
                />
                {errors.employeeName && <span style={styles.error}>{errors.employeeName}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="employeeCode" style={styles.label}>Employee/Faculty Code:</label>
                <input
                  id="employeeCode"
                  name="employeeCode"
                  value={formData.employeeCode}
                  readOnly
                  style={styles.input}
                />
                {errors.employeeCode && <span style={styles.error}>{errors.employeeCode}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="contactNumber" style={styles.label}>Contact No of the Employee:</label>
                <input
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  readOnly
                  style={styles.input}
                />
                {errors.contactNumber && <span style={styles.error}>{errors.contactNumber}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="DependentName" style={styles.label}>Name of the Dependent:</label>
                <select
                  id="DependentName"
                  name="DependentName"
                  value={formData.DependentName}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="">Select Dependent</option>
                  {dependents.map((dep) => (
                    <option key={dep.dependent_id} value={dep.dependent_name}>{dep.dependent_name}</option>
                  ))}
                </select>
                {errors.DependentName && <span style={styles.error}>{errors.DependentName}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="DependentId" style={styles.label}>Dependent's ID:</label>
                <input
                  id="DependentId"
                  name="DependentId"
                  value={formData.DependentId}
                  readOnly
                  style={styles.input}
                />
                {errors.DependentId && <span style={styles.error}>{errors.DependentId}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="relationshipWithEmployee" style={styles.label}>Relationship with Employee:</label>
                <input
                  id="relationshipWithEmployee"
                  name=" relationshipWithEmployee"
                  value={formData.relationshipWithEmployee}
                  readOnly
                  style={styles.input}
                />
                {errors.relationshipWithEmployee && <span style={styles.error}>{errors.relationshipWithEmployee}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="DateOfBirth" style={styles.label}>Date Of Birth:</label>
                <input
                  id="DateOfBirth"
                  type="date"
                  name="DateOfBirth"
                  value={formData.DateOfBirth}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.DateOfBirth && <span style={styles.error}>{errors.DateOfBirth}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="DependentAge" style={styles.label}>Age of Dependent:</label>
                <input
                  id="DependentAge"
                  name="DependentAge"
                  value={formData.DependentAge}
                  readOnly
                  style={styles.input}
                />
                {errors.DependentAge && <span style={styles.error}>{errors.DependentAge}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="DependentGender" style={styles.label}>Gender of Dependent:</label>
                <input
                  id="DependentGender"
                  name="DependentGender"
                  value={formData.DependentGender}
                  readOnly
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="visitFromDate" style={styles.label}>Visit From Date:</label>
                <input
                  id="visitFromDate"
                  type="date"
                  name="visitFromDate"
                  value={formData.visitFromDate}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.visitFromDate && <span style={styles.error}>{errors.visitFromDate}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="visitToDate" style={styles.label}>Visit To Date:</label>
                <input
                  id="visitToDate"
                  type="date"
                  name="visitToDate"
                  value={formData.visitToDate}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.visitToDate && <span style={styles.error}>{errors.visitToDate}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="chosenHospital" style={styles.label}>Choose Hospital/Diagnostic center:</label>
                <select
                  id="chosenHospital"
                  name="chosenHospital"
                  value={formData.chosenHospital}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="">Select Hospital</option>
                  {hospitals.map((hosp) => (
                    <option key={hosp.hospital_name} value={hosp.hospital_name}>{hosp.hospital_name}</option>
                  ))}
                </select>
                {errors.chosenHospital && <span style={styles.error}>{errors.chosenHospital}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="PhotoProof" style={styles.label}>Dependent's Photo:</label>
                <div>
                  {formData.PhotoProof ? (
                    <img
                      id="PhotoProofPreview"
                      src={`data:image/jpeg;base64,${formData.PhotoProof}`}
                      alt="Photo Proof Preview"
                      style={{ width: "25%", height: "auto" }}
                    />
                  ) : (
                    <p>No image to display</p>
                  )}
                </div>
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