import React, { useState, useEffect } from "react";
import axios from "axios";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage] = useState(10);

  // Fetch events function
  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/events-list/");
      setEvents(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch events. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
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

  const handleEdit = (event) => {
    setEditingEvent({ ...event });
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.get(`/api/events/${editingEvent.id}/download/`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${editingEvent.event_name}.pdf`);
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
      setEditingEvent(prev => ({ ...prev, [name]: checked }));
    } else {
      setEditingEvent(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEditingEvent(prev => ({ ...prev, view_pdf: file }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    Object.entries(editingEvent).forEach(([key, value]) => {
      if (key === "view_pdf" && value instanceof File) {
        formData.append(key, value);
      } else if (key !== "view_pdf") {
        formData.append(key, value);
      }
    });

    try {
      const apiUrl = editingEvent.id 
        ? `/api/events/${editingEvent.id}/add/`
        : `/api/events/add/`;
      
      await axios.post(apiUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await fetchEvents();
      setEditingEvent(null);
    } catch (err) {
      console.error("Error saving event:", err);
    }
  };

  const handlePublish = async (id) => {
    try {
      await axios.post(`/api/events/${id}/publish/`);
      setEvents(prev =>
        prev.map(e => e.id === id ? { ...e, is_published: true } : e)
      );
    } catch (err) {
      console.error("Error publishing event:", err);
    }
  };

  const handleUnpublish = async (id) => {
    try {
      await axios.post(`/api/events/${id}/unpublish/`);
      setEvents(prev =>
        prev.map(e => e.id === id ? { ...e, is_published: false } : e)
      );
    } catch (err) {
      console.error("Error unpublishing event:", err);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredEvents = events.filter(event =>
    event.event_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.event_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.event_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEvents.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p style={styles.loadingText}>Loading events...</p>;
  if (error) return <p style={styles.errorText}>{error}</p>;

  return (
    <div style={styles.container}>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={handleSearch}
          style={styles.searchInput}
        />
      </div>
      <div style={styles.tableCard}>
        <div style={styles.tableHeader}>
          <div style={styles.headerCell}>Event Name</div>
          <div style={styles.headerCell}>Event Type</div>
          <div style={styles.headerCell}>Event ID</div>
          <div style={styles.headerCell}>From Date</div>
          <div style={styles.headerCell}>To Date</div>
          <div style={styles.headerCell}>Organizer</div>
          <div style={styles.headerCell}>Venue</div>
          <div style={styles.headerCell}>Status</div>
          <div style={styles.headerCell}>Actions</div>
        </div>
        <div style={styles.tableBody}>
          {currentItems.map((event) => (
            <div key={event.id} style={styles.tableRow}>
              <div style={styles.cell}>{event.event_name}</div>
              <div style={styles.cell}>{event.event_type}</div>
              <div style={styles.cell}>{event.event_id}</div>
              <div style={styles.cell}>{event.from_date}</div>
              <div style={styles.cell}>{event.to_date}</div>
              <div style={styles.cell}>{event.organizer}</div>
              <div style={styles.cell}>{event.venue}</div>
              <div style={styles.cell}>
                <span style={event.is_published ? styles.publishedStatus : styles.unpublishedStatus}>
                  {event.is_published ? "Published" : "Unpublished"}
                </span>
              </div>
              <div style={styles.cell}>
                <button onClick={() => handleEdit(event)} style={styles.editButton}>
                  Edit
                </button>
                {event.is_published ? (
                  <button onClick={() => handleUnpublish(event.id)} style={styles.unpublishButton}>
                    Unpublish
                  </button>
                ) : (
                  <button onClick={() => handlePublish(event.id)} style={styles.publishButton}>
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
        {Array.from({ length: Math.ceil(filteredEvents.length / itemsPerPage) }, (_, i) => (
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
          disabled={currentPage === Math.ceil(filteredEvents.length / itemsPerPage)}
          style={styles.paginationArrow}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.arrowIcon}>
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      {editingEvent && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Edit Event</h2>
            <form onSubmit={handleSave}>
              <input
                type="text"
                name="event_name"
                value={editingEvent.event_name}
                onChange={handleChange}
                placeholder="Event Name"
                style={styles.input}
              />
              <input
                type="text"
                name="event_type"
                value={editingEvent.event_type}
                onChange={handleChange}
                placeholder="Event Type"
                style={styles.input}
              />
              <input
                type="text"
                name="event_id"
                value={editingEvent.event_id}
                onChange={handleChange}
                placeholder="Event ID"
                style={styles.input}
              />
              <input
                type="date"
                name="from_date"
                value={editingEvent.from_date}
                onChange={handleChange}
                style={styles.input}
              />
              <input
                type="date"
                name="to_date"
                value={editingEvent.to_date}
                onChange={handleChange}
                style={styles.input}
              />
              <input
                type="text"
                name="organizer"
                value={editingEvent.organizer}
                onChange={handleChange}
                placeholder="Organizer"
                style={styles.input}
              />
              <select
                name="organized_department"
                value={editingEvent.organized_department}
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
                value={editingEvent.subject}
                onChange={handleChange}
                placeholder="Subject"
                style={styles.textarea}
              />
              <input
                type="text"
                name="venue"
                value={editingEvent.venue}
                onChange={handleChange}
                placeholder="Venue"
                style={styles.input}
              />
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="is_published"
                  checked={editingEvent.is_published}
                  onChange={handleChange}
                />
                Is Published
              </label>
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
                <button type="button" onClick={() => setEditingEvent(null)} style={styles.cancelButton}>Cancel</button>
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

export default EventList;

