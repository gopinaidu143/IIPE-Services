// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const CircularList = () => {
//   const [circulars, setCirculars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editingCircular, setEditingCircular] = useState(null);
//   const [departments, setDepartments] = useState([]);

//   // Fetch circulars function
//   const fetchCirculars = async () => {
//     try {
//       const response = await axios.get("/api/circulars-list/");
//       setCirculars(response.data);
//       setLoading(false);
//     } catch (err) {
//       setError("Failed to fetch circulars. Please try again.");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCirculars(); // Fetch circulars on mount
//     const fetchDepartments = async () => {
//       try {
//         const response = await axios.get("/api/departments/");
//         setDepartments(response.data.departments);
//       } catch (err) {
//         console.error("Error fetching departments:", err);
//       }
//     };

//     fetchDepartments();
//   }, []);

//   const handleEdit = (circular) => {
//     setEditingCircular({
//       ...circular,
//       access_to: circular.access_to || [], // Ensure access_to is an array
//     });
//   };

//   const handleDownloadPDF = async () => {
//     try {
//       const response = await axios.get(`/api/circulars/${editingCircular.id}/download/`, {
//         responseType: "blob", // Important for handling binary data
//       });

//       // Create a URL for the binary file
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", `${editingCircular.subject}.pdf`); // Specify filename
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link); // Clean up after triggering download
//     } catch (err) {
//       console.error("Error downloading PDF:", err);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === "checkbox") {
//       setEditingCircular(prev => ({ ...prev, [name]: checked }));
//     } else if (name === "access_to") {
//       const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
//       setEditingCircular(prev => ({ ...prev, [name]: selectedOptions.map(role => ({ role_name: role })) }));
//     } else {
//       setEditingCircular(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setEditingCircular(prev => ({ ...prev, view_pdf: file }));
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
    
//     Object.entries(editingCircular).forEach(([key, value]) => {
//       if (key === "access_to") {
//         value.forEach(role => formData.append(key, role.role_name));
//       } else if (key === "view_pdf" && value instanceof File) {
//         formData.append(key, value);
//       } else if (key !== "view_pdf") { // Skip adding view_pdf if it’s null during updates
//         formData.append(key, value);
//       }
//     });

//     try {
//       const apiUrl = editingCircular.id 
//         ? `/api/circulars/${editingCircular.id}/`  // Update existing circular
//         : `/api/circulars/add/`;                 // Add new circular
      
//       const response = await axios.post(apiUrl, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       // After saving, refetch circulars
//       await fetchCirculars();

//       setEditingCircular(null); // Close the modal
//     } catch (err) {
//       console.error("Error saving circular:", err);
//     }
//   };

//   const handlePublish = async (id) => {
//     try {
//       await axios.post(`/api/circulars/${id}/publish/`);
//       setCirculars(prev =>
//         prev.map(c => c.id === id ? { ...c, is_published: true } : c)
//       );
//     } catch (err) {
//       console.error("Error publishing circular:", err);
//     }
//   };

//   const handleUnpublish = async (id) => {
//     try {
//       await axios.post(`/api/circulars/${id}/unpublish/`);
//       setCirculars(prev =>
//         prev.map(c => c.id === id ? { ...c, is_published: false } : c)
//       );
//     } catch (err) {
//       console.error("Error unpublishing circular:", err);
//     }
//   };

//   if (loading) return <p>Loading circulars...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div style={styles.circularList}>
//       {circulars.map((circular) => (
//         <div key={circular.id} style={styles.circularCard}>
//           <h3>{circular.subject}</h3>
//           <p><strong>Type:</strong> {circular.c_type}</p>
//           <p><strong>Publish ID:</strong> {circular.publish_id}</p>
//           <p><strong>Date:</strong> {circular.date}</p>
//           <p><strong>Issued By:</strong> {circular.issued_by}</p>
//           <p><strong>Access To:</strong> {circular.access_to ? circular.access_to.map(role => role.role_name).join(", ") : 'N/A'}</p>
//           <p><strong>Status:</strong> {circular.is_published ? "Published" : "Unpublished"}</p>

