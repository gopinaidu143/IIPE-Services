import React, { useState, useEffect } from "react";
import axios from "axios";

const MemoList = () => {
  const [memos, setMemos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingMemo, setEditingMemo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage] = useState(10);

  const memoTypes = ["Establishment", "LTC", "Medical"];
  const issuedByOptions = ["Ministry", "Department"];

  // Fetch memos function
  const fetchMemos = async () => {
    try {
      const response = await axios.get("/api/memos-list/");
      setMemos(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch memos. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemos();
  }, []);

  const handleEdit = (memo) => {
    setEditingMemo({ ...memo });
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.get(`/api/memos/${editingMemo.id}/download/`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${editingMemo.reference_id}.pdf`);
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
      setEditingMemo(prev => ({ ...prev, [name]: checked }));
    } else {
      setEditingMemo(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEditingMemo(prev => ({ ...prev, view_pdf: file }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    Object.entries(editingMemo).forEach(([key, value]) => {
      if (key === "view_pdf" && value instanceof File) {
        formData.append(key, value);
      } else if (key !== "view_pdf") {
        formData.append(key, value);
      }
    });

    try {
      const apiUrl = editingMemo.id 
        ? `/api/memos/${editingMemo.id}/add/`
        : `/api/memos/add/`;
      
      await axios.post(apiUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await fetchMemos();
      setEditingMemo(null);
    } catch (err) {
      console.error("Error saving memo:", err);
    }
  };

  const handlePublish = async (id) => {
    try {
      await axios.post(`/api/memos/${id}/publish/`);
      setMemos(prev =>
        prev.map(m => m.id === id ? { ...m, is_published: true } : m)
      );
    } catch (err) {
      console.error("Error publishing memo:", err);
    }
  };

  const handleUnpublish = async (id) => {
    try {
      await axios.post(`/api/memos/${id}/unpublish/`);
      setMemos(prev =>
        prev.map(m => m.id === id ? { ...m, is_published: false } : m)
      );
    } catch (err) {
      console.error("Error unpublishing memo:", err);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredMemos = memos.filter(memo =>
    memo.reference_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    memo.memo_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    memo.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMemos.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p style={styles.loadingText}>Loading memos...</p>;
  if (error) return <p style={styles.errorText}>{error}</p>;

  return (
    <div style={styles.container}>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search memos..."
          value={searchTerm}
          onChange={handleSearch}
          style={styles.searchInput}
        />
      </div>
      <div style={styles.tableCard}>
        <div style={styles.tableHeader}>
          <div style={styles.headerCell}>Reference ID</div>
          <div style={styles.headerCell}>Memo Type</div>
          <div style={styles.headerCell}>Issued By</div>
          <div style={styles.headerCell}>Issued Date</div>
          <div style={styles.headerCell}>Subject</div>
          <div style={styles.headerCell}>Status</div>
          <div style={styles.headerCell}>Actions</div>
        </div>
        <div style={styles.tableBody}>
          {currentItems.map((memo) => (
            <div key={memo.id} style={styles.tableRow}>
              <div style={styles.cell}>{memo.reference_id}</div>
              <div style={styles.cell}>{memo.memo_type}</div>
              <div style={styles.cell}>{memo.issued_by}</div>
              <div style={styles.cell}>{memo.issued_date}</div>
              <div style={styles.cell}>{memo.subject}</div>
              <div style={styles.cell}>
                <span style={memo.is_published ? styles.publishedStatus : styles.unpublishedStatus}>
                  {memo.is_published ? "Published" : "Unpublished"}
                </span>
              </div>
              <div style={styles.cell}>
                <button onClick={() => handleEdit(memo)} style={styles.editButton}>
                  Edit
                </button>
                {memo.is_published ? (
                  <button onClick={() => handleUnpublish(memo.id)} style={styles.unpublishButton}>
                    Unpublish
                  </button>
                ) : (
                  <button onClick={() => handlePublish(memo.id)} style={styles.publishButton}>
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
        {Array.from({ length: Math.ceil(filteredMemos.length / itemsPerPage) }, (_, i) => (
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
          disabled={currentPage === Math.ceil(filteredMemos.length / itemsPerPage)}
          style={styles.paginationArrow}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.arrowIcon}>
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      {editingMemo && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Edit Memo</h2>
            <form onSubmit={handleSave}>
              <input
                type="text"
                name="reference_id"
                value={editingMemo.reference_id}
                onChange={handleChange}
                placeholder="Reference ID"
                style={styles.input}
              />
              <select
                name="memo_type"
                value={editingMemo.memo_type}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">Select Memo Type</option>
                {memoTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <select
                name="issued_by"
                value={editingMemo.issued_by}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">Select Issuer</option>
                {issuedByOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <input
                type="date"
                name="issued_date"
                value={editingMemo.issued_date}
                onChange={handleChange}
                style={styles.input}
              />
              <textarea
                name="subject"
                value={editingMemo.subject}
                onChange={handleChange}
                placeholder="Subject"
                style={styles.textarea}
              />
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="is_published"
                  checked={editingMemo.is_published}
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
                <button type="button" onClick={() => setEditingMemo(null)} style={styles.cancelButton}>Cancel</button>
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

export default MemoList;

