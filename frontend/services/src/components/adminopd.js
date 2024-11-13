import React, { useState } from 'react';

const AdminPage = () => {
    const records = [
        { id: 1, date: '2024-11-01', empId: 'EMP001', empName: 'John Doe', appliedFor: 'Leave', status: 'A', viewLink: 'sample.pdf' },
        { id: 2, date: '2024-11-02', empId: 'EMP002', empName: 'Jane Smith', appliedFor: 'Salary Advance', status: 'P', viewLink: 'sample.pdf' },
        { id: 3, date: '2024-11-03', empId: 'EMP003', empName: 'Emily Johnson', appliedFor: 'Promotion', status: 'R', viewLink: 'sample.pdf' },
        { id: 4, date: '2024-11-04', empId: 'EMP004', empName: 'Michael Brown', appliedFor: 'Transfer', status: 'A', viewLink: 'sample.pdf' },
        { id: 5, date: '2024-11-05', empId: 'EMP005', empName: 'Lisa White', appliedFor: 'Leave', status: 'P', viewLink: 'sample.pdf' },
        { id: 6, date: '2024-11-06', empId: 'EMP006', empName: 'Chris Green', appliedFor: 'Salary Advance', status: 'R', viewLink: 'sample.pdf' },
        { id: 7, date: '2024-11-07', empId: 'EMP007', empName: 'Patricia Black', appliedFor: 'Promotion', status: 'A', viewLink: 'sample.pdf' },
        { id: 8, date: '2024-11-08', empId: 'EMP008', empName: 'Robert White', appliedFor: 'Leave', status: 'A', viewLink: 'sample.pdf' },
        { id: 9, date: '2024-11-09', empId: 'EMP009', empName: 'Emily Brown', appliedFor: 'Salary Advance', status: 'P', viewLink: 'sample.pdf' },
        { id: 10, date: '2024-11-10', empId: 'EMP010', empName: 'John Black', appliedFor: 'Promotion', status: 'R', viewLink: 'sample.pdf' },
        { id: 11, date: '2024-11-11', empId: 'EMP011', empName: 'Susan Doe', appliedFor: 'Transfer', status: 'A', viewLink: 'sample.pdf' },
        { id: 12, date: '2024-11-12', empId: 'EMP012', empName: 'Jake White', appliedFor: 'Leave', status: 'P', viewLink: 'sample.pdf' },
        { id: 13, date: '2024-11-13', empId: 'EMP013', empName: 'Paul Green', appliedFor: 'Salary Advance', status: 'R', viewLink: 'sample.pdf' },
        { id: 14, date: '2024-11-14', empId: 'EMP014', empName: 'Emma Brown', appliedFor: 'Promotion', status: 'A', viewLink: 'sample.pdf' },
        { id: 15, date: '2024-11-15', empId: 'EMP015', empName: 'Lucy Black', appliedFor: 'Leave', status: 'A', viewLink: 'sample.pdf' },
        { id: 16, date: '2024-11-16', empId: 'EMP016', empName: 'Derek White', appliedFor: 'Salary Advance', status: 'P', viewLink: 'sample.pdf' },
        { id: 17, date: '2024-11-17', empId: 'EMP017', empName: 'Alex Brown', appliedFor: 'Promotion', status: 'R', viewLink: 'sample.pdf' },
        { id: 18, date: '2024-11-18', empId: 'EMP018', empName: 'Rachel Green', appliedFor: 'Transfer', status: 'A', viewLink: 'sample.pdf' },
        { id: 19, date: '2024-11-19', empId: 'EMP019', empName: 'Tom Black', appliedFor: 'Leave', status: 'P', viewLink: 'sample.pdf' },
        { id: 20, date: '2024-11-20', empId: 'EMP020', empName: 'Sara White', appliedFor: 'Salary Advance', status: 'R', viewLink: 'sample.pdf' },
    ];

    const [filteredStatus, setFilteredStatus] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRow, setSelectedRow] = useState(null);
    const recordsPerPage = 10;

    // New state for dialogs
    const [showApproveDialog, setShowApproveDialog] = useState(false);
    const [showRejectDialog, setShowRejectDialog] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const handleStatusFilter = (status) => {
        setFilteredStatus(status);
        setCurrentPage(1);
    };

    const handleApproveClick = (record, e) => {
        e.stopPropagation(); // Prevent row selection
        setSelectedRecord(record);
        setShowApproveDialog(true);
    };

    const handleRejectClick = (record, e) => {
        e.stopPropagation(); // Prevent row selection
        setSelectedRecord(record);
        setShowRejectDialog(true);
    };

    const handleConfirmApprove = () => {
        // Handle approve logic here
        console.log('Approved:', selectedRecord);
        setShowApproveDialog(false);
        setSelectedRecord(null);
    };

    const handleConfirmReject = () => {
        // Handle reject logic here
        console.log('Rejected:', selectedRecord);
        setShowRejectDialog(false);
        setSelectedRecord(null);
    };

    const filteredRecords = filteredStatus === 'All'
        ? records
        : records.filter(record => record.status === filteredStatus);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

    return (
        <div className="admin-page">
            <style>{`
                .navbar {
                    background-color: #333;
                    color: white;
                    padding: 10px;
                    text-align: center;
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                }
                .navbar h2 {
                    margin: 0;
                }
                .button-group {
                    display: flex;
                    justify-content: center;
                    margin: 0;
                    position: absolute;
                    top: 50px;
                    left: 0;
                    right: 0;
                    background-color: #f8f9fa;
                    z-index: 999;
                    padding: 10px 0;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .button-group button {
                    background-color: #007bff;
                    color: white;
                    padding: 10px 20px;
                    margin: 0 10px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .content-wrapper {
                    padding-top: 110px;
                    margin: 0 auto;
                    max-width: 95%;
                }
                .table-container {
                    position: relative;
                    max-height: calc(100vh - 200px);
                    overflow-y: auto;
                    margin-top: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .table {
                    width: 100%;
                    border-collapse: collapse;
                    background-color: white;
                }
                .table thead {
                    position: sticky;
                    top: 0;
                    z-index: 1;
                }
                .table th {
                    background-color: #f5f5f5;
                    color: #333;
                    padding: 15px;
                    text-align: center;
                    font-weight: 600;
                    border-bottom: 2px solid #dee2e6;
                }
                .table tbody td {
                    padding: 12px;
                    text-align: center;
                    border-bottom: 1px solid #dee2e6;
                }
                .table tbody tr {
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                .table tbody tr:hover {
                    background-color: #f8f9fa;
                }
                .table tbody tr.selected {
                    background-color: #e0f7fa;
                }
                .status-button {
                    padding: 6px 12px;
                    border-radius: 50px;
                    color: white;
                    border: none;
                    cursor: default;
                    font-size: 0.875rem;
                }
                .status-approved {
                    background-color: #28a745;
                }
                .status-rejected {
                    background-color: #dc3545;
                }
                .status-pending {
                    background-color: #ffc107;
                    color: #000;
                }
                .action-buttons button {
                    font-size: 16px;
                    padding: 6px 12px;
                    margin: 2px;
                    cursor: pointer;
                    border-radius: 50px;
                    color: white;
                    border: none;
                    transition: opacity 0.2s;
                }
                .action-buttons button:hover {
                    opacity: 0.8;
                }
                .action-buttons .approve {
                    background-color: #28a745;
                }
                .action-buttons .reject {
                    background-color: #dc3545;
                }
                .pagination {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 20px 0;
                    gap: 5px;
                }
                .pagination button {
                    background-color: #f8f9fa;
                    color: #007bff;
                    padding: 8px 12px;
                    border: 1px solid #dee2e6;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .pagination button:hover {
                    background-color: #e9ecef;
                }
                .pagination .active {
                    background-color: #007bff;
                    color: white;
                    border-color: #007bff;
                }

                /* Dialog Styles */
                .dialog-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }

                .dialog {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    width: 400px;
                    max-width: 90%;
                }

                .dialog h3 {
                    margin-top: 0;
                    color: #333;
                }

                .dialog-buttons {
                    display: flex;
                    justify-content: flex-end;
                    gap: 10px;
                    margin-top: 20px;
                }

                .dialog-buttons button {
                    padding: 8px 16px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: 500;
                }

                .dialog-buttons .confirm {
                    background-color: #007bff;
                    color: white;
                }

                .dialog-buttons .cancel {
                    background-color: #6c757d;
                    color: white;
                }
            `}</style>

            <nav className="navbar">
                <h2>Admin Dashboard</h2>
            </nav>

            <div className="button-group">
                <button onClick={() => handleStatusFilter('All')}>Records</button>
                <button onClick={() => handleStatusFilter('A')}>Approved</button>
                <button onClick={() => handleStatusFilter('R')}>Rejected</button>
                <button onClick={() => handleStatusFilter('P')}>Pending</button>
            </div>

            <div className="content-wrapper">
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Date</th>
                                <th>Emp ID</th>
                                <th>Emp Name</th>
                                <th>Applied For</th>
                                <th>Status</th>
                                <th>View</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRecords.map((record, index) => (
                                <tr
                                    key={record.id}
                                    onClick={() => setSelectedRow(record.id)}
                                    className={selectedRow === record.id ? 'selected' : ''}
                                >
                                    <td>{index + 1 + (currentPage - 1) * recordsPerPage}</td>
                                    <td>{record.date}</td>
                                    <td>{record.empId}</td>
                                    <td>{record.empName}</td>
                                    <td>{record.appliedFor}</td>
                                    <td>
                                        {record.status === 'A' && <button className="status-button status-approved">Approved</button>}
                                        {record.status === 'R' && <button className="status-button status-rejected">Rejected</button>}
                                        {record.status === 'P' && <button className="status-button status-pending">Pending</button>}
                                    </td>
                                    <td>
                                        <a href={record.viewLink} target="_blank" rel="noopener noreferrer">PDF</a>
                                    </td>
                                    <td className="action-buttons">
                                        {record.status === 'P' ? (
                                            <>
                                                <button className="approve" onClick={(e) => handleApproveClick(record, e)}>✓</button>
                                                <button className="reject" onClick={(e) => handleRejectClick(record, e)}>✗</button>
                                            </>
                                        ) : (
                                            '-'
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="pagination">
                    <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>◄</button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={currentPage === index + 1 ? 'active' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>►</button>
                </div>
            </div>

            {/* Approve Dialog */}
            {showApproveDialog && (
                <div className="dialog-overlay">
                    <div className="dialog">
                        <h3>Confirm Approval</h3>
                        <p>Do you want to approve this request?</p>
                        <div className="dialog-buttons">
                            <button className="cancel" onClick={() => setShowApproveDialog(false)}>Cancel</button>
                            <button className="confirm" onClick={handleConfirmApprove}>Approve</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reject Dialog */}
            {showRejectDialog && (
                <div className="dialog-overlay">
                    <div className="dialog">
                        <h3>Confirm Rejection</h3>
                        <p>Do you want to reject this request?</p>
                        <div className="dialog-buttons">
                            <button className="cancel" onClick={() => setShowRejectDialog(false)}>Cancel</button>
                            <button className="confirm" onClick={handleConfirmReject}>Reject</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;