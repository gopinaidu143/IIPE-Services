import React, { useState, useEffect, useRef} from 'react';
import Navbar from '../components/navbar1';
import axios from 'axios';
import { redirect } from 'react-router-dom';



const initialFormData = {
  email: '',
  firstName: '',
  lastName: '',
  gender: '',
  mobile: '',
  password: '',
  rePassword: '',
  employeeCode: '',
  department: '',
  designation: '',
  fatherName: '',
  motherName: '',
  aadhar: '',
  course: '',
  enrollment: '',
  dateOfJoining: '',
  dateOfCompletion: '',
  passingOutdate: '',
  dateOfBirth: '',
  dateOfRetirement: '',
  Landline: '',
  address: '',
  photoOfStudent: null,
  photoOfIdCard: null,
  proofOfId: null,
};
const InputField = ({ label, type, name, value, onChange, error }) => (
  <div>
    <label>{label}:</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      style={{ width: '100%', height: '30px', padding: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
    />
    {error && <span style={{ color: 'red' }}>{error}</span>}
  </div>
);

const SelectField = ({ label, name, value, onChange, options, error }) => (
  <div>
    <label>{label}:</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      style={{ width: '100%', height: '30px', padding: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
    {error && <span style={{ color: 'red' }}>{error}</span>}
  </div>
);

const RegistrationForm = () => {
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [photoOfStudentPreview, setPhotoOfStudentPreview] = useState(null);
  const [photoOfIdCardPreview, setPhotoOfIdCardPreview] = useState(null);
  const photoOfStudentInputRef = useRef(null); // Create a ref for the student photo input
  const photoOfIdCardInputRef = useRef(null); // Create a ref for the ID card input
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [courses, setCourses] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const choicedata = await axios.get('/api/form-options/');
        setDepartments(choicedata.data.departments);
        setDesignations(choicedata.data.designations);
        setCourses(choicedata.data.degrees);
        setRoles(choicedata.data.roles);
      } catch (error) {
        console.error("Error fetching options", error);
      }
    };

    fetchOptions();
  }, []);
  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setFormData(initialFormData); // Reset form data when role changes
    resetPhotoFields();
  };
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      handlePhotoChange(e);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const resetPhotoFields = () => {
    setFormData((prevData) => ({
      ...prevData,
      photoOfStudent: null,
      photoOfIdCard: null,
    }));
    setPhotoOfStudentPreview(null); // Reset photo preview
    setPhotoOfIdCardPreview(null); // Reset ID card preview

    if (photoOfStudentInputRef.current) {
      photoOfStudentInputRef.current.value = null; // Clear the file input
    }
    if (photoOfIdCardInputRef.current) {
      photoOfIdCardInputRef.current.value = null; // Clear the file input
    }
  };
  const handlePhotoChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg','application/pdf'];
      if (!validImageTypes.includes(file.type) || file.size > 400 * 1024) {
        alert("Please upload a valid image (JPG/PNG) not exceeding 400 KB.");
        e.target.value = "";  // Reset the field
        return;
      }

      const photoUrl = URL.createObjectURL(file);
      if (name === "photoOfStudent") {
        setPhotoOfStudentPreview(photoUrl);
        setFormData({ ...formData, photoOfStudent: file });
      } else if (name === "photoOfIdCard") {
        setPhotoOfIdCardPreview(photoUrl);
        setFormData({ ...formData, photoOfIdCard: file });
      }
    } else {
      if (name === "photoOfStudent") {
        setPhotoOfStudentPreview(null);
        setFormData({ ...formData, photoOfStudent: null });
      } else if (name === "photoOfIdCard") {
        setPhotoOfIdCardPreview(null);
        setFormData({ ...formData, photoOfIdCard: null });
      }
    }
  };

  const validatePassword = (password) => {
    if (password.length < 8) return "Password must be at least 8 characters long";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/\d/.test(password)) return "Password must contain at least one number";
    if (!/[!@#$%^&*]/.test(password)) return "Password must contain at least one special character";
    return null; // No errors
  };
  
  const validateForm = () => {
    const formErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^[0-9]\d{9}$/; // 10-digit mobile number
    const aadharPattern = /^[0-9]\d{11}$/;
  
    if (!formData.email || !emailPattern.test(formData.email)) formErrors.email = "Please enter a valid email address";
    if (!formData.firstName) formErrors.firstName = "First name is required";
    if (!formData.lastName) formErrors.lastName = "Last name is required";
    if (!formData.mobile || !mobilePattern.test(formData.mobile)) formErrors.mobile = "Please enter a valid 10-digit mobile number";
    if (!formData.aadhar || !aadharPattern.test(formData.aadhar)) formErrors.aadhar = "Please enter a valid 12-digit aadhar number";
  
    const passwordError = validatePassword(formData.password);
    if (passwordError) formErrors.password = passwordError;
  
    if (formData.password !== formData.rePassword) formErrors.rePassword = "Passwords do not match";
    if (role === 'Employee' || role === 'Faculty') {
      if (!formData.employeeCode) formErrors.employeeCode = "Employee Code is required";
      if (!formData.department) formErrors.department = "Department is required";
      if (!formData.designation) formErrors.designation = "Designation is required";
    }

    if (role === 'Student') {
      if (!formData.fatherName) formErrors.fatherName = "Father's name is required";
      if (!formData.motherName) formErrors.motherName = "Mother's name is required";
      if (!formData.course) formErrors.course = "Course name is required";
      if (!formData.enrollment) formErrors.enrollment = "Enrollment number is required";
      if (!formData.dateOfJoining) formErrors.dateOfJoining = "Date of joining is required";
      if (!formData.dateOfCompletion) formErrors.dateOfCompletion = "date of completion is required";
      if (!formData.photoOfStudent) formErrors.photoOfStudent = "Photo of student is required";
      if (!formData.photoOfIdCard) formErrors.photoOfIdCard = "Photo of ID card is required";
    }

    if (role === 'Alumni') {
      if (!formData.AlumniID) formErrors.AlumniID = "AlumniID number is required";
      if (!formData.passingOutdate) formErrors.passingOutdate = "Passing out date is required";
      if (!formData.photoOfStudent) formErrors.photoOfStudent = "Photo of student is required";
      if (!formData.photoOfIdCard) formErrors.photoOfIdCard = "Photo of ID/Aadhar card is required";
    }

    if (role === 'Ex-Employee') {
      if (!formData.proofOfId) formErrors.proofOfId = "Proof of ID is required";
    }
    console.log("Form Errors:", formErrors);// checking form error
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Current Role:", role); // Log the current role
    if (validateForm()) {
      const formDataToSend = new FormData();
      
      // Append necessary fields to the FormData object
    formDataToSend.append('email', formData.email);
    formDataToSend.append('role', role);
    formDataToSend.append('username',` ${formData.firstName} ${formData.lastName}`);
    formDataToSend.append('first_name', formData.firstName);
    formDataToSend.append('last_name', formData.lastName);
    formDataToSend.append('password',formData.password);
    
    
    // Role-specific fields
    if (role === 'Student') {
      formDataToSend.append('student_id', formData.enrollment);
      formDataToSend.append('department', formData.department);
      formDataToSend.append('degree', formData.course);
      formDataToSend.append('date_of_joining', formData.dateOfJoining);
      formDataToSend.append('expected_date_of_completion', formData.dateOfCompletion);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('contact_no', formData.mobile);
      formDataToSend.append('father_name', formData.fatherName);
      formDataToSend.append('mother_name', formData.motherName);
      formDataToSend.append('aadhar_number', formData.aadhar);
      formDataToSend.append('dob', formData.dateOfBirth);
      formDataToSend.append('photo', formData.photoOfStudent);
      formDataToSend.append('id_proof', formData.photoOfIdCard);


    } else if (role === 'Faculty' || role === 'Employee') {
      if (role === 'Faculty'){
        formDataToSend.append('faculty_id', formData.employeeCode);

      }
      else {
        formDataToSend.append('employee_id', formData.employeeCode);

      }
      formDataToSend.append('department', formData.department);
      formDataToSend.append('designation', formData.designation);
      formDataToSend.append('joined_date', formData.dateOfJoining);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('contact_no', formData.mobile);
      formDataToSend.append('aadhar', formData.aadhar);
      formDataToSend.append('dob', formData.dateOfBirth);
      formDataToSend.append('landline',formData.Landline);
    } else if (role === 'ExEmployee') {
      formDataToSend.append('employee_id', formData.employeeCode);
      formDataToSend.append('department', formData.department);
      formDataToSend.append('designation', formData.designation);
      formDataToSend.append('retirement_date', formData.dateofretirement);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('contact_no', formData.mobile);
      formDataToSend.append('aadhar', formData.aadhar);
      formDataToSend.append('dob', formData.dateOfBirth);
      formDataToSend.append('id_proof', formData.photoOfIdCard);

    } else if (role === 'Alumni') {
      console.log("No role exist");
      formDataToSend.append('department', formData.department);
      formDataToSend.append('degree', formData.course);
      formDataToSend.append('alumni_id', formData.AlumniID);
      formDataToSend.append('graduation_date', formData.passingOutdate);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('contact_no', formData.mobile);
      formDataToSend.append('father_name', formData.fatherName);
      formDataToSend.append('mother_name', formData.motherName);
      formDataToSend.append('aadhar_number', formData.aadhar);
      formDataToSend.append('dob', formData.dateOfBirth);
      formDataToSend.append('photo', formData.photoOfStudent);
      formDataToSend.append('id_proof', formData.photoOfIdCard);
    }
    try {
      const response = await axios.post('/api/register/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        alert("Registration successful!");
        setFormData(initialFormData);
        const userRole=role; // Clear form
        setRole(''); // Reset role // Clear form
        setPhotoOfStudentPreview(null); // Reset photo preview
        setPhotoOfIdCardPreview(null); // Reset ID card preview
        if (userRole === 'Student') {
          window.location.href = "/login?role=Student";
        } 
        else if (userRole === 'Faculty') {
        window.location.href = "/login?role=Faculty";
        } 
        else if (userRole === 'Employee') {
        window.location.href = "/login?role=Employee";
        }
        else if (userRole === 'ExEmployee') {
        window.location.href = "/login?role=ExEmployee";
        } 
        else if (userRole === 'Alumni') {
        window.location.href = "/login?role=Alumni";
        }
      } 
      else {
        alert("Registration failed due to mismatch of data.");
        resetPhotoFields();
      }
    } catch (error) {
      console.error("Error submitting registration form", error);
      alert("Registration failed. Please try again.");
      resetPhotoFields();
    }
  }
  };

  return (
        <div style={{ backgroundColor: '#f4f4f4', minHeight: '100vh', padding: '50px' }}>
          <Navbar />
          <div style={{ padding: '20px', backgroundColor: 'white', width: '75%', margin: '0 auto', marginTop: '100px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Registration Form</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <SelectField
                  label="Register as"
                  name="role"
                  value={role}
                  onChange={(e) => handleRoleChange(e.target.value)} // Use the new role change handler
                  // onChange={(e) => setRole(e.target.value)}
                  options={roles}
                />
                <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
                <InputField label="First Name" type="text" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} />
                <InputField label="Last Name" type="text" name="lastName" value={formData.lastName} onChange={handleChange} error={errors.lastName} />
                <SelectField 
                    label="Gender" 
                    name="gender" 
                    value={formData.gender} 
                    onChange={handleChange} 
                    options={ ['Male', 'Female', 'Other']} 
                />
                <InputField label="Mobile No" type="tel" name="mobile" value={formData.mobile} onChange={handleChange} error={errors.mobile} />
                <InputField label="Aadhar no" type="tel" name="aadhar" value={formData.aadhar} onChange={handleChange} error={errors.aadhar} />
                <SelectField label="Department" name="department" value={formData.department} onChange={handleChange} options={departments} error={errors.department} />
                <InputField label="Date of Birth" type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} error={errors.dateOfBirth} />
                <InputField label="Address" type="text" name="address" value={formData.address} onChange={handleChange} error={errors.address} />
                {role === 'Employee' || role === 'Faculty' ? (
                  <>
                  <InputField label="Date of Joining" type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} error={errors.dateOfJoining} />                  <InputField label="Employee Code" type="text" name="employeeCode" value={formData.employeeCode} onChange={handleChange} error={errors.employeeCode} />
                  <InputField label="Landline No" type="tel" name="Landline" value={formData.Landline} onChange={handleChange} error={errors.Landline} />
                    <SelectField label="Designation" name="designation" value={formData.designation} onChange={handleChange} options={designations} error={errors.designation} />
                  </>
                ) : role === 'Student' ? (
                  <>
                    <SelectField label="Course" name="course" value={formData.course} onChange={handleChange} options={courses} error={errors.course} />
                    <InputField label="Father's Name" type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} error={errors.fatherName} />
                    <InputField label="Mother's Name" type="text" name="motherName" value={formData.motherName} onChange={handleChange} error={errors.motherName} />
                    <InputField label="Enrollment Number" type="text" name="enrollment" value={formData.enrollment} onChange={handleChange} error={errors.enrollment} />
                    <InputField label="Date of Joining" type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} error={errors.dateOfJoining} />
                    <InputField label="Expected date of Completion" type="date" name="dateOfCompletion" value={formData.dateOfCompletion} onChange={handleChange} error={errors.dateOfCompletion} />
                    <div>
                      <label>Proof of Student:</label>
                      <input type="file" name="photoOfStudent" onChange={handleChange} accept="image/*" style={{ width: '100%', height: '30px', padding: '5px', border: '1px solid #ccc', borderRadius: '5px' }} ref={photoOfStudentInputRef}/>
                      {errors.photoOfStudent && <span style={{ color: 'red' }}>{errors.photoOfStudent}</span>}
                      {photoOfStudentPreview && (
                        <img src={photoOfStudentPreview} alt="Student Photo" style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '5px', marginTop: '10px' }} />
                      )}
                    </div>
                    <div>
                      <label>Proof of ID Card:</label>
                      <input type="file" name="photoOfIdCard" onChange={handleChange} accept="image/*" style={{ width: '100%', height: '30px', padding: '5px', border: '1px solid #ccc', borderRadius: '5px' }} ref={photoOfIdCardInputRef}/>
                      {errors.photoOfIdCard && <span style={{ color: 'red' }}>{errors.photoOfIdCard}</span>}
                      {photoOfIdCardPreview && (
                        <img src={photoOfIdCardPreview} alt="ID Card Photo" style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '5px', marginTop: '10px' }} />
                      )}
                    </div>
                  </>
                ) : role === 'Alumni' ? (
                  <>
                  <InputField label="Father's Name" type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} error={errors.fatherName} />
                  <InputField label="Mother's Name" type="text" name="motherName" value={formData.motherName} onChange={handleChange} error={errors.motherName} />
                  <SelectField label="Course" name="course" value={formData.course} onChange={handleChange} options={courses} error={errors.course} />
                  <InputField label="Graduation date" type="date" name="passingOutdate" value={formData.passingOutdate} onChange={handleChange} error={errors.passingOutdate} />
                  <InputField label="AlumniID" type="text" name="AlumniID" value={formData.AlumniID} onChange={handleChange} error={errors.AlumniID} />
                  <div>
                    <label>Proof of Student:</label>
                    <input type="file" name="photoOfStudent" onChange={handleChange}accept="image/*"style={{ width: '100%', height: '30px', padding: '5px', border: '1px solid #ccc', borderRadius: '5px' }} ref={photoOfStudentInputRef}/>
                    {errors.photoOfStudent && <span style={{ color: 'red' }}>{errors.photoOfStudent}</span>}
                    {photoOfStudentPreview && (
                      <img src={photoOfStudentPreview} alt="Student Photo" style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '5px', marginTop: '10px', }} />
                    )}
                  </div>
                  <div>
                    <label>Proof of ID/Aadhar Card :</label>
                    <input type="file" name="photoOfIdCard" onChange={handleChange} accept="image/*" style={{ width: '100%', height: '30px', padding: '5px', border: '1px solid #ccc', borderRadius: '5px' }} ref={photoOfIdCardInputRef} />
                    {errors.photoOfIdCard && <span style={{ color: 'red' }}>{errors.photoOfIdCard}</span>}
                    {photoOfIdCardPreview && (
                      <img src={photoOfIdCardPreview} alt="ID Card Photo" style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '5px', marginTop: '10px', }} /> 
                      )}
                  </div>
                  </>
                ) : role === 'ExEmployee' ? (
                  <>
                    <SelectField label="Designation" name="designation" value={formData.designation} onChange={handleChange} options={designations} error={errors.designation} />
                    <InputField label="Employee Code" type="text" name="employeeCode" value={formData.employeeCode} onChange={handleChange} error={errors.employeeCode}  />
                  <InputField label="Date of retirement" type="date" name="dateofretirement" value={formData.dateofretirement} onChange={handleChange} error={errors.dateofretirement}  />
                  <div>
                    <label>Proof of ID Card:</label>
                    <input type="file" name="photoOfIdCard" onChange={handleChange} accept="image/*" style={{ width: '100%', height: '30px', padding: '5px', border: '1px solid #ccc', borderRadius: '5px' }} ref={photoOfIdCardInputRef}/>
                    {errors.photoOfIdCard && <span style={{ color: 'red' }}>{errors.photoOfIdCard}</span>}
                    {photoOfIdCardPreview && (
                      <img src={photoOfIdCardPreview} alt="ID Card Photo" style={{  width: '150px', height: '150px', objectFit: 'cover', borderRadius: '5px', marginTop: '10px', }} />
                    )}
                  </div> </>
                ) : null}
              </div>
    
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} error={errors.password} />
                <InputField label="Re-enter Password" type="password" name="rePassword" value={formData.rePassword} onChange={handleChange} error={errors.rePassword} />
              </div>
              <button
                type="submit"
                style={{ marginLeft: '400px', marginTop: '20px', padding: '10px 20px', backgroundColor: 'orange', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
                Submit
              </button>
            </form>
          </div>
        </div>
      );
};

export default RegistrationForm;