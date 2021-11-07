import React from 'react';
import { ethers } from 'ethers';
import './App.css';

function App() {
  const wave = () => {
    console.log(
      'Keep on rocking in the free world!',
      ethers.Signer.isSigner.name
    );
  };

  return (
    <div className="App">
      <div className="dataContainer">
        <div className="header">🤘 Rocking Here! 🤘</div>

        <div className="bio">
          Hello there, I'm Adolfredo, and I'm a passionate Software Developer
          who loves technology and great music!!! Connect your Ethereum wallet
          and Rock at me!
        </div>

        <button className="waveButton" onClick={wave}>
          Rock at Me
        </button>
      </div>
    </div>
  );
}

export default App;
