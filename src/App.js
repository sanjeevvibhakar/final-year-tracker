// src/App.js
import React from 'react';

function App() {
  return (
    <div style={styles.container}>
      <h1>🎯 Final Year Tracker</h1>
      <p>Track your daily progress, placements, GATE, and CGL prep here!</p>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
};

export default App;
