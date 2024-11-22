// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // const CircularData = () => {
// //   const [formData, setFormData] = useState({
// //     c_type: "",
// //     publish_id: "",
// //     date: "",
// //     issued_by: "", // Stores the selected department
// //     subject: "",
// //     uploaded_by: "",
// //     is_published: false,
// //     access_to: [], // Stores multiple selected roles
// //     view_pdf: null,
// //   });

// //   const [departments, setDepartments] = useState([]); // Stores fetched departments

// //   // Fetch departments on component mount
// //   useEffect(() => {
// //     const fetchDepartments = async () => {
// //       try {
// //         const response = await axios.get("/api/departments/");
// //         setDepartments(response.data.departments);
// //       } catch (error) {
// //         console.error("Error fetching departments:", error);
// //       }
// //     };

// //     fetchDepartments();
// //   }, []);

// //   const handleChange = (e) => {
// //     const { name, value, type, checked, files } = e.target;

// //     if (name === "access_to") {
// //       const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
// //       setFormData((prev) => ({
// //         ...prev,
// //         [name]: selectedOptions,
// //       }));
// //     } else if (type === "file") {
// //       setFormData((prev) => ({
// //         ...prev,
// //         view_pdf: files[0],
// //       }));
// //     } else {
// //       setFormData((prev) => ({
// //         ...prev,
// //         [name]: type === "checkbox" ? checked : value,
// //       }));
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const data = new FormData();
// //     Object.keys(formData).forEach((key) => {
// //       if (key === "access_to") {
// //         formData[key].forEach((item) => data.append(key, item));
// //       } else {
// //         data.append(key, formData[key]);
// //       }
// //     });

// //     try {
// //       const response = await axios.post("/api/circulars/add/", data, {
// //         headers: {
// //           "Content-Type": "multipart/form-data",
// //         },
// //       });
// //       console.log("Response:", response.data);
// //     } catch (error) {
// //       console.error("Error submitting form:", error.response.data);
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <input
// //         type="text"
// //         name="c_type"
// //         placeholder="Circular Type"
// //         value={formData.c_type}
// //         onChange={handleChange}
// //       />
// //       <input
// //         type="text"
// //         name="publish_id"
// //         placeholder="Publish ID"
// //         value={formData.publish_id}
// //         onChange={handleChange}
// //       />
// //       <input
// //         type="date"
// //         name="date"
// //         value={formData.date}
// //         onChange={handleChange}
// //       />
// //       <select
// //         name="issued_by"
// //         value={formData.issued_by}
// //         onChange={handleChange}
// //       >
// //         <option value="">Select Department</option>
// //         {departments.map((dept, index) => (
// //           <option key={index} value={dept}>
// //             {dept}
// //           </option>
// //         ))}
// //       </select>
// //       <textarea
// //         name="subject"
// //         placeholder="Subject"
// //         value={formData.subject}
// //         onChange={handleChange}
// //       />
// //       <input
// //         type="text"
// //         name="uploaded_by"
// //         placeholder="Uploaded By"
// //         value={formData.uploaded_by}
// //         onChange={handleChange}
// //       />
// //       <label>
// //         Is Published:
// //         <input
// //           type="checkbox"
// //           name="is_published"
// //           checked={formData.is_published}
// //           onChange={handleChange}
// //         />
// //       </label>
// //       <select
// //         name="access_to"
// //         multiple
// //         value={formData.access_to}
// //         onChange={handleChange}
// //       >
// //         <option value="Admin">Admin</option>
// //         <option value="Student">Student</option>
// //         <option value="Faculty">Faculty</option>
// //         <option value="Employee">Employee</option>
// //         <option value="Alumni">Alumni</option>
// //         <option value="ExEmployee">ExEmployee</option>
// //       </select>
// //       <input
// //         type="file"
// //         name="view_pdf"
// //         onChange={handleChange}
// //       />
// //       <button type="submit">Submit</button>
// //     </form>
// //   );
// // };

