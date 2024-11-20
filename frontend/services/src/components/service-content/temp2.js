import React, { useState, useEffect } from "react";
import axios from "axios";

const EventForm = () => {
  const [formData, setFormData] = useState({
    event_name: "",
    organizer: "",
    event_id: "",
    event_type: "",
    from_date: "",
    to_date: "",
    organized_department: "",
    subject: "",
    venue: "",
    is_published: false,
    // unpublished: false,
    view_pdf: null,
  });

  const [departments, setDepartments] = useState([]);

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

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post("/api/event/add/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Event created successfully:", response.data);
    } catch (error) {
      console.error("Error creating event:", error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="event_name" placeholder="Event Name" onChange={handleChange} />
      <input type="text" name="organizer" placeholder="Organizer" onChange={handleChange} />
      <input type="text" name="event_id" placeholder="Event ID" onChange={handleChange} />
      <input type="text" name="event_type" placeholder="Event Type" onChange={handleChange} />
      <input type="date" name="from_date" onChange={handleChange} />
      <input type="date" name="to_date" onChange={handleChange} />
      <select name="organized_department" onChange={handleChange}>
        <option value="">Select Department</option>
        {departments.map((dept, index) => (
          <option key={index} value={dept}>
            {dept}
          </option>
        ))}
      </select>
      <textarea name="subject" placeholder="Subject" onChange={handleChange}></textarea>
      <input type="text" name="venue" placeholder="Venue" onChange={handleChange} />
      <label>
        Is Published:
        <input type="checkbox" name="is_published" onChange={handleChange} />
      </label>
      {/* <label>
        Unpublished:
        <input type="checkbox" name="unpublished" onChange={handleChange} />
      </label> */}
      <input type="file" name="view_pdf" onChange={handleChange} />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventForm;
