// import React, { useState, useEffect } from 'react';

// const DependentForm = () => {
//   const [noOfDependents, setNoOfDependents] = useState(1); // Default to 1
//   const [dependents, setDependents] = useState([
//     { name: '', dob: '', gender: '', relation: '', idProof: null }
//   ]);
//   const [formData, setFormData] = useState({
//     employeeCode: '',
//     dependents: [{ name: '', dob: '', gender: '', relation: '', idProof: null }]
//   });

//   useEffect(() => {
//     fetch('/api/getNoOfDependents') // Replace with actual endpoint
//       .then(response => response.json())
//       .then(data => {
//         if (data.noOfDependents && data.noOfDependents > 1) {
//           setNoOfDependents(data.noOfDependents);
//         }
//       });
//   }, []);

//   useEffect(() => {
//     const initialDependents = Array.from({ length: noOfDependents }, () => ({
//       name: '',
//       dob: '',
//       gender: '',
//       relation: '',
//       idProof: null
//     }));
//     setDependents(initialDependents);
//     setFormData({ ...formData, dependents: initialDependents });
//   }, [noOfDependents]);

//   const handleInputChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedDependents = [...dependents];
//     updatedDependents[index][name] = value;
//     setDependents(updatedDependents);
//     setFormData({ ...formData, dependents: updatedDependents });
//   };

//   const handleFileChange = (index, e) => {
//     const file = e.target.files[0];
//     if (file && ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
//       const updatedDependents = [...dependents];
//       updatedDependents[index].idProof = file;
//       setDependents(updatedDependents);
//       setFormData({ ...formData, dependents: updatedDependents });
//     } else {
//       alert('Please upload a file in jpg, png, or jpeg format');
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form Data:', formData);
//     // Submit formData to the backend
//   };

//   // Define inline styles
//   const styles = {
//     pageContainer: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       height: '100vh',
//       backgroundColor: '#f0f2f5'
//     },
//     formContainer: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '16px',
//       padding: '20px',
//       border: '1px solid #ccc',
//       borderRadius: '8px',
//       maxWidth: '600px',
//       backgroundColor: '#fff',
//       boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
//     },
//     heading: {
//       fontSize: '24px',
//       fontWeight: 'bold',
//       color: '#333',
//       textAlign: 'center',
//       marginBottom: '16px'
//     },
//     row: {
//       display: 'flex',
//       gap: '16px',
//       flexWrap: 'wrap'
//     },
//     label: {
//       flex: '1 1 48%',
//       display: 'flex',
//       flexDirection: 'column',
//       fontWeight: 'bold',
//       color: '#333',
//       marginBottom: '8px'
//     },
//     input: {
//       padding: '8px',
//       border: '1px solid #ccc',
//       borderRadius: '4px'
//     },
//     select: {
//       padding: '8px',
//       border: '1px solid #ccc',
//       borderRadius: '4px'
//     },
//     button: {
//       padding: '10px 20px',
//       border: 'none',
//       borderRadius: '4px',
//       backgroundColor: '#4CAF50',
//       color: '#fff',
//       fontWeight: 'bold',
//       cursor: 'pointer',
//       alignSelf: 'center',
//       marginTop: '16px'
//     }
//   };

//   return (
//     <div style={styles.pageContainer}>
//       <form onSubmit={handleSubmit} style={styles.formContainer}>
//         <div style={styles.heading}>Dependent Registration</div>
        
//         <div style={styles.row}>
//           <label style={styles.label}>
//             Employee/Faculty Code:
//             <input
//               type="text"
//               name="employeeCode"
//               value={formData.employeeCode}
//               onChange={(e) => setFormData({ ...formData, employeeCode: e.target.value })}
//               required
//               style={styles.input}
//             />
//           </label>
//           <label style={styles.label}>
//             No. of Dependents:
//             <input type="number" value={noOfDependents} readOnly style={styles.input} />
//           </label>
//         </div>

//         {dependents.map((_, index) => (
//           <div key={index} style={styles.row}>
//             <label style={styles.label}>
//               Dependent Name:
//               <input
//                 type="text"
//                 name="name"
//                 value={dependents[index].name}
//                 onChange={(e) => handleInputChange(index, e)}
//                 required
//                 style={styles.input}
//               />
//             </label>
//             <label style={styles.label}>
//               Date of Birth:
//               <input
//                 type="date"
//                 name="dob"
//                 value={dependents[index].dob}
//                 onChange={(e) => handleInputChange(index, e)}
//                 required
//                 style={styles.input}
//               />
//             </label>
//             <label style={styles.label}>
//               Gender:
//               <select
//                 name="gender"
//                 value={dependents[index].gender}
//                 onChange={(e) => handleInputChange(index, e)}
//                 required
//                 style={styles.select}
//               >
//                 <option value="">Select</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </label>
//             <label style={styles.label}>
//               Relation:
//               <input
//                 type="text"
//                 name="relation"
//                 value={dependents[index].relation}
//                 onChange={(e) => handleInputChange(index, e)}
//                 required
//                 style={styles.input}
//               />
//             </label>
//             <label style={styles.label}>
//               ID Proof:
//               <input
//                 type="file"
//                 accept=".jpg, .png, .jpeg"
//                 onChange={(e) => handleFileChange(index, e)}
//                 required
//                 style={styles.input}
//               />
//             </label>
//           </div>
//         ))}

