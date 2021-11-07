import { ethers } from 'ethers';

import abiObject from './WavePortal.json';
import { Response, ResponseArray } from '../types';

const contractAddress = '0xD3ecC8fbadaE994529b3157800e54b990Adc8d79';
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

export const wave = async (): Promise<Response> => {
  try {
    const { ethereum }: any = window;
    if (!ethereum)
      return { status: false, result: "Ethereum object doesn't exist!" };

    const wavePortalContract = getWaveContract(ethereum);

    const waveTxn = await wavePortalContract.wave();
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

    const wavers = await wavePortalContract.getWavers();
    return { status: true, result: wavers };
  } catch (e) {
    console.log(e);
    return { status: false, message: 'Something went wrong', result: [] };
  }
};
