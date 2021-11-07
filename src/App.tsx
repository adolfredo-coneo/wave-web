import React from 'react';
import { ethers } from 'ethers';
import './App.css';

function App() {
  const wave = () => {
    console.log('Keep on rocking in the fre world!', ethers.Signer.isSigner.name);
  };

  return (
    <div className="App">
      <div className="dataContainer">
        <div className="header">🤘 Rocking Here! 🤘</div>

        <div className="bio">
          I am farza and I worked on self-driving cars so that's pretty cool
          right? Connect your Ethereum wallet and wave at me!
        </div>

        <button className="waveButton" onClick={wave}>
          Rock at Me
        </button>
      </div>
    </div>
  );
}

export default App;
