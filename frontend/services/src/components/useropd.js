import React, { useState } from 'react';
import OPD from './OPD';

const UserOPD = () => {
  const [showForm, setShowForm] = useState(false);
  const [showRecords, setShowRecords] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState(null);
  

  const records = [
    { id: 1, date: '2024-11-01', name: 'Alice Smith', appliedFor: 'Service A', hospital: 'Hospital X', status: 'a', arTime: '10:00 AM', arBy: 'Admin' },
    { id: 2, date: '2024-11-02', name: 'Bob Johnson', appliedFor: 'Service B', hospital: 'Hospital Y', status: 'p', arTime: '11:00 AM', arBy: 'Admin' },
    { id: 3, date: '2024-11-03', name: 'Charlie Brown', appliedFor: 'Service C', hospital: 'Hospital Z', status: 'r', arTime: '12:00 PM', arBy: 'User' },
    { id: 4, date: '2024-11-04', name: 'Diana Prince', appliedFor: 'Service D', hospital: 'Hospital X', status: 'a', arTime: '01:00 PM', arBy: 'Admin' },
    { id: 5, date: '2024-11-05', name: 'Evan Green', appliedFor: 'Service E', hospital: 'Hospital Y', status: 'p', arTime: '02:00 PM', arBy: 'User' },
    { id: 6, date: '2024-11-06', name: 'Fiona White', appliedFor: 'Service F', hospital: 'Hospital Z', status: 'r', arTime: '03:00 PM', arBy: 'Admin' },
    { id: 7, date: '2024-11-07', name: 'George King', appliedFor: 'Service G', hospital: 'Hospital X', status: 'a', arTime: '04:00 PM', arBy: 'User' },
    { id: 8, date: '2024-11-08', name: 'Hannah Lee', appliedFor: 'Service H', hospital: 'Hospital Y', status: 'p', arTime: '05:00 PM', arBy: 'Admin' },
    { id: 9, date: '2024-11-09', name: 'Ian Black', appliedFor: 'Service I', hospital: 'Hospital Z', status: 'r', arTime: '06:00 PM', arBy: 'User' },
    { id: 10, date: '2024-11-10', name: 'Jane Doe', appliedFor: 'Service J', hospital: 'Hospital X', status: 'a', arTime: '07:00 PM', arBy: 'Admin' },
    { id: 11, date: '2024-11-11', name: 'Kevin Brown', appliedFor: 'Service K', hospital: 'Hospital Y', status: 'p', arTime: '08:00 PM', arBy: 'User' },
    { id: 12, date: '2024-11-12', name: 'Laura Smith', appliedFor: 'Service L', hospital: 'Hospital Z', status: 'r', arTime: '09:00 AM', arBy: 'Admin' },
    { id: 13, date: '2024-11-13', name: 'Michael Johnson', appliedFor: 'Service M', hospital: 'Hospital X', status: 'a', arTime: '10:30 AM', arBy: 'User' },
    { id: 14, date: '2024-11-14', name: 'Nancy King', appliedFor: 'Service N', hospital: 'Hospital Y', status: 'p', arTime: '11:30 AM', arBy: 'Admin' },
    { id: 15, date: '2024-11-15', name: 'Oscar Lee', appliedFor: 'Service O', hospital: 'Hospital Z', status: 'r', arTime: '12:30 PM', arBy: 'User' },
    { id: 16, date: '2024-11-16', name: 'Paula Green', appliedFor: 'Service P', hospital: 'Hospital X', status: 'a', arTime: '01:30 PM', arBy: 'Admin' },
    { id: 17, date: '2024-11-17', name: 'Quincy White', appliedFor: 'Service Q', hospital: 'Hospital Y', status: 'p', arTime: '02:30 PM', arBy: 'User' },
    { id: 18, date: '2024-11-18', name: 'Rachel Black', appliedFor: 'Service R', hospital: 'Hospital Z', status: 'r', arTime: '03:30 PM', arBy: 'Admin' },
    { id: 19, date: '2024-11-19', name: 'Steve Brown', appliedFor: 'Service S', hospital: 'Hospital X', status: 'a', arTime: '04:30 PM', arBy: 'User' },
    { id: 20, date: '2024-11-20', name: 'Tina Smith', appliedFor: 'Service T', hospital: 'Hospital Y', status: 'p', arTime: '05:30 PM', arBy: 'Admin' },
    { id: 21, date: '2024-11-21', name: 'Uma King', appliedFor: 'Service U', hospital: 'Hospital Z', status: 'r', arTime: '06:30 PM', arBy: 'User' },
    { id: 22, date: '2024-11-22', name: 'Victor Lee', appliedFor: 'Service V', hospital: 'Hospital X', status: 'a', arTime: '07:30 PM', arBy: 'Admin' },
    { id: 23, date: '2024-11-23', name: 'Wendy White', appliedFor: 'Service W', hospital: 'Hospital Y', status: 'p', arTime: '08:30 PM', arBy: 'User' },
    { id: 24, date: '2024-11-24', name: 'Xander Black', appliedFor: 'Service X', hospital: 'Hospital Z', status: 'r', arTime: '09:30 PM', arBy: 'Admin' },
    { id: 25, date: '2024-11-25', name: 'Yara Green', appliedFor: 'Service Y', hospital: 'Hospital X', status: 'a', arTime: '10:30 PM', arBy: 'User' },
    { id: 26, date: '2024-11-26', name: 'Zane Brown', appliedFor: 'Service Z', hospital: 'Hospital Y', status: 'p', arTime: '11:30 PM', arBy: 'Admin' },
    { id: 27, date: '2024-11-27', name: 'Ava Smith', appliedFor: 'Service AA', hospital: 'Hospital Z', status: 'r', arTime: '08:00 AM', arBy: 'User' },
    { id: 28, date: '2024-11-28', name: 'Ben Johnson', appliedFor: 'Service AB', hospital: 'Hospital X', status: 'a', arTime: '09:00 AM', arBy: 'Admin' },
    { id: 29, date: '2024-11-29', name: 'Cindy Lee', appliedFor: 'Service AC', hospital: 'Hospital Y', status: 'p', arTime: '10:00 AM', arBy: 'User' },
    { id: 30, date: '2024-11-30', name: 'Dan White', appliedFor: 'Service AD', hospital: 'Hospital Z', status: 'r', arTime: '11:00 AM', arBy: 'Admin' },
  ];
  
  const recordsPerPage = 10;
  const filteredRecords = statusFilter
    ? records.filter((record) => record.status === statusFilter)
    : records;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleFilter = (status) => {
    setStatusFilter(status === statusFilter ? null : status);
    setCurrentPage(1);
  };

  const getStatusDisplay = (status) => {
    switch (status) {
      case 'a':
        return <span className="status-badge accepted">Accepted</span>;
      case 'p':
        return <span className="status-badge pending">Pending</span>;
      case 'r':
        return <span className="status-badge rejected">Rejected</span>;
      default:
        return status;
    }
  };
  const handleShowForm = () => {
    setShowForm(true);
    setShowRecords(false);
  };

  const handleShowRecords = () => {
    setShowRecords(true);
    setShowForm(false);
  };
  
  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          line-height: 1.6;
        }
        
        .app {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        
        .navbar {
          background-color: #333;
          color: #fff;
          padding: 15px;
          text-align: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .navbar h1 {
          margin: 0;
          font-size: 24px;
        }
        
        .content {
          margin: 20px auto;
          padding: 20px;
          width: 95%;
          max-width: 1400px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          flex-grow: 1;
        }
        
        .top-section {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 20px;
        }
        
        .action-buttons, .filter-buttons {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 10px;
          // padding:30 px;
        }
        
        button {
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          border: none;
          background-color: #e0e0e0;
          border-radius: 4px;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        
        button:hover {
          background-color: #d5d5d5;
        }
        
        button.active {
          background-color: #1976D2;
          color: #fff;
        }
        
        .filter-btn.accepted {
          background-color: #4CAF50;
          color: #fff;
        }
        
        .filter-btn.pending {
          background-color: #FFC107;
          color: #fff;
        }
        
        .filter-btn.rejected {
          background-color: #F44336;
          color: #fff;
        }
        
        .filter-btn.active {
          opacity: 0.8;
        }
        
        .status-badge {
          padding: 8px 12px;
          border-radius: 12px;
          color: #fff;
          font-weight: bold;
          text-transform: uppercase;
          font-size: 12px;
          display: inline-block;
        }
        
        .status-badge.accepted {
          background-color: #4CAF50;
        }
        
        .status-badge.pending {
          background-color: #FFC107;
        }
        
        .status-badge.rejected {
          background-color: #F44336;
        }
        
        .table-container {
          margin-top: 20px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
        }
        
        /* Desktop View */
        @media (min-width: 600px) {
          .table-container {
            max-height: calc(100vh - 300px);
            overflow-y: auto;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
          }
          
          thead {
            position: sticky;
            top: 0;
            z-index: 1;
          }
          
          th {
            background-color: #f5f5f5;
            padding: 12px 15px;
            text-align: center;
            border-bottom: 2px solid #ddd;
            font-weight: 600;
          }
          
          td {
            padding: 12px 10px;
            background-color: #fff;
            border-bottom: 1px solid #e0e0e0;
            vertical-align: middle;
            text-align: center;
          }
          
          tbody tr:last-child td {
            border-bottom: none;
          }
          
          tbody tr:hover td {
            background-color: #f8f8f8;
          }
        }
        
        /* Mobile View */
        @media (max-width: 768px) {
          .content {
            width: 98%;
            padding: 10px;
          }
          
          table, thead, tbody, th, td, tr {
            display: block;
          }
          
          thead tr {
            position: absolute;
            top: -9999px;
            left: -9999px;
          }
          
          tr {
            margin-bottom: 15px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            background-color: #fff;
          }
          
          td {
            position: relative;
            padding: 15px 10px 15px 50%;
            text-align: left;
            border-bottom: 1px solid #eee;
            min-height: 50px;
            display: flex;
            align-items: center;
          }
          
          td:last-child {
            border-bottom: none;
          }
          
          td:before {
            position: absolute;
            left: 10px;
            width: 45%;
            padding-right: 10px;
            white-space: nowrap;
            font-weight: bold;
            content: attr(data-label);
          }
        }
        
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-top: 20px;
          flex-wrap: wrap;
          padding: 10px;
        }
        
        .pagination button {
          padding: 8px 12px;
          font-size: 14px;
          min-width: 40px;
        }
        
        .pagination button:disabled {
          background-color: #f0f0f0;
          color: #ccc;
          cursor: not-allowed;
        }
        
        @media (max-width: 480px) {
          .navbar h1 {
            font-size: 20px;
          }
          
          button {
            padding: 8px 16px;
            font-size: 14px;
          }
          
          .pagination button {
            padding: 6px 10px;
            font-size: 12px;
            min-width: 35px;
          }
        }
      `}</style>

<div className="top-section">


            <div className="action-buttons">
                <button onClick={handleShowRecords}>Show Records</button> {/* New button to show records */}
                <button onClick={handleShowForm}>Fill Form</button> {/* Existing button to fill form */}
            </div>
            
            {/* {showRecords ? (
                <div>
                    <h2>Records</h2>
                </div>
            ) : (
                <OPD />
            )} */}
        </div>

        
     
        <div className="content">
          {showForm ? (
            <OPD />
          ) : (
        
            <>
              <div className="top-section">
                <div className="filter-buttons">
                  <button
                    className={`filter-btn accepted ${statusFilter === 'a' ? 'active' : ''}`}
                    onClick={() => handleFilter('a')}
                  >
                    Accepted
                  </button>
                  <button
                    className={`filter-btn pending ${statusFilter === 'p' ? 'active' : ''}`}
                    onClick={() => handleFilter('p')}
                  >
                    Pending
                  </button>
                  <button
                    className={`filter-btn rejected ${statusFilter === 'r' ? 'active' : ''}`}
                    onClick={() => handleFilter('r')}
                  >
                    Rejected
                  </button>
                </div>
              </div>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Date</th>
                      <th>Name</th>
                      <th>Applied For</th>
                      <th>Hospital</th>
                      <th>Status</th>
                      <th>AR Time</th>
                      <th>AR By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRecords.map((record, index) => (
                      <tr key={record.id}>
                        <td data-label="S.No">{indexOfFirstRecord + index + 1}</td>
                        <td data-label="Date">{record.date}</td>
                        <td data-label="Name">{record.name}</td>
                        <td data-label="Applied For">{record.appliedFor}</td>
                        <td data-label="Hospital">{record.hospital}</td>
                        <td data-label="Status">{getStatusDisplay(record.status)}</td>
                        <td data-label="AR Time">{record.arTime}</td>
                        <td data-label="AR By">{record.arBy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pagination">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                  ◄
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    className={currentPage === index + 1 ? 'active' : ''}
                  >
                    {index + 1}
                  </button>
                ))}
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                  ►
                </button>
              </div>

            </>
          )}
        </div>
      
      
    </>
  );
};

export default UserOPD;