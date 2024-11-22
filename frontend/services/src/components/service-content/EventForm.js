import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EventForm() {
  const [formData, setFormData] = useState({
    event_name: "",
    organizer: "",
    event_id: "",
    event_type: "",
    from_date: "",
    to_date: "",
    organized_department: "",
    subject: "",
    venue: "",
    is_published: false,
    view_pdf: null,
  });

  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("/api/departments/");
        setDepartments(response.data.departments);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

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
    
    if (!formData.event_name.trim()) formErrors.event_name = "Event Name is required";
    if (!formData.organizer.trim()) formErrors.organizer = "Organizer is required";
    if (!formData.event_id.trim()) formErrors.event_id = "Event ID is required";
    if (!formData.event_type.trim()) formErrors.event_type = "Event Type is required";
    if (!formData.from_date) formErrors.from_date = "From Date is required";
    if (!formData.to_date) formErrors.to_date = "To Date is required";
    if (!formData.organized_department) formErrors.organized_department = "Organized Department is required";
    if (!formData.subject.trim()) formErrors.subject = "Subject is required";
    if (!formData.venue.trim()) formErrors.venue = "Venue is required";
    if (!formData.view_pdf) formErrors.view_pdf = "PDF file is required";

    // Check if To Date is after From Date
    if (formData.from_date && formData.to_date && new Date(formData.to_date) < new Date(formData.from_date)) {
      formErrors.to_date = "To Date must be after From Date";
    }

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
        const response = await axios.post("/api/events/add/", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Event created successfully:", response.data);
        setMessage("Event created successfully!");
        // Reset the form
        setFormData({
          event_name: "",
          organizer: "",
          event_id: "",
          event_type: "",
          from_date: "",
          to_date: "",
          organized_department: "",
          subject: "",
          venue: "",
          is_published: false,
          view_pdf: null,
        });
        // Clear any existing errors
        setErrors({});
      } catch (error) {
        console.error("Error creating event:", error.response.data);
        setMessage("Error creating event. Please try again.");
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
          <h2 style={styles.headerText}>EVENT FORM</h2>
        </div>
        <div style={styles.form}>
          {message && <div style={styles.message}>{message}</div>}
          <form onSubmit={handleSubmit}>
            <div style={styles.gridContainer}>
              <div style={styles.inputGroup}>
                <label htmlFor="event_name" style={styles.label}>Event Name:</label>
                <input
                  type="text"
                  id="event_name"
                  name="event_name"
                  value={formData.event_name}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.event_name && <span style={styles.error}>{errors.event_name}</span>}
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="organizer" style={styles.label}>Organizer:</label>
                <input
                  type="text"
                  id="organizer"
                  name="organizer"
                  value={formData.organizer}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.organizer && <span style={styles.error}>{errors.organizer}</span>}
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="event_id" style={styles.label}>Event ID:</label>
                <input
                  type="text"
                  id="event_id"
                  name="event_id"
                  value={formData.event_id}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.event_id && <span style={styles.error}>{errors.event_id}</span>}
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="event_type" style={styles.label}>Event Type:</label>
                <input
                  type="text"
                  id="event_type"
                  name="event_type"
                  value={formData.event_type}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.event_type && <span style={styles.error}>{errors.event_type}</span>}
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
                <label htmlFor="organized_department" style={styles.label}>Organized Department:</label>
                <select
                  id="organized_department"
                  name="organized_department"
                  value={formData.organized_department}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="">Select Department</option>
                  {departments.map((dept, index) => (
                    <option key={index} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                {errors.organized_department && <span style={styles.error}>{errors.organized_department}</span>}
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
                <label htmlFor="venue" style={styles.label}>Venue:</label>
                <input
                  type="text"
                  id="venue"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.venue && <span style={styles.error}>{errors.venue}</span>}
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
            </div>
            <div style={styles.buttonContainer}>
              <button type="submit" style={styles.button}>Create Event</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}