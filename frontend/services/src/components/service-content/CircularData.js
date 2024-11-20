import React from "react";
import circulars from "../../assets/circulars.jpg";
export default function Component() {
  // Simulated data structure for the backend data
  const [circularData, setCircularData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.contentWrapper}>
          <h1 style={styles.heading}>Circulars</h1>
        </div>

        <div style={styles.decorativePattern}></div>
      </div>

      {/* Data Table Section */}
      <div style={styles.tableSection}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Circular No.</th>
              <th style={styles.tableHeader}>Date</th>
              <th style={styles.tableHeader}>Subject</th>
              <th style={styles.tableHeader}>Department</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" style={styles.loadingCell}>
                  Loading circulars...
                </td>
              </tr>
            ) : circularData.length === 0 ? (
              <tr>
                <td colSpan="5" style={styles.emptyCell}>
                  No circulars available
                </td>
              </tr>
            ) : (
              circularData.map((circular) => (
                <tr key={circular.id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{circular.number}</td>
                  <td style={styles.tableCell}>{circular.date}</td>
                  <td style={styles.tableCell}>{circular.subject}</td>
                  <td style={styles.tableCell}>{circular.department}</td>
                  <td style={styles.tableCell}>
                    <button style={styles.viewButton}>View</button>
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
    backgroundColor: "white",
  },
  hero: {
    position: "relative",
    height: "200px",
    width: "100%",
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
    background: `url(${circulars})`,
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
};
