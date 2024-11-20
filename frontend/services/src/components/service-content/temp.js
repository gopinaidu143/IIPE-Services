import React, { useState, useEffect } from "react";
import axios from "axios";

const CircularForm = () => {
  const [formData, setFormData] = useState({
    c_type: "",
    publish_id: "",
    date: "",
    issued_by: "", // Stores the selected department
    subject: "",
    uploaded_by: "",
    is_published: false,
    access_to: [], // Stores multiple selected roles
    view_pdf: null,
  });

  const [departments, setDepartments] = useState([]); // Stores fetched departments

  // Fetch departments on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("/api/departments/");
        setDepartments(response.data.departments);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "access_to") {
      const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
      setFormData((prev) => ({
        ...prev,
        [name]: selectedOptions,
      }));
    } else if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        view_pdf: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "access_to") {
        formData[key].forEach((item) => data.append(key, item));
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post("/api/circulars/add/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="c_type"
        placeholder="Circular Type"
        value={formData.c_type}
        onChange={handleChange}
      />
      <input
        type="text"
        name="publish_id"
        placeholder="Publish ID"
        value={formData.publish_id}
        onChange={handleChange}
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />
      <select
        name="issued_by"
        value={formData.issued_by}
        onChange={handleChange}
      >
        <option value="">Select Department</option>
        {departments.map((dept, index) => (
          <option key={index} value={dept}>
            {dept}
          </option>
        ))}
      </select>
      <textarea
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
      />
      <input
        type="text"
        name="uploaded_by"
        placeholder="Uploaded By"
        value={formData.uploaded_by}
        onChange={handleChange}
      />
      <label>
        Is Published:
        <input
          type="checkbox"
          name="is_published"
          checked={formData.is_published}
          onChange={handleChange}
        />
      </label>
      <select
        name="access_to"
        multiple
        value={formData.access_to}
        onChange={handleChange}
      >
        <option value="Admin">Admin</option>
        <option value="Student">Student</option>
        <option value="Faculty">Faculty</option>
        <option value="Employee">Employee</option>
        <option value="Alumni">Alumni</option>
        <option value="ExEmployee">ExEmployee</option>
      </select>
      <input
        type="file"
        name="view_pdf"
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CircularForm;