//         <button type="submit" style={styles.button}>Submit</button>
//       </form>
//     </div>
//   );
// };

// export default DependentForm;

import React, { useState, useEffect } from 'react';

const DependentForm = () => {
  const [noOfDependents, setNoOfDependents] = useState(2);
  const [dependents, setDependents] = useState([
    { name: '', dob: '', gender: '', relation: '', idProof: null }
  ]);
  const [formData, setFormData] = useState({
    employeeCode: '',
    dependents: [{ name: '', dob: '', gender: '', relation: '', idProof: null }]
  });

  useEffect(() => {
    fetch('/api/getNoOfDependents') // Replace with actual endpoint
      .then(response => response.json())
      .then(data => {
        if (data.noOfDependents && data.noOfDependents > 1) {
          setNoOfDependents(data.noOfDependents);
        }
      });
  }, []);

  useEffect(() => {
    const initialDependents = Array.from({ length: noOfDependents }, () => ({
      name: '',
      dob: '',
      gender: '',
      relation: '',
      idProof: null
    }));
    setDependents(initialDependents);
    setFormData({ ...formData, dependents: initialDependents });
  }, [noOfDependents]);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDependents = [...dependents];
    updatedDependents[index][name] = value;
    setDependents(updatedDependents);
    setFormData({ ...formData, dependents: updatedDependents });
  };

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file && ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      const updatedDependents = [...dependents];
      updatedDependents[index].idProof = file;
      setDependents(updatedDependents);
      setFormData({ ...formData, dependents: updatedDependents });
    } else {
      alert('Please upload a file in jpg, png, or jpeg format');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  const styles = {
    pageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    //   height: '100vh',
      backgroundColor: '#f0f2f5'
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      padding: '20px',
      marginTop: '50px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      maxWidth: '900px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    },
    heading: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      marginBottom: '16px'
    },
    subHeading: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '8px'
    },
    row: {
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap'
    },
    label: {
      flex: '1 1 48%',
      display: 'flex',
      flexDirection: 'column',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '8px'
    },
    input: {
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px'
    },
    select: {
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px'
    },
    button: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      fontWeight: 'bold',
      cursor: 'pointer',
      alignSelf: 'center',
      marginTop: '16px'
    }
  };

  return (
    <div style={styles.pageContainer}>
      <form onSubmit={handleSubmit} style={styles.formContainer}>
        <div style={styles.heading}>Dependent Registration</div>
        
        <div style={styles.row}>
          <label style={styles.label}>
            Employee/Faculty Code:
            <input
              type="text"
              name="employeeCode"
              value={formData.employeeCode}
              onChange={(e) => setFormData({ ...formData, employeeCode: e.target.value })}
              required
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            No. of Dependents:
            <input type="number" value={noOfDependents} readOnly style={styles.input} />
          </label>
        </div>

        {dependents.map((_, index) => (
          <div key={index}>
            <div style={styles.subHeading}>Dependent {index + 1}</div>
            <div style={styles.row}>
              <label style={styles.label}>
                Dependent Name:
                <input
                  type="text"
                  name="name"
                  value={dependents[index].name}
                  onChange={(e) => handleInputChange(index, e)}
                  required
                  style={styles.input}
                />
              </label>
              <label style={styles.label}>
                Date of Birth:
                <input
                  type="date"
                  name="dob"
                  value={dependents[index].dob}
                  onChange={(e) => handleInputChange(index, e)}
                  required
                  style={styles.input}
                />
              </label>
              <label style={styles.label}>
                Gender:
                <select
                  name="gender"
                  value={dependents[index].gender}
                  onChange={(e) => handleInputChange(index, e)}
                  required
                  style={styles.select}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </label>
              <label style={styles.label}>
                Relation:
                <input
                  type="text"
                  name="relation"
                  value={dependents[index].relation}
                  onChange={(e) => handleInputChange(index, e)}
                  required
                  style={styles.input}
                />
              </label>
              <label style={styles.label}>
                ID Proof:
                <input
                  type="file"
                  accept=".jpg, .png, .jpeg"
                  onChange={(e) => handleFileChange(index, e)}
                  required
                  style={styles.input}
                />
              </label>
            </div>
          </div>
        ))}

        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
};

export default DependentForm;