//           <div style={styles.circularActions}>
//             <button
//               onClick={() => handleEdit(circular)}
//               style={styles.editButton}
//             >
//               Edit
//             </button>
//             {circular.is_published ? (
//               <button
//                 onClick={() => handleUnpublish(circular.id)}
//                 style={styles.unpublishButton}
//               >
//                 Unpublish
//               </button>
//             ) : (
//               <button
//                 onClick={() => handlePublish(circular.id)}
//                 style={styles.publishButton}
//               >
//                 Publish
//               </button>
//             )}
//           </div>
//         </div>
//       ))}
//       {editingCircular && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modalContent}>
//             <h2>Edit Circular</h2>
//             <form onSubmit={handleSave}>
//               <input
//                 type="text"
//                 name="c_type"
//                 value={editingCircular.c_type}
//                 onChange={handleChange}
//                 placeholder="Circular Type"
//                 style={styles.input}
//               />
//               <input
//                 type="text"
//                 name="publish_id"
//                 value={editingCircular.publish_id}
//                 onChange={handleChange}
//                 placeholder="Publish ID"
//                 style={styles.input}
//               />
//               <input
//                 type="date"
//                 name="date"
//                 value={editingCircular.date}
//                 onChange={handleChange}
//                 style={styles.input}
//               />
//               <select
//                 name="issued_by"
//                 value={editingCircular.issued_by}
//                 onChange={handleChange}
//                 style={styles.input}
//               >
//                 <option value="">Select Department </option>
//                 {departments.map((dept, index) => (
//                   <option key={index} value={dept}>
//                     {dept}
//                   </option>
//                 ))}
//               </select>
//               <textarea
//                 name="subject"
//                 value={editingCircular.subject}
//                 onChange={handleChange}
//                 placeholder="Subject"
//                 style={styles.textarea}
//               />
//               <input
//                 type="text"
//                 name="uploaded_by"
//                 value={editingCircular.uploaded_by}
//                 onChange={handleChange}
//                 placeholder="Uploaded By"
//                 style={styles.input}
//               />
//               <label style={styles.checkboxLabel}>
//                 <input
//                   type="checkbox"
//                   name="is_published"
//                   checked={editingCircular.is_published}
//                   onChange={handleChange}
//                 />
//                 Is Published
//               </label>
//               <select
//                 name="access_to"
//                 multiple
//                 value={editingCircular.access_to.map(role => role.role_name)}
//                 onChange={handleChange}
//                 style={styles.input}
//               >
//                 <option value="Admin">Admin</option>
//                 <option value="Student">Student</option>
//                 <option value="Faculty">Faculty</option>
//                 <option value="Employee">Employee</option>
//                 <option value="Alumni">Alumni</option>
//                 <option value="ExEmployee">ExEmployee</option>
//               </select>
//               <input
//                 type="file"
//                 name="view_pdf"
//                 onChange={handleFileChange}
//                 style={styles.input}
//               />
//               <button
//                 type="button"
//                 onClick={handleDownloadPDF}
//                 style={styles.eyeButton}
//               >
//                 👁 Download Current PDF
//               </button>
//               <div style={styles.modalActions}>
//                 <button type="submit" style={styles.saveButton}>Save</button>
//                 <button type="button" onClick={() => setEditingCircular(null)} style={styles.cancelButton}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   circularList: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     gap: '20px',
//     padding: '20px',
//   },
//   circularCard: {
//     border: '1px solid #ddd',
//     borderRadius: '8px',
//     padding: '15px',
//     width: '300px',
//     boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//   },
//   circularActions: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     marginTop: '10px',
//   },
//   editButton: {
//     backgroundColor: '#4CAF50',
//     color: 'white',
//     padding: '8px 12px',
//     borderRadius: '4px',
//     border: 'none',
//     cursor: 'pointer',
//   },
//   publishButton: {
//     backgroundColor: '#2196F3',
//     color: 'white',
//     padding: '8px 12px',
//     borderRadius: '4px',
//     border: 'none',
//     cursor: 'pointer',
//   },
//   unpublishButton: {
//     backgroundColor: '#f44336',
//     color: 'white',
//     padding: '8px 12px',
//     borderRadius: '4px',
//     border: 'none',
//     cursor: 'pointer',
//   },
//   modalOverlay: {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: '20px',
//     borderRadius: '8px',
//     width: '80%',
//     maxWidth: '500px',
//   },
//   input: {
//     width: '100%',
//     padding: '8px',
//     marginBottom: '10px',
//     borderRadius: '4px',
//     border: '1px solid #ddd',
//   },
//   textarea: {
//     width: '100%',
//     padding: '8px',
//     marginBottom: '10px',
//     borderRadius: '4px',
//     border: '1px solid #ddd',
//     minHeight: '100px',
//   },
//   checkboxLabel: {
//     display: 'flex',
//     alignItems: 'center',
//     marginBottom: '10px',
//   },
//   modalActions: {
//     display: 'flex',
//     justifyContent: 'flex-end',
//     gap: '10px',
//     marginTop: '20 px',
//   },
//   saveButton: {
//     backgroundColor: '#4CAF50',
//     color: 'white',
//     padding: '8px 12px',
//     borderRadius: '4px',
//     border: 'none',
//     cursor: 'pointer',
//   },
//   cancelButton: {
//     backgroundColor: '#f44336',
//     color: 'white',
//     padding: '8px 12px',
//     borderRadius: '4px',
//     border: 'none',
//     cursor: 'pointer',
//   },
// };

