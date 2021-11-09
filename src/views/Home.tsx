import React, { useEffect, useState } from 'react';

import {
  checkIfWalletIsConnected,
  connectWallet,
} from '../ethereum/walletHandler';
import { wave } from '../ethereum/waveContractHandler';
import WaveCount from '../components/WaveCount';
import WaversList from '../components/WaversList';
import WaveForm from '../components/WaveForm';

const Home = () => {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [waveCount, setWaveCount] = useState('0');
  const [loading, setLoading] = useState(false);

  const waveHandler = async (message: string) => {
    setLoading(true);
    const response = await wave(message);
    if (response.status) {
      console.log('Retrieved total wave count...', response.result);
      setWaveCount(response.result.toString());
    } else {
      console.log(response.result);
    }
    setLoading(false);
  };

  const connectHandler = async () => {
    const response = await connectWallet();
    if (response.status) {
      setCurrentAccount(response.result);
      console.log('Connected', response.result);
    } else {
      console.log(response.result);
    }
  };

  useEffect(() => {
    const checkWallet = async () => {
      const response = await checkIfWalletIsConnected();
      if (response.status) {
        setCurrentAccount(response.result);
        console.log('Found an authorized account:', response.result);
      } else {
        console.log(response.result);
      }
    };

    checkWallet();
  }, []);

  return (
    <div>
      <div className="dataContainer">
        <div className="header">🤘 Rocking Here! 🤘</div>

        <div className="bio">
          Hello there, I'm Adolfredo, and I'm a passionate Software Developer
          who loves technology and great music!!! Connect your Ethereum wallet
          and Rock at me!
        </div>

        <div className="count">
          <WaveCount waveCount={waveCount} />
        </div>

        <WaveForm
          currentAccount={currentAccount}
          loading={loading}
          waveHandler={waveHandler}
          connectHandler={connectHandler}
        />

        <WaversList waveCount={waveCount} />
      </div>
    </div>
  );
};

export default Home;
