import React, { useState, useEffect } from "react";
import memos from "../../assets/memos.jpg";

export default function OfficeMemo() {
  const [memosData, setMemosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMemos();
  }, []);

  const fetchMemos = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/memos");
      if (!response.ok) {
        throw new Error("Failed to fetch memos");
      }
      const data = await response.json();
      setMemosData(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <div style={styles.contentWrapper}>
          <h1 style={styles.heading}>Office Memos</h1>
        </div>

        <div style={styles.decorativePattern}></div>
      </div>

      <div style={styles.tableSection}>
        {error && <div style={styles.errorMessage}>{error}</div>}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Subject</th>
              <th style={styles.tableHeader}>Date</th>
              <th style={styles.tableHeader}>From</th>
              <th style={styles.tableHeader}>To</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" style={styles.loadingCell}>
                  Loading memos...
                </td>
              </tr>
            ) : memosData.length === 0 ? (
              <tr>
                <td colSpan="5" style={styles.emptyCell}>
                  No memos available
                </td>
              </tr>
            ) : (
              memosData.map((memo) => (
                <tr key={memo.id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{memo.subject}</td>
                  <td style={styles.tableCell}>{memo.date}</td>
                  <td style={styles.tableCell}>{memo.from}</td>
                  <td style={styles.tableCell}>{memo.to}</td>
                  <td style={styles.tableCell}>
                    <button style={styles.viewButton}>View Memo</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    maxWidth: "100vw",
    backgroundColor: "white",
  },
  hero: {
    position: "relative",
    height: "200px",
    background: "#2c3e50",
    color: "white",
    overflow: "hidden",
  },
  contentWrapper: {
    position: "relative",
    padding: "60px 40px",
    zIndex: 1,
  },
  heading: {
    fontSize: "48px",
    fontWeight: "bold",
    margin: 0,
  },
  decorativePattern: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "60%",
    height: "100%",
    backgroundImage: `url(${memos})`,
    opacity: 0.6,
  },
  tableSection: {
    padding: "40px",
  },
  table: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    borderCollapse: "collapse",
  },
  tableHeader: {
    padding: "16px",
    textAlign: "left",
    borderBottom: "2px solid #eee",
    backgroundColor: "#f8f9fa",
    fontWeight: "bold",
  },
  tableRow: {
    borderBottom: "1px solid #eee",
  },
  tableCell: {
    padding: "16px",
  },
  loadingCell: {
    padding: "32px",
    textAlign: "center",
    color: "#666",
  },
  emptyCell: {
    padding: "32px",
    textAlign: "center",
    color: "#666",
  },
  viewButton: {
    padding: "6px 16px",
    backgroundColor: "#0056b3",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  errorMessage: {
    color: "red",
    marginBottom: "20px",
    textAlign: "center",
  },
};
