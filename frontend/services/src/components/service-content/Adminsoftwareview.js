import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const AdminSoftwareView = () => {
  const [softwareRequests, setSoftwareRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [messageBody, setMessageBody] = useState("");
  const { authTokens } = useContext(AuthContext);

  useEffect(() => {
    fetchSoftwareRequests();
  }, []);

  const fetchSoftwareRequests = async () => {
    try {
      const response = await axios.get("/api/software-requisition-list/");
      setSoftwareRequests(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch software requests. Please try again.");
      setLoading(false);
    }
  };

  const handleMessage = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleSendMessage = async () => {
    try {
      await axios.post(`/api/software-requisition/${selectedRequest.id}/response/`, {
        message: messageBody
      });
      setShowModal(false);
      setMessageBody("");
      // Optionally, you can update the local state to reflect the change
      // For example, you might want to mark this request as "responded"
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const handleResolve = async (id) => {
    try {
      await axios.post(`/api/software-requisition/${id}/resolve/`, {}, {
        headers: {
            Authorization: `Bearer ${authTokens}`,
        },
        withCredentials: true,
    });
      // Update the local state to reflect the change
      setSoftwareRequests(prevRequests =>
        prevRequests.map(req =>
          req.id === id ? { ...req, is_resolved: true } : req
        )
      );
    } catch (err) {
      console.error("Error resolving request:", err);
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = softwareRequests.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p style={styles.loadingText}>Loading software requests...</p>;
  if (error) return <p style={styles.errorText}>{error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Software Requisition Requests</h2>
      <div style={styles.tableCard}>
        <div style={styles.tableHeader}>
          <div style={styles.headerCell}>Name</div>
          <div style={styles.headerCell}>Department</div>
          <div style={styles.headerCell}>Software Name</div>
          <div style={styles.headerCell}>Purpose</div>
          <div style={styles.headerCell}>Status</div>
          <div style={styles.headerCell}>Actions</div>
        </div>
        <div style={styles.tableBody}>
          {currentItems.map((request) => (
            <div key={request.id} style={styles.tableRow}>
              <div style={styles.cell}>{request.name}</div>
              <div style={styles.cell}>{request.department}</div>
              <div style={styles.cell}>{request.software_name}</div>
              <div style={styles.cell}>{request.purpose}</div>
              <div style={styles.cell}>
                <span style={request.is_resolved ? styles.resolvedStatus : styles.pendingStatus}>
                  {request.is_resolved ? "Resolved" : "Pending"}
                </span>
              </div>
              <div style={styles.cell}>
                {!request.is_resolved && (
                  <>
                    <button
                      onClick={() => handleMessage(request)}
                      style={styles.messageButton}
                    >
                      Message
                    </button>
                    <button
                      onClick={() => handleResolve(request.id)}
                      style={styles.resolveButton}
                    >
                      Resolve
                    </button>
                  </>
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
        {Array.from({ length: Math.ceil(softwareRequests.length / itemsPerPage) }, (_, i) => (
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
          disabled={currentPage === Math.ceil(softwareRequests.length / itemsPerPage)}
          style={styles.paginationArrow}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.arrowIcon}>
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Send Message</h2>
            <textarea
              value={messageBody}
              onChange={(e) => setMessageBody(e.target.value)}
              placeholder="Enter your message here"
              style={styles.textarea}
            />
            <div style={styles.modalActions}>
              <button onClick={handleSendMessage} style={styles.sendButton}>Send</button>
              <button onClick={() => setShowModal(false)} style={styles.cancelButton}>Cancel</button>
            </div>
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
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
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
  resolvedStatus: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '14px',
  },
  pendingStatus: {
    backgroundColor: '#fff3cd',
    color: '#856404',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '14px',
  },
  messageButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '5px',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
  resolveButton: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#218838',
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
    border: '1px solid #007bff',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  paginationArrow: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#007bff',
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
  textarea: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    minHeight: '100px',
    fontSize: '16px',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
  },
  sendButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#5a6268',
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

export default AdminSoftwareView;

