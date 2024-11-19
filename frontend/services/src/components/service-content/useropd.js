import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import OPD from './OPD';

export default function UserOPD() {
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authTokens, email } = useContext(AuthContext);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [pdfScale, setPdfScale] = useState(1);
  const [tentativeVisitTo, setTentativeVisitTo] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(`/api/user-opdforms/${email}`, {
          headers: {
            Authorization: `Bearer ${authTokens}`,
          },
          withCredentials: true,
        });
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [authTokens, email]);

  const handleViewPdf = async (referralId,tentativeVisitTo) => {
    try {
      const response = await axios.get(`/api/preview-pdf/${referralId}/`, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${authTokens}`,
        },
      });
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      setPdfUrl(url);
      setShowPdfModal(true);
      setTentativeVisitTo(tentativeVisitTo);
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  };

  const recordsPerPage = 10;
  const filteredRecords = Array.isArray(records)
    ? statusFilter
      ? records.filter((record) => record.status === statusFilter)
      : records
    : [];

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const handleFilter = (status) => {
    setStatusFilter(status === statusFilter ? null : status);
    setCurrentPage(1);
  };

  const getStatusDisplay = (status) => {
    switch (status) {
      case 'approved':
        return <span style={{...styles.statusBadge, backgroundColor: '#4CAF50'}}>Accepted</span>;
      case 'pending':
        return <span style={{...styles.statusBadge, backgroundColor: '#FFC107'}}>Pending</span>;
      case 'rejected':
        return <span style={{...styles.statusBadge, backgroundColor: '#F44336'}}>Rejected</span>;
      default:
        return status;
    }
  };

  const handleZoomIn = () => {
    setPdfScale(prevScale => prevScale + 0.1);
  };

  const handleZoomOut = () => {
    setPdfScale(prevScale => Math.max(prevScale - 0.1, 0.1));
  };

  const handlePrint = () => {
    const printWindow = window.open(pdfUrl, '_blank');
    printWindow.onload = () => {
      printWindow.print();
    };
  };
  const isDownloadDisabled = tentativeVisitTo && new Date(tentativeVisitTo) < new Date(); // Check if download should be disabled


  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <div style={styles.adminPage}>
      {/* <nav style={styles.navbar}>
        <h2 style={styles.navbarTitle}>User OPD Dashboard</h2>
      </nav> */}

      <div style={styles.contentWrapper}>
        <div style={styles.buttonGroup}>
          <button onClick={() => setShowForm(false)} style={{...styles.filterButton, backgroundColor: !showForm ? 'black' : 'white',color: !showForm ? 'white' : 'black'}}>Show Records</button>
          <button onClick={() => setShowForm(true)} style={{...styles.filterButton, backgroundColor: showForm ? 'black' : 'white',color: showForm ? 'white' : 'black'}}>Fill Form</button>
        </div>

        {!showForm && (
          <div style={styles.buttonGroup}>
            <button
              onClick={() => handleFilter('approved')}
              style={{...styles.filterButton, backgroundColor: '#4CAF50', opacity: statusFilter === 'approved' ? 1 : 0.7}}
            >
              Approved
            </button>
            <button
              onClick={() => handleFilter('rejected')}
              style={{...styles.filterButton, backgroundColor: '#f44336', opacity: statusFilter === 'rejected' ? 1 : 0.7}}
            >
              Rejected
            </button>
            <button
              onClick={() => handleFilter('pending')}
              style={{...styles.filterButton, backgroundColor: '#ff9800', opacity: statusFilter === 'pending' ? 1 : 0.7}}
            >
              Pending
            </button>
          </div>
        )}

        <div style={styles.contentWrapper}>
          {showForm ? (
            <OPD />
          ) : (
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {['S.No', 'Referral Id','Dependent ID', 'Dependent Name', 'Relation', 'Date Created', 'Hospital', 'Status', 'Approved /Rejected Time', 'Approved/Rejected By', 'View'].map((header, index) => (
                      <th key={index} style={styles.tableHeader}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.length === 0 ? (
                    <tr>
                      <td colSpan="10" style={styles.noDataCell}>No data available</td>
                    </tr>
                  ) : (
                    currentRecords.map((record, index) => (
                      <tr key={record.referral_id} style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                        <td style={styles.tableCell}>{indexOfFirstRecord + index + 1}</td>
                        <td style={styles.tableCell}>{record.referral_id}</td>
                        <td style={styles.tableCell}>{record.dependent_id}</td>
                        <td style={styles.tableCell}>{record.dependent_name}</td>
                        <td style={styles.tableCell}>{record.relation_with_employee}</td>
                        <td style={styles.tableCell}>{new Date(record.created_at).toLocaleString()}</td>
                        <td style={styles.tableCell}>{record.hospital_name}</td>
                        <td style={styles.tableCell}>{getStatusDisplay(record.status)}</td>
                        <td style={styles.tableCell}>
                          {record.status === 'pending' ? 'N/A' : record.approved_rejected_at ? new Date(record.approved_rejected_at).toLocaleString() : 'N/A'}
                        </td>
                        <td style={styles.tableCell}>
                          {record.status === 'pending' ? 'N/A' : record.approved_rejected_by || 'N/A'}
                        </td>
                        <td style={styles.tableCell}>
                          {record.status === 'approved' && (
                            <button onClick={() => handleViewPdf(record.referral_id, record.tentative_visit_to)} style={styles.viewButton}>
                            <i className="fas fa-eye"></i>
                          </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          <div style={styles.pagination}>
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} style={styles.paginationButton}>◄</button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                style={{
                  ...styles.paginationButton,
                  ...(currentPage === index + 1 ? styles.activePaginationButton : {})
                }}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} style={styles.paginationButton}>►</button>
          </div>
        </div>
      </div>

      {showPdfModal && (
        <div style={styles.modalOverlay}>
          <div style={{...styles.modal, width: '90%', maxWidth: '1200px'}}>
            <h3 style={styles.modalTitle}>PDF Preview</h3>
            <div style={styles.pdfControls}>
              <button onClick={handleZoomIn} style={styles.pdfControlButton}>
                <i className="fas fa-search-plus"></i> Zoom In
              </button>
              <button onClick={handleZoomOut} style={styles.pdfControlButton}>
                <i className="fas fa-search-minus"></i> Zoom Out
              </button>
              <button onClick={handlePrint} style={styles.pdfControlButton}>
                <i className="fas fa-print"></i> Print
              </button>
            </div>
            <iframe 
              src={pdfUrl} 
              title="PDF Preview" 
              style={{
                ...styles.pdfPreview,
                transform: `scale(${pdfScale})`,
                transformOrigin: 'top left'
              }}
            ></iframe>
            <div style={styles.modalButtons}>
            <button 
          style={{...styles.modalButton, backgroundColor: isDownloadDisabled ? '#ccc' : '#4CAF50'}} 
          onClick={() => {
            if (!isDownloadDisabled) {
              const link = document.createElement('a');
              link.href = pdfUrl;
              link.download = ''; // You can specify a filename here if desired
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          }}
          disabled={isDownloadDisabled} // Optional
        >
          <i className="fas fa-download"></i> Download
        </button>
              <button style={{...styles.modalButton, backgroundColor: '#f44336'}} onClick={() => setShowPdfModal(false)}>
                <i className="fas fa-times"></i> Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  adminPage: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f0f0',
    minHeight: '100vh',
  },
  navbar: {
    backgroundColor: '#333',
    color: 'white',
    padding: '1rem',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  navbarTitle: {
    margin: 0,
    fontSize: '1.5rem',
  },
  contentWrapper: {
    padding: '1rem',
    maxWidth: '1200px',
    margin: '4rem auto 0',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: '1rem',
    marginTop: '1rem',
  },
  filterButton: {
    padding: '0.5rem 1rem',
    margin: '0.5rem',
    border: 'none',
    borderRadius: '4px',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  tableContainer: {
    overflowX: 'auto',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  table: {
    display: 'grid',
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#f8f8f8',
    color: '#333',
    padding: '1rem',
    textAlign: 'left',
    fontWeight: 'bold',
    borderBottom: '2px solid #ddd',
  },
  tableRowEven: {
    backgroundColor: '#ffffff',
  },
  tableRowOdd: {
    backgroundColor: '#f9f9f9',
  },
  tableCell: {
    padding: '0.75rem',
    borderBottom: '1px solid #ddd',
  },
  noDataCell: {
    padding: '1rem',
    textAlign: 'center',
    color: '#666',
  },
  statusBadge: {
    padding: '0.25rem 0.5rem',
    borderRadius: '12px',
    color: 'white',
    fontSize: '0.875rem',
    display: 'inline-block',
  },
  viewButton: {
    padding: '0.25rem 0.5rem',
    backgroundColor: '#2196F3',
    border: 'none',
    borderRadius: '4px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '0.875rem',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '1rem',
  },
  paginationButton: {
    padding: '0.5rem 0.75rem',
    margin: '0.25rem',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  activePaginationButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    border: '1px solid #2196F3',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    margin: '0 0 1rem 0',
    fontSize: '1.5rem',
    color: '#333',
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginTop: '1rem',
  },
  modalButton: {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '1rem',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  pdfPreview: {
    width: '100%',
    height: '70vh',
    border: 'none',
    marginBottom: '1rem',
  },
  pdfControls: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  },
  pdfControlButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.875rem',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '1.5rem',
    color: '#333',
  },
};