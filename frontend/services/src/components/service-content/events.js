import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';

export default function Event() {
  const [formData, setFormData] = useState({
    circularType: '',
    publishId: '',
    date: '',
    issuedBy: '',
    subject: '',
    file: null,
  });
  const [errors, setErrors] = useState({});
  const { email, authTokens } = useContext(AuthContext);
  const [issuedByOptions, setIssuedByOptions] = useState(['admindept','examsection']); // Example options for "Issued By"
  const [circularTypes, setCircularTypes] = useState(['Events']); // Example circular types

  useEffect(() => {
    // Fetch issued by options from the API or set them manually
    const fetchIssuedByOptions = async () => {
      try {
        const response = await axios.get('/api/issued-by-options', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authTokens}`,
          },
          withCredentials: true,
        });
        setIssuedByOptions(response.data);
      } catch (error) {
        console.error('Error fetching issued by options:', error);
      }
    };
    fetchIssuedByOptions();
  }, [authTokens]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Handle file upload
    if (name === 'file') {
      setFormData((prevData) => ({
        ...prevData,
        file: e.target.files[0],
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.circularType) newErrors.circularType = 'Circular type is required';
    if (!formData.publishId) newErrors.publishId = 'Publish ID is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.issuedBy) newErrors.issuedBy = 'Issued by is required';
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.file) newErrors.file = 'File is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e, action) => {
    e.preventDefault();

    if (validate()) {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('circularType', formData.circularType);
      formDataToSubmit.append('publishId', formData.publishId);
      formDataToSubmit.append('date', formData.date);
      formDataToSubmit.append('issuedBy', formData.issuedBy);
      formDataToSubmit.append('subject', formData.subject);
      formDataToSubmit.append('file', formData.file);

      try {
        const response = await axios.post("/api/circular-data/", formDataToSubmit, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          alert(`${action} successful`);
          setFormData({
            circularType: '',
            publishId: '',
            date: '',
            issuedBy: '',
            subject: '',
            file: null,
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
      boxShadow: '0 4px 6px -1px rgba(0, 0 , 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
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
          <h2 style={styles.headerText}>EVENT FORM</h2>
        </div>
        <div style={styles.form}>
          <form onSubmit={(e) => handleSubmit(e, 'Submit')}>
            <div style={styles.gridContainer}>
              <div style={styles.inputGroup}>
                <label htmlFor="circularType" style={styles.label}>Event Name:</label>
                {/* <select
                  id="circularType"
                  name="circularType"
                  value={formData.circularType}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="">Select Circular Type</option>
                  {circularTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
                {errors.circularType && <span style={styles.error}>{errors.circularType}</span>} */}
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
                <label htmlFor="publishId" style={styles.label}>Publish ID:</label>
                <input
                  id="publishId"
                  name="publishId"
                  value={formData.publishId}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.publishId && <span style={styles.error}>{errors.publishId}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="date" style={styles.label}>Date From:</label>
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
                <label htmlFor="date" style={styles.label}>Date To:</label>
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
                <label htmlFor="issuedBy" style={styles.label}>Contucting By:</label>
                <select
                  id="issuedBy"
                  name="issuedBy"
                  value ={formData.issuedBy}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="">Select Issued By</option>
                  {issuedByOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>

                
                {errors.issuedBy && <span style={styles.error}>{errors.issuedBy}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="subject" style={styles.label}>Event type:</label>
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
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.file && <span style={styles.error}>{errors.file}</span>}
              </div>
            </div>

            <div style={styles.buttonContainer}>
              <button type="button" style={styles.button} onClick={(e) => handleSubmit(e, 'Save')}>
                Save
              </button>
              <button type="button" style={styles.button} onClick={(e) => handleSubmit(e, 'Publish')}>
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}