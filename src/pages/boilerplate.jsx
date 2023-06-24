import { sign } from '@noble/ed25519';
import { Connection, Keypair } from '@solana/web3.js';
import { Elusiv, SEED_MESSAGE } from '@elusiv/sdk';

const CLUSTER = 'devnet'
const DEVNET_RPC_URL = 'https://api.devnet.solana.com'

export function generateRandomSeed(length) {
  const seed = new Uint8Array(length);
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    window.crypto.getRandomValues(seed);
  } else if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(seed);
  } else {
    throw new Error('Random number generator not available.');
  }
  return seed;
}

export async function getParams(keyPair) {
  const conn = new Connection(DEVNET_RPC_URL);
  
  const seed = generateRandomSeed(32)

  const elusiv = await Elusiv.getElusivInstance(
    seed,
    keyPair.publicKey,
    conn,
    CLUSTER,
  );

  return { elusiv, conn };
}







