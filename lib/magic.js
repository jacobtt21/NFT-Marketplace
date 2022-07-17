import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';
import Web3 from 'web3';

const customNodeOptions = {
  rpcUrl: 'https://mainnet.infura.io/v3/2ffc1ba00fb2452392bd6951904d41fd', // Your own node URL
  chainId: 1, // Your own node's chainId
};

const polygonNodeOptions = {
  rpcUrl: 'https://polygon-mainnet.infura.io/v3/60bdb9f399554311a48b69ff2faefc8f',
  chainId: 137,
};

const createMagic = (key) => {
  return (
    typeof window != 'undefined' &&
    new Magic(key, {
      network: polygonNodeOptions,
      extensions: [new OAuthExtension()],
    })
  );
};

export const magic = createMagic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);

export const web3 = new Web3(magic.rpcProvider);
