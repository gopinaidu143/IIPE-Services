import React, { useState, useEffect } from "react";
import axios from "axios";

const SoftwareRequisitionForm = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    program: "",
    roll_no: "",
    department: "",
    email: "",
    contact_no: "",
    hostler_dayscholar: "",
    purpose: "",
    remote_access: "",
    choosen_os: "",
    from_date: "",
    to_date: "",
  });
  const [message, setMessage] = useState("");

  // Fetch departments when the component loads
  useEffect(() => {
    axios
      .get("/api/departments/") // Adjust the API endpoint as needed
      .then((response) => {
        setDepartments(response.data.departments);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/software-requisition/", formData) // Adjust the API endpoint as needed
      .then((response) => {
        setMessage("Software requisition submitted successfully!");
        setFormData({
          name: "",
          program: "",
          roll_no: "",
          department: "",
          email: "",
          contact_no: "",
          hostler_dayscholar: "",
          purpose: "",
          remote_access: "",
          choosen_os: "",
          from_date: "",
          to_date: "",
        });
      })
      .catch((error) => {
        setMessage("Failed to submit software requisition.");
        console.error("Error submitting form:", error);
      });
  };

  return (
    <div className="software-requisition-form">
      <h2>Software Requisition Form</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Program:</label>
          <input
            type="text"
            name="program"
            value={formData.program}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Roll Number:</label>
          <input
            type="text"
            name="roll_no"
            value={formData.roll_no}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Department:</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select a department</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contact Number:</label>
          <input
            type="text"
            name="contact_no"
            value={formData.contact_no}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Hostler/Dayscholar:</label>
          <select
            name="hostler_dayscholar"
            value={formData.hostler_dayscholar}
            onChange={handleChange}
            required
          >
            <option value="">Select an option</option>
            <option value="Hostler">Hostler</option>
            <option value="Dayscholar">Dayscholar</option>
          </select>
        </div>
        <div>
          <label>Purpose:</label>
          <textarea
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Remote Access:</label>
          <input
            type="text"
            name="remote_access"
            value={formData.remote_access}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Chosen OS:</label>
          <input
            type="text"
            name="choosen_os"
            value={formData.choosen_os}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>From Date:</label>
          <input
            type="date"
            name="from_date"
            value={formData.from_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>To Date:</label>
          <input
            type="date"
            name="to_date"
            value={formData.to_date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SoftwareRequisitionForm;
