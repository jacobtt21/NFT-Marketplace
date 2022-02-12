import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';
import Web3 from 'web3';

const createMagic = (key) => {
  return (
    typeof window != 'undefined' &&
    new Magic(key, {
      network: 'ropsten',
      extensions: [new OAuthExtension()],
    })
  );
};

export const magic = createMagic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);

export const web3 = new Web3(magic.rpcProvider);