// export default CircularList;


import React, { useState, useEffect } from "react";
import axios from "axios";

const CircularList = () => {
  const [circulars, setCirculars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCircular, setEditingCircular] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage] = useState(10);

  // Fetch circulars function
  const fetchCirculars = async () => {
    try {
      const response = await axios.get("/api/circulars-list/");
      setCirculars(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch circulars. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCirculars();
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("/api/departments/");
        setDepartments(response.data.departments);
      } catch (err) {
        console.error("Error fetching departments:", err);
      }
    };

    fetchDepartments();
  }, []);

  const handleEdit = (circular) => {
    setEditingCircular({
      ...circular,
      access_to: circular.access_to || [],
    });
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.get(`/api/circulars/${editingCircular.id}/download/`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${editingCircular.subject}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error downloading PDF:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setEditingCircular(prev => ({ ...prev, [name]: checked }));
    } else if (name === "access_to") {
      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
      setEditingCircular(prev => ({ ...prev, [name]: selectedOptions.map(role => ({ role_name: role })) }));
    } else {
      setEditingCircular(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEditingCircular(prev => ({ ...prev, view_pdf: file }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    Object.entries(editingCircular).forEach(([key, value]) => {
      if (key === "access_to") {
        value.forEach(role => formData.append(key, role.role_name));
      } else if (key === "view_pdf" && value instanceof File) {
        formData.append(key, value);
      } else if (key !== "view_pdf") {
        formData.append(key, value);
      }
    });

    try {
      const apiUrl = editingCircular.id 
        ? `/api/circulars/${editingCircular.id}/add/`
        : `/api/circulars/add/`;
      
      await axios.post(apiUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await fetchCirculars();
      setEditingCircular(null);
    } catch (err) {
      console.error("Error saving circular:", err);
    }
  };

  const handlePublish = async (id) => {
    try {
      await axios.post(`/api/circulars/${id}/publish/`);
      setCirculars(prev =>
        prev.map(c => c.id === id ? { ...c, is_published: true } : c)
      );
    } catch (err) {
      console.error("Error publishing circular:", err);
    }
  };

  const handleUnpublish = async (id) => {
    try {
      await axios.post(`/api/circulars/${id}/unpublish/`);
      setCirculars(prev =>
        prev.map(c => c.id === id ? { ...c, is_published: false } : c)
      );
    } catch (err) {
      console.error("Error unpublishing circular:", err);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredCirculars = circulars.filter(circular =>
    circular.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    circular.c_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    circular.publish_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCirculars.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p style={styles.loadingText}>Loading circulars...</p>;
  if (error) return <p style={styles.errorText}>{error}</p>;

  return (
    <div style={styles.container}>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search circulars..."
          value={searchTerm}
          onChange={handleSearch}
          style={styles.searchInput}
        />
      </div>
      <div style={styles.tableCard}>
        <div style={styles.tableHeader}>
          <div style={styles.headerCell}>Subject</div>
          <div style={styles.headerCell}>Type</div>
          <div style={styles.headerCell}>Publish ID</div>
          <div style={styles.headerCell}>Date</div>
          <div style={styles.headerCell}>Issued By</div>
          <div style={styles.headerCell}>Access To</div>
          <div style={styles.headerCell}>Status</div>
          <div style={styles.headerCell}>Actions</div>
        </div>
        <div style={styles.tableBody}>
          {currentItems.map((circular) => (
            <div key={circular.id} style={styles.tableRow}>
              <div style={styles.cell}>{circular.subject}</div>
              <div style={styles.cell}>{circular.c_type}</div>
              <div style={styles.cell}>{circular.publish_id}</div>
              <div style={styles.cell}>{circular.date}</div>
              <div style={styles.cell}>{circular.issued_by}</div>
              <div style={styles.cell}>{circular.access_to ? circular.access_to.map(role => role.role_name).join(", ") : 'N/A'}</div>
              <div style={styles.cell}>
                <span style={circular.is_published ? styles.publishedStatus : styles.unpublishedStatus}>
                  {circular.is_published ? "Published" : "Unpublished"}
                </span>
              </div>
              <div style={styles.cell}>
                <button onClick={() => handleEdit(circular)} style={styles.editButton}>
                  Edit
                </button>
                {circular.is_published ? (
                  <button onClick={() => handleUnpublish(circular.id)} style={styles.unpublishButton}>
                    Unpublish
                  </button>
                ) : (
                  <button onClick={() => handlePublish(circular.id)} style={styles.publishButton}>
                    Publish
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={styles.pagination}>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          style={styles.paginationArrow}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.arrowIcon}>
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {Array.from({ length: Math.ceil(filteredCirculars.length / itemsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            style={currentPage === i + 1 ? styles.activePageButton : styles.pageButton}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredCirculars.length / itemsPerPage)}
          style={styles.paginationArrow}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.arrowIcon}>
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      {editingCircular && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Edit Circular</h2>
            <form onSubmit={handleSave}>
              <input
                type="text"
                name="c_type"
                value={editingCircular.c_type}
                onChange={handleChange}
                placeholder="Circular Type"
                style={styles.input}
              />
              <input
                type="text"
                name="publish_id"
                value={editingCircular.publish_id}
                onChange={handleChange}
                placeholder="Publish ID"
                style={styles.input}
              />
              <input
                type="date"
                name="date"
                value={editingCircular.date}
                onChange={handleChange}
                style={styles.input}
              />
              <select
                name="issued_by"
                value={editingCircular.issued_by}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">Select Department</option>
                {departments.map((dept, index) => (
                  <option key={index} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <textarea
                name="subject"
                value={editingCircular.subject}
                onChange={handleChange}
                placeholder="Subject"
                style={styles.textarea}
              />
              <input
                type="text"
                name="uploaded_by"
                value={editingCircular.uploaded_by}
                onChange={handleChange}
                placeholder="Uploaded By"
                style={styles.input}
              />
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="is_published"
                  checked={editingCircular.is_published}
                  onChange={handleChange}
                />
                Is Published
              </label>
              <select
                name="access_to"
                multiple
                value={editingCircular.access_to.map(role => role.role_name)}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="Admin">Admin</option>
                <option value="Student">Student</option>
                <option value="Faculty">Faculty</option>
                <option value="Employee">Employee</option>
                <option value="Alumni">Alumni</option>
                <option value="ExEmployee">ExEmployee</option>
              </select>
              <input
                type="file"
                name="view_pdf"
                onChange={handleFileChange}
                style={styles.input}
              />
              <button
                type="button"
                onClick={handleDownloadPDF}
                style={styles.downloadButton}
              >
                👁 Download Current PDF
              </button>
              <div style={styles.modalActions}>
                <button type="submit" style={styles.saveButton}>Save</button>
                <button type="button" onClick={() => setEditingCircular(null)} style={styles.cancelButton}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  searchContainer: {
    marginBottom: '20px',
  },
  searchInput: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  tableCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  tableHeader: {
    display: 'flex',
    backgroundColor: '#f8f9fa',
    fontWeight: 'bold',
    padding: '16px',
    borderBottom: '2px solid #e9ecef',
  },
  headerCell: {
    flex: 1,
    padding: '0 8px',
  },
  tableBody: {
    maxHeight: '600px',
    overflowY: 'auto',
  },
  tableRow: {
    display: 'flex',
    borderBottom: '1px solid #e9ecef',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  cell: {
    flex: 1,
    padding: '16px 8px',
    display: 'flex',
    alignItems: 'center',
  },
  publishedStatus: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '14px',
  },
  unpublishedStatus: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '14px',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '5px',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#45a049',
    },
  },
  publishButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#1e87db',
    },
  },
  unpublishButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#da190b',
    },
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  },
  pageButton: {
    margin: '0 5px',
    padding: '8px 12px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    color: '#333',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'all 0.3s',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  },
  activePageButton: {
    margin: '0 5px',
    padding: '8px 12px',
    border: '1px solid #4CAF50',
    backgroundColor: '#4CAF50',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  paginationArrow: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#4CAF50',
    padding: '8px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
    '&:disabled': {
      color: '#ccc',
      cursor: 'not-allowed',
    },
  },
  arrowIcon: {
    width: '24px',
    height: '24px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
  },
  modalTitle: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    minHeight: '100px',
    fontSize: '16px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    fontSize: '16px',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '20px',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#45a049',
    },
  },
  cancelButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#da190b',
    },
  },
  downloadButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginBottom: '15px',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#1e87db',
    },
  },
  loadingText: {
    fontSize: '18px',
    textAlign: 'center',
    marginTop: '20px',
    color: '#666',
  },
  errorText: {
    fontSize: '18px',
    color: '#f44336',
    textAlign: 'center',
    marginTop: '20px',
  },
};

export default CircularList;

