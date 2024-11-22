import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const AllCircularView = () => {
  const [circulars, setCirculars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage] = useState(10);
  const { authTokens ,isAuthenticated} = useContext(AuthContext);


  // Fetch circulars function
  const fetchCirculars = async () => {
    try {
    const response = isAuthenticated
            ? await axios.get("/api/circulars/all-view/", {
                headers: {
                    Authorization: `Bearer ${authTokens}`,
                },
                withCredentials: true,
            })
            : await axios.get("/api/circulars/all-view/");
            setCirculars(response.data);
            setLoading(false);
    } catch (err) {
      setError("Failed to fetch circulars. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCirculars();
  },  [isAuthenticated]);

  const handleDownloadPDF = async (id, subject) => {
    try {
      const response = await axios.get(`/api/circulars/${id}/download/`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${subject}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error downloading PDF:", err);
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
          <div style={styles.headerCell}>Document</div>
        </div>
        <div style={styles.tableBody}>
          {currentItems.map((circular) => (
            <div key={circular.id} style={styles.tableRow}>
              <div style={styles.cell}>{circular.subject}</div>
              <div style={styles.cell}>{circular.c_type}</div>
              <div style={styles.cell}>{circular.publish_id}</div>
              <div style={styles.cell}>{circular.date}</div>
              <div style={styles.cell}>{circular.issued_by}</div>
              <div style={styles.cell}>
                <button 
                  onClick={() => handleDownloadPDF(circular.id, circular.subject)} 
                  style={styles.viewButton}
                >
                  View
                </button>
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
  viewButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#45a049',
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

export default AllCircularView;

