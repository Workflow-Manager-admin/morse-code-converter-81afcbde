import React from 'react';
import './App.css';
import MorseCodeConverter from './components/MorseCodeConverter';

// PUBLIC_INTERFACE
function App() {
  // Replace the default template UI with our Figma-derived layout.
  return (
    <div className="App">
      <MorseCodeConverter />
    </div>
  );
}

export default App;
