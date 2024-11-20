import React, { useState } from "react";
import axios from "axios";

const MemoForm = () => {
  const [formData, setFormData] = useState({
    reference_id: "",
    memo_type: "",
    issued_date: "",
    subject: "",
    is_published: false,
    // unpublished: false,
    view_pdf: null,
  });

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
      const response = await axios.post("/api/memo/add/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Memo created successfully:", response.data);
    } catch (error) {
      console.error("Error creating memo:", error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="reference_id" placeholder="Reference ID" onChange={handleChange} />
      <input type="text" name="memo_type" placeholder="Memo Type" onChange={handleChange} />
      <input type="date" name="issued_date" onChange={handleChange} />
      <textarea name="subject" placeholder="Subject" onChange={handleChange}></textarea>
      <label>
        Is Published:
        <input type="checkbox" name="is_published" onChange={handleChange} />
      </label>
      {/* <label>
        Unpublished:
        <input type="checkbox" name="unpublished" onChange={handleChange} />
      </label> */}
      <input type="file" name="view_pdf" onChange={handleChange} />
      <button type="submit">Create Memo</button>
    </form>
  );
};

export default MemoForm;
