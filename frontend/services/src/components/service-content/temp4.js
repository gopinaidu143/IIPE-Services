import React, { useState, useEffect } from "react";
import axios from "axios";

const EmailRequisitionForm = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    program: "",
    department: "",
    person_email: "",
    contact_no: "",
    emergency_contact: "",
    hostler_dayscholar: "",
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
      .post("/api/email-requisition/", formData) // Adjust the API endpoint as needed
      .then((response) => {
        setMessage("Email requisition submitted successfully!");
        setFormData({
          name: "",
          program: "",
          department: "",
          person_email: "",
          contact_no: "",
          emergency_contact: "",
          hostler_dayscholar: "",
        });
      })
      .catch((error) => {
        setMessage("Failed to submit email requisition.");
        console.error("Error submitting form:", error);
      });
  };

  return (
    <div className="email-requisition-form">
      <h2>Email Requisition Form</h2>
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
          <label>Personal Email:</label>
          <input
            type="email"
            name="person_email"
            value={formData.person_email}
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
          <label>Emergency Contact:</label>
          <input
            type="text"
            name="emergency_contact"
            value={formData.emergency_contact}
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EmailRequisitionForm;
