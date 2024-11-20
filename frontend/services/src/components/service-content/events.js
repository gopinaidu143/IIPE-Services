import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';

export default function Event() {
  const [formData, setFormData] = useState({
    eventName: '',
    eventOrganizerName: '',
    eventId: '',
    eventType: '',
    fromDate: '',
    toDate: '',
    organizedBy: '',
    subject: '',
    file: null,
  });
  const [errors, setErrors] = useState({});
  const { email, authTokens } = useContext(AuthContext);
  const [organizedByOptions, setOrganizedByOptions] = useState(['admindept', 'examsection']); // Example options
  const [eventTypes, setEventTypes] = useState(['Conference', 'Workshop', 'Seminar']); // Example event types

  useEffect(() => {
    // Fetch organized by options from the API or set them manually
    const fetchOrganizedByOptions = async () => {
      try {
        const response = await axios.get('/api/organized-by-options', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authTokens}`,
          },
          withCredentials: true,
        });
        setOrganizedByOptions(response.data);
      } catch (error) {
        console.error('Error fetching organized by options:', error);
      }
    };
    fetchOrganizedByOptions();
  }, [authTokens]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.eventName) newErrors.eventName = 'Event name is required';
    if (!formData.eventOrganizerName) newErrors.eventOrganizerName = 'Event organizer name is required';
    if (!formData.eventId) newErrors.eventId = 'Event ID is required';
    if (!formData.eventType) newErrors.eventType = 'Event type is required';
    if (!formData.fromDate) newErrors.fromDate = 'From date is required';
    if (!formData.toDate) newErrors.toDate = 'To date is required';
    if (!formData.organizedBy) newErrors.organizedBy = 'Organized by is required';
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.file) newErrors.file = 'File is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e, action) => {
    e.preventDefault();

    if (validate()) {
      const formDataToSubmit = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSubmit.append(key, formData[key]);
      });

      try {
        const response = await axios.post("/api/event-data/", formDataToSubmit, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          alert(`${action} successful`);
          setFormData({
            eventName: '',
            eventOrganizerName: '',
            eventId: '',
            eventType: '',
            fromDate: '',
            toDate: '',
            organizedBy: '',
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
          <h2 style={styles.headerText}>EVENT FORM</h2>
        </div>
        <div style={styles.form}>
          <form onSubmit={(e) => handleSubmit(e, 'Submit')}>
            <div style={styles.gridContainer}>
              <div style={styles.inputGroup}>
                <label htmlFor="eventName" style={styles.label}>Event Name:</label>
                <input
                  id="eventName"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.eventName && <span style={styles.error}>{errors.eventName}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="eventOrganizerName" style={styles.label}>Event Organizer Name:</label>
                <input
                  id="eventOrganizerName"
                  name="eventOrganizerName"
                  value={formData.eventOrganizerName}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.eventOrganizerName && <span style={styles.error}>{errors.eventOrganizerName}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="eventId" style={styles.label}>Event ID:</label>
                <input
                  id="eventId"
                  name="eventId"
                  value={formData.eventId}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.eventId && <span style={styles.error}>{errors.eventId}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="eventType" style={styles.label}>Event Type:</label>
                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="">Select Event Type</option>
                  {eventTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
                {errors.eventType && <span style={styles.error}>{errors.eventType}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="fromDate" style={styles.label}>From Date:</label>
                <input
                  id="fromDate"
                  type="date"
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.fromDate && <span style={styles.error}>{errors.fromDate}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="toDate" style={styles.label}>To Date:</label>
                <input
                  id="toDate"
                  type="date"
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.toDate && <span style={styles.error}>{errors.toDate}</span>}
              </div>

              <div style={styles.inputGroup}>
                <label htmlFor="organizedBy" style={styles.label}>Organized By:</label>
                <select
                  id="organizedBy"
                  name="organizedBy"
                  value={formData.organizedBy}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="">Select Organized By</option>
                  {organizedByOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
                {errors.organizedBy && <span style={styles.error}>{errors.organizedBy}</span>}
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