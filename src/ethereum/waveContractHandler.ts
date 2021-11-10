import { ethers } from 'ethers';

import abiObject from './WavePortal.json';
import { Response, ResponseArray, Wave } from '../types';

const contractAddress = '0xA60A704a8F93210da0fF7a77559FED0A35A8186c';
const contractABI = abiObject.abi;

const getWaveContract = (
  ethereum:
    | ethers.providers.ExternalProvider
    | ethers.providers.JsonRpcFetchFunc
) => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  return contract;
};

export const totalWaves = async (): Promise<Response> => {
  try {
    const { ethereum }: any = window;
    if (!ethereum) {
      return { status: false, result: "Ethereum object doesn't exist!" };
    }

    const wavePortalContract = getWaveContract(ethereum);

    const countWaves = await wavePortalContract.getTotalWaves();
    return { status: true, result: countWaves.toNumber() };
  } catch (e) {
    console.log(e);
    return { status: false, result: 'Something went wrong' };
  }
};

export const wave = async (message: string): Promise<Response> => {
  try {
    const { ethereum }: any = window;
    if (!ethereum)
      return { status: false, result: "Ethereum object doesn't exist!" };

    const wavePortalContract = getWaveContract(ethereum);

    const waveTxn = await wavePortalContract.wave(message);
    console.log('Mining...', waveTxn.hash);

    await waveTxn.wait();
    console.log('Mined -- ', waveTxn.hash);

    const countWaves = await wavePortalContract.getTotalWaves();
    return { status: true, result: countWaves.toNumber() };
  } catch (e) {
    console.log(e);
    return { status: false, result: 'Something went wrong' };
  }
};

export const waversList = async (): Promise<ResponseArray> => {
  try {
    const { ethereum }: any = window;
    if (!ethereum)
      return {
        status: false,
        message: "Ethereum object doesn't exist!",
        result: [],
      };

    const wavePortalContract = getWaveContract(ethereum);

    const wavers = await wavePortalContract.getAllWaves();
    let waves: Wave[] = [];
    wavers.forEach(
      (wave: { waver: string; message: string; timestamp: number }) => {
        waves.push({
          address: wave.waver,
          message: wave.message,
          timestamp: new Date(wave.timestamp * 1000),
        });
      }
    );
    return { status: true, result: waves };
  } catch (e) {
    console.log(e);
    return { status: false, message: 'Something went wrong', result: [] };
  }
};
