import React, { useEffect, useState } from 'react';

import {
  checkIfWalletIsConnected,
  connectWallet,
} from '../ethereum/walletHandler';
import { wave, getWaveContract } from '../ethereum/waveContractHandler';
import WaveCount from '../components/WaveCount';
import WaversList from '../components/WaversList';
import WaveForm from '../components/WaveForm';
import { Contract } from '@ethersproject/contracts';

const Home = () => {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [waveCount, setWaveCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resetForm, setResetForm] = useState(false);

  const waveHandler = async (message: string) => {
    setLoading(true);
    setResetForm(false);
    const response = await wave(message);
    if (response.status) {
      console.log('Retrieved total wave count...', response.result);
      setWaveCount(parseInt(response.result));
      setResetForm(true);
    } else {
      console.log(response.result);
    }
    setLoading(false);
  };

  const connectHandler = async () => {
    console.log('Starting');
    const response = await connectWallet();
    console.log('Result:', response.status);
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

    const onNewWave = (from: string, timestamp: Date, message: string) => {
      console.log('NewWave', from, timestamp, message)
      setWaveCount(current => current + 1);
    }

    const { ethereum }: any = window;
    let wavePortalContract: Contract;
    if (ethereum){
      console.log('receiving new waves')
      wavePortalContract = getWaveContract(ethereum);
      wavePortalContract.on('NewWave', onNewWave);
    }

    return () => {
      if (wavePortalContract) {
        console.log('not receiving new waves')
        wavePortalContract.off('NewWave', onNewWave);
      }
    };
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
          resetForm={resetForm}
          waveHandler={waveHandler}
          connectHandler={connectHandler}
        />

        <WaversList waveCount={waveCount} />
      </div>
    </div>
  );
};

export default Home;