// // export default CircularData;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const CircularForm = () => {
//   const [formData, setFormData] = useState({
//     c_type: "",
//     publish_id: "",
//     date: "",
//     issued_by: "",
//     subject: "",
//     uploaded_by: "",
//     is_published: false,
//     access_to: [],
//     view_pdf: null,
//   });

//   const [departments, setDepartments] = useState([]);

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const response = await axios.get("/api/departments/");
//         setDepartments(response.data.departments);
//       } catch (error) {
//         console.error("Error fetching departments:", error);
//       }
//     };

//     fetchDepartments();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;

//     if (name === "access_to") {
//       const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
//       setFormData((prev) => ({
//         ...prev,
//         [name]: selectedOptions,
//       }));
//     } else if (type === "file") {
//       setFormData((prev) => ({
//         ...prev,
//         view_pdf: files[0],
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: type === "checkbox" ? checked : value,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       if (key === "access_to") {
//         formData[key].forEach((item) => data.append(key, item));
//       } else {
//         data.append(key, formData[key]);
//       }
//     });

//     try {
//       const response = await axios.post("/api/circulars/add/", data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log("Response:", response.data);
//       alert("Form submitted successfully!");
//     } catch (error) {
//       console.error("Error submitting form:", error.response.data);
//       alert("Error submitting form. Please try again.");
//     }
//   };

//   const styles = {
//     formContainer: {
//       maxWidth: '800px',
//       margin: '0 auto',
//       padding: '20px',
//       backgroundColor: '#f0f4f8',
//       borderRadius: '8px',
//       boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//     },
//     formTitle: {
//       textAlign: 'center',
//       color: '#2c3e50',
//       marginBottom: '20px',
//       fontSize: '24px',
//       fontWeight: 'bold',
//     },
//     formRow: {
//       display: 'flex',
//       flexWrap: 'wrap',
//       marginBottom: '20px',
//       gap: '20px',
//     },
//     formGroup: {
//       flex: '1 1 calc(50% - 10px)',
//       minWidth: '200px',
//     },
//     fullWidth: {
//       flex: '1 1 100%',
//     },
//     label: {
//       display: 'block',
//       marginBottom: '5px',
//       color: '#34495e',
//       fontSize: '16px',
//       fontWeight: '500',
//     },
//     input: {
//       width: '100%',
//       padding: '10px',
//       border: '1px solid #bdc3c7',
//       borderRadius: '4px',
//       fontSize: '16px',
//       transition: 'border-color 0.3s',
//     },
//     select: {
//       width: '100%',
//       padding: '10px',
//       border: '1px solid #bdc3c7',
//       borderRadius: '4px',
//       fontSize: '16px',
//       backgroundColor: 'white',
//       transition: 'border-color 0.3s',
//     },
//     textarea: {
//       width: '100%',
//       padding: '10px',
//       border: '1px solid #bdc3c7',
//       borderRadius: '4px',
//       fontSize: '16px',
//       minHeight: '100px',
//       resize: 'vertical',
//       transition: 'border-color 0.3s',
//     },
//     checkboxLabel: {
//       display: 'flex',
//       alignItems: 'center',
//       fontSize: '16px',
//       color: '#34495e',
//     },
//     checkbox: {
//       marginRight: '10px',
//     },
//     fileInput: {
//       width: '100%',
//       padding: '10px',
//       border: '1px solid #bdc3c7',
//       borderRadius: '4px',
//       fontSize: '16px',
//       backgroundColor: 'white',
//     },
//     submitButton: {
//       width: '100%',
//       padding: '12px',
//       backgroundColor: '#3498db',
//       color: 'white',
//       border: 'none',
//       borderRadius: '4px',
//       fontSize: '18px',
//       fontWeight: 'bold',
//       cursor: 'pointer',
//       transition: 'background-color 0.3s',
//     },
//     '@media (max-width: 768px)': {
//       formGroup: {
//         flex: '1 1 100%',
//       },
//       input: {
//         fontSize: '14px',
//       },
//       select: {
//         fontSize: '14px',
//       },
//       textarea: {
//         fontSize: '14px',
//       },
//       submitButton: {
//         fontSize: '16px',
//       },
//     },
//   };

//   return (
//     <div style={styles.formContainer}>
//       <h2 style={styles.formTitle}>Circular Form</h2>
//       <form onSubmit={handleSubmit}>
//         <div style={styles.formRow}>
//           <div style={styles.formGroup}>
//             <label style={styles.label} htmlFor="c_type">Circular Type</label>
//             <input
//               style={styles.input}
//               type="text"
//               id="c_type"
//               name="c_type"
//               placeholder="Enter Circular Type"
//               value={formData.c_type}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div style={styles.formGroup}>
//             <label style={styles.label} htmlFor="publish_id">Publish ID</label>
//             <input
//               style={styles.input}
//               type="text"
//               id="publish_id"
//               name="publish_id"
//               placeholder="Enter Publish ID"
//               value={formData.publish_id}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>
//         <div style={styles.formRow}>
//           <div style={styles.formGroup}>
//             <label style={styles.label} htmlFor="date">Date</label>
//             <input
//               style={styles.input}
//               type="date"
//               id="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div style={styles.formGroup}>
//             <label style={styles.label} htmlFor="issued_by">Issued By</label>
//             <select
//               style={styles.select}
//               id="issued_by"
//               name="issued_by"
//               value={formData.issued_by}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select Department</option>
//               {departments.map((dept, index) => (
//                 <option key={index} value={dept}>
//                   {dept}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         <div style={styles.formRow}>
//           <div style={{...styles.formGroup, ...styles.fullWidth}}>
//             <label style={styles.label} htmlFor="subject">Subject</label>
//             <textarea
//               style={styles.textarea}
//               id="subject"
//               name="subject"
//               placeholder="Enter Subject"
//               value={formData.subject}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>
//         <div style={styles.formRow}>
//           <div style={styles.formGroup}>
//             <label style={styles.label} htmlFor="uploaded_by">Uploaded By</label>
//             <input
//               style={styles.input}
//               type="text"
//               id="uploaded_by"
//               name="uploaded_by"
//               placeholder="Enter Uploader's Name"
//               value={formData.uploaded_by}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div style={styles.formGroup}>
//             <label style={styles.label} htmlFor="access_to">Access To</label>
//             <select
//               style={styles.select}
//               id="access_to"
//               name="access_to"
//               multiple
//               value={formData.access_to}
//               onChange={handleChange}
//               required
//             >
//               <option value="Admin">Admin</option>
//               <option value="Student">Student</option>
//               <option value="Faculty">Faculty</option>
//               <option value="Employee">Employee</option>
//               <option value="Alumni">Alumni</option>
//               <option value="ExEmployee">ExEmployee</option>
//             </select>
//           </div>
//         </div>
//         <div style={styles.formRow}>
//           <div style={{...styles.formGroup, ...styles.fullWidth}}>
//             <label style={styles.label} htmlFor="view_pdf">Upload PDF</label>
//             <input
//               style={styles.fileInput}
//               type="file"
//               id="view_pdf"
//               name="view_pdf"
//               onChange={handleChange}
//               accept=".pdf"
//               required
//             />
//           </div>
//         </div>
//         <div style={styles.formRow}>
//           <div style={{...styles.formGroup, ...styles.fullWidth}}>
//             <label style={styles.checkboxLabel}>
//               <input
//                 style={styles.checkbox}
//                 type="checkbox"
//                 name="is_published"
//                 checked={formData.is_published}
//                 onChange={handleChange}
//               />
//               Is Published
//             </label>
//           </div>
//         </div>
//         <button style={styles.submitButton} type="submit">Submit Circular</button>
//       </form>
//     </div>
//   );
// };

// export default CircularForm;

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CircularForm() {
  const [formData, setFormData] = useState({
    c_type: "",
    publish_id: "",
    date: "",
    issued_by: "",
    subject: "",
    uploaded_by: "",
    is_published: false,
    access_to: [],
    view_pdf: null,
  });
  const [c_types] = useState(['Circulars', 'Notifications', 'Office Order']);
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

    if (name === "access_to") {
      setFormData((prev) => ({
        ...prev,
        access_to: checked
          ? [...prev.access_to, value]
          : prev.access_to.filter((item) => item !== value),
      }));
    } else if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        view_pdf: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }

    // Clear the error when the user starts typing
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    let formErrors = {};
    
    if (!formData.c_type) formErrors.c_type = "Circular Type is required";
    if (!formData.publish_id.trim()) formErrors.publish_id = "Publish ID is required";
    if (!formData.date) formErrors.date = "Date is required";
    if (!formData.issued_by) formErrors.issued_by = "Issuing department is required";
    if (!formData.subject.trim()) formErrors.subject = "Subject is required";
    if (!formData.uploaded_by.trim()) formErrors.uploaded_by = "Uploaded By is required";
    if (formData.access_to.length === 0) formErrors.access_to = "At least one access permission is required";
    if (!formData.view_pdf) formErrors.view_pdf = "PDF file is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "access_to") {
          formData[key].forEach((item) => data.append(key, item));
        } else {
          data.append(key, formData[key]);
        }
      });

      try {
        const response = await axios.post("/api/circulars/add/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Response:", response.data);
        setMessage("Circular submitted successfully!");
        // Reset the form
        setFormData({
          c_type: "",
          publish_id: "",
          date: "",
          issued_by: "",
          subject: "",
          uploaded_by: "",
          is_published: false,
          access_to: [],
          view_pdf: null,
        });
        // Clear any existing errors
        setErrors({});
      } catch (error) {
        console.error("Error submitting form:", error.response.data);
        setMessage("Error submitting circular. Please try again.");
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
    checkboxGroup: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '0.875rem',
      color: '#374151',
    },
    checkbox: {
      marginRight: '0.25rem',
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
          <h2 style={styles.headerText}>CIRCULAR / NOTIFICATIONS / OFFICE ORDERS FORM</h2>
        </div>
        <div style={styles.form}>
          {message && <div style={styles.message}>{message}</div>}
          <form onSubmit={handleSubmit}>
            <div style={styles.gridContainer}>
              <div style={styles.inputGroup}>
                <label htmlFor="c_type" style={styles.label}>Circular Type:</label>
                <select
                  id="c_type"
                  name="c_type"
                  value={formData.c_type}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="">Select Circular Type</option>
                  {c_types.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
                {errors.c_type && <span style={styles.error}>{errors.c_type}</span>}
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="publish_id" style={styles.label}>Publish ID:</label>
                <input
                  type="text"
                  id="publish_id"
                  name="publish_id"
                  value={formData.publish_id}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.publish_id && <span style={styles.error}>{errors.publish_id}</span>}
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="date" style={styles.label}>Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.date && <span style={styles.error}>{errors.date}</span>}
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
                  <option value="">Select Department</option>
                  {departments.map((dept, index) => (
                    <option key={index} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                {errors.issued_by && <span style={styles.error}>{errors.issued_by}</span>}
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="subject" style={styles.label}>Subject:</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.subject && <span style={styles.error}>{errors.subject}</span>}
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="uploaded_by" style={styles.label}>Uploaded By:</label>
                <input
                  type="text"
                  id="uploaded_by"
                  name="uploaded_by"
                  value={formData.uploaded_by}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.uploaded_by && <span style={styles.error}>{errors.uploaded_by}</span>}
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <input
                    type="checkbox"
                    name="is_published"
                    checked={formData.is_published}
                    onChange={handleChange}
                  />
                  Is Published
                </label>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Access To:</label>
                <div style={styles.checkboxGroup}>
                  {['Admin', 'Student', 'Faculty', 'Employee', 'Alumni', 'ExEmployee'].map((role) => (
                    <label key={role} style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        name="access_to"
                        value={role}
                        checked={formData.access_to.includes(role)}
                        onChange={handleChange}
                        style={styles.checkbox}
                      />
                      {role}
                    </label>
                  ))}
                </div>
                {errors.access_to && <span style={styles.error}>{errors.access_to}</span>}
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
              <button type="submit" style={styles.button}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}