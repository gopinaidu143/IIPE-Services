import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const AdminPage = () => {
    const [records, setRecords] = useState([]);
    const [filteredStatus, setFilteredStatus] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const { authTokens } = useContext(AuthContext);
    const [showApproveDialog, setShowApproveDialog] = useState(false);
    const [showRejectDialog, setShowRejectDialog] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [showPdfModal, setShowPdfModal] = useState(false);
    const [pdfScale, setPdfScale] = useState(1);

    const fetchRecords = async () => {
        try {
            const response = await axios.get('/api/admin-opdforms/', {
                headers: {
                    Authorization: `Bearer ${authTokens}`,
                },
                withCredentials: true,
            });
            setRecords(response.data);
        } catch (error) {
            console.error("Error fetching records:", error);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, [authTokens]);

    const handleStatusFilter = (status) => {
        setFilteredStatus(prevStatus => (prevStatus === status ? null : status));
        setCurrentPage(1);
    };

    const filteredRecords = filteredStatus
        ? records.filter(record => record.status === filteredStatus)
        : records;

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

    const handleApprove = async (record) => {
        try {
            await axios.post(`/api/admin-opdforms/${record.referral_id}/approve/`, {}, {
                headers: {
                    Authorization: `Bearer ${authTokens}`,
                },
            });
            setShowApproveDialog(false);
            fetchRecords();
        } catch (error) {
            console.error("Error approving record:", error);
        }
    };

    const handleReject = async (record) => {
        try {
            await axios.post(`/api/admin-opdforms/${record.referral_id}/reject/`, {}, {
                headers: {
                    Authorization: `Bearer ${authTokens}`,
                },
            });
            setShowRejectDialog(false);
            fetchRecords();
        } catch (error) {
            console.error("Error rejecting record:", error);
        }
    };

    const handleViewPdf = async (referralId) => {
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
        } catch (error) {
            console.error('Error fetching PDF:', error);
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

    return (
        <div style={styles.adminPage}>
            {/* <nav style={styles.navbar}>
                <h2 style={styles.navbarTitle}>Admin Dashboard</h2>
            </nav> */}

            <div style={styles.buttonGroup}>
                <button onClick={() => handleStatusFilter('approved')} style={{...styles.filterButton, backgroundColor: '#4CAF50'}}>Approved</button>
                <button onClick={() => handleStatusFilter('rejected')} style={{...styles.filterButton, backgroundColor: '#f44336'}}>Rejected</button>
                <button onClick={() => handleStatusFilter('pending')} style={{...styles.filterButton, backgroundColor: '#ff9800'}}>Pending</button>
            </div>

            <div style={styles.contentWrapper}>
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                {['Referral ID', 'Dependent ID', 'Dependent Name', 'Relation', 'Created At', 'Hospital Name', 'Status', 'Action', 'View'].map((header, index) => (
                                    <th key={index} style={styles.tableHeader}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentRecords.length === 0 ? (
                                <tr>
                                    <td colSpan="9" style={styles.noDataCell}>No data available</td>
                                </tr>
                            ) : (
                                currentRecords.map((record, index) => (
                                    <tr key={record.referral_id} style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                                        <td style={styles.tableCell}>{record.referral_id}</td>
                                        <td style={styles.tableCell}>{record.dependent_id}</td>
                                        <td style={styles.tableCell}>{record.dependent_name}</td>
                                        <td style={styles.tableCell}>{record.relation_with_employee}</td>
                                        <td style={styles.tableCell}>{new Date(record.created_at).toLocaleString()}</td>
                                        <td style={styles.tableCell}>{record.hospital_name}</td>
                                        <td style={styles.tableCell}>
                                            <span style={{
                                                ...styles.statusButton,
                                                backgroundColor: record.status === 'approved' ? '#4CAF50' :
                                                                 record.status === 'rejected' ? '#f44336' : '#ff9800'
                                            }}>
                                                {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                                            </span>
                                        </td>
                                        <td style={styles.tableCell}>
                                            {record.status === 'pending' && (
                                                <div style={styles.actionButtons}>
                                                    <button onClick={() => { setShowApproveDialog(true); setSelectedRecord(record); }} style={{...styles.actionButton, backgroundColor: '#4CAF50'}}>
                                                        <i className="fas fa-check"></i>
                                                    </button>
                                                    <button onClick={() => { setShowRejectDialog(true); setSelectedRecord(record); }} style={{...styles.actionButton, backgroundColor: '#f44336'}}>
                                                        <i className="fas fa-times"></i>
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                        <td style={styles.tableCell}>
                                            {record.status === 'approved' && (
                                                <button onClick={() => handleViewPdf(record.referral_id)} style={styles.viewButton}>
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

            {showApproveDialog && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <h3 style={styles.modalTitle}>Approve Record</h3>
                        <p style={styles.modalText}>Are you sure you want to approve this record?</p>
                        <div style={styles.modalButtons}>
                            <button style={{...styles.modalButton, backgroundColor: '#4CAF50'}} onClick={() => handleApprove(selectedRecord)}>
                                <i className="fas fa-check"></i> Yes
                            </button>
                            <button style={{...styles.modalButton, backgroundColor: '#f44336'}} onClick={() => setShowApproveDialog(false)}>
                                <i className="fas fa-times"></i> No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showRejectDialog && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <h3 style={styles.modalTitle}>Reject Record</h3>
                        <p style={styles.modalText}>Are you sure you want to reject this record?</p>
                        <div style={styles.modalButtons}>
                            <button style={{...styles.modalButton, backgroundColor: '#f44336'}} onClick={() => handleReject(selectedRecord)}>
                                <i className="fas fa-check"></i> Yes
                            </button>
                            <button style={{...styles.modalButton, backgroundColor: '#4CAF50'}} onClick={() => setShowRejectDialog(false)}>
                                <i className="fas fa-times"></i> No
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
              <a href={pdfUrl} download style={{...styles.modalButton, backgroundColor: '#4CAF50'}}>
                <i className="fas fa-download"></i> Download
              </a>
              <button style={{...styles.modalButton, backgroundColor: '#f44336'}} onClick={() => setShowPdfModal(false)}>
                <i className="fas fa-times"></i> Close
              </button>
            </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    adminPage: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f0f0f0',
        minHeight: '100vh',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '1rem',
        marginTop: '4rem',
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
    contentWrapper: {
        padding: '1rem',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    tableContainer: {
        overflowX: 'auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    table: {
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
    statusButton: {
        padding: '0.25rem 0.5rem',
        borderRadius: '4px',
        color: 'white',
        fontSize: '0.875rem',
        display: 'inline-block',
    },
    actionButtons: {
        display: 'flex',
        justifyContent: 'center',
        gap: '0.5rem',
    },
    actionButton: {
        padding: '0.25rem 0.5rem',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        cursor: 'pointer',
        fontSize: '0.875rem',
    },
    viewButton: {
        padding 
: '0.25rem 0.5rem',
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
        maxWidth: '400px',
        width: '100%',
    },
    modalTitle: {
        margin: '0 0 1rem 0',
        fontSize: '1.5rem',
        color: '#333',
    },
    modalText: {
        marginBottom: '1rem',
        color: '#666',
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
        textDecoration: 'None',
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
};

export default AdminPage;

