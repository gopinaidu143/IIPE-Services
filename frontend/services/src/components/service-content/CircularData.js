import React, { useState } from 'react';
import CircularForm from './CircularForm';
import CircularList from './CircularList';

const CircularData = () => {
  const [activeView, setActiveView] = useState(null);

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px',
    },
    button: {
      padding: '10px 20px',
      margin: '0 10px',
      fontSize: '16px',
      cursor: 'pointer',
      border: 'none',
      borderRadius: '5px',
      transition: 'background-color 0.3s',
    },
    activeButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
    },
    inactiveButton: {
      backgroundColor: '#f1f1f1',
      color: '#333',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.buttonContainer}>
        <button
          onClick={() => setActiveView('form')}
          style={{
            ...styles.button,
            ...(activeView === 'form' ? styles.activeButton : styles.inactiveButton),
          }}
        >
          Fill Form
        </button>
        <button
          onClick={() => setActiveView('list')}
          style={{
            ...styles.button,
            ...(activeView === 'list' ? styles.activeButton : styles.inactiveButton),
          }}
        >
          Show Records
        </button>
      </div>

      {activeView === 'form' && <CircularForm />}
      {activeView === 'list' && <CircularList />}
    </div>
  );
};

export default CircularData;

