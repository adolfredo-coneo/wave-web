import { Response } from '../types';

export const checkIfWalletIsConnected = async (): Promise<Response> => {
  try {
    const { ethereum }: any = window;
    if (!ethereum) {
      return { status: false, result: 'Make sure you have metamask!' };
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });
    if (accounts.length > 0) {
      return { status: true, result: accounts[0] };
    } else {
      return { status: false, result: 'No authorized account found' };
    }
  } catch (e) {
    console.log(e);
    return { status: false, result: 'Something went wrong' };
  }
};

export const connectWallet = async (): Promise<Response> => {
  try {
    const { ethereum }: any = window;
    if (!ethereum) {
      return { status: false, result: 'Make sure you have metamask!' };
    }

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    if (accounts.length > 0) {
      return { status: true, result: accounts[0] };
    } else {
      return { status: false, result: 'No connected account found' };
    }
  } catch (e) {
    console.log(e);
    return { status: false, result: 'Something went wrong' };
  }
};
