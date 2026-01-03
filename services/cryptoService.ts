
import { CryptoResult, Encoding } from '../types';

export const bufferToHex = (buffer: ArrayBuffer): string => {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

export const bufferToBase64 = (buffer: ArrayBuffer): string => {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
};

export const encodeData = (buffer: ArrayBuffer, encoding: Encoding): string => {
  return encoding === 'hex' ? bufferToHex(buffer) : bufferToBase64(buffer);
};

export const cryptoService = {
  generateRandom: async (length: number, encoding: Encoding): Promise<CryptoResult> => {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    const output = encodeData(array.buffer, encoding);
    
    return {
      output,
      details: { length, encoding, method: 'getRandomValues' },
      timestamp: new Date().toISOString()
    };
  },

  hash: async (input: string | File, algorithm: string, encoding: Encoding): Promise<CryptoResult> => {
    let data: BufferSource; // Correction: Utilisation de BufferSource au lieu de ArrayBuffer
    
    if (typeof input === 'string') {
      data = new TextEncoder().encode(input);
    } else {
      data = await input.arrayBuffer();
    }

    const hashBuffer = await window.crypto.subtle.digest(algorithm, data);
    const output = encodeData(hashBuffer, encoding);

    return {
      output,
      details: { algorithm, encoding, inputType: typeof input === 'string' ? 'text' : 'file' },
      timestamp: new Date().toISOString()
    };
  },

  hmac: async (payload: string, secret: string, algorithm: string, encoding: Encoding): Promise<CryptoResult> => {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const payloadData = encoder.encode(payload);

    const key = await window.crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: algorithm },
      false,
      ['sign']
    );

    const signature = await window.crypto.subtle.sign('HMAC', key, payloadData);
    const output = encodeData(signature, encoding);

    return {
      output,
      header: `X-Signature: ${output}`,
      details: { algorithm, encoding, payloadLength: payload.length },
      timestamp: new Date().toISOString()
    };
  }
};
