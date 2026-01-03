
export enum CryptoOperation {
  GENERATE = 'GENERATE',
  HASH = 'HASH',
  HMAC = 'HMAC',
  NOTES = 'NOTES',
  PRIVACY = 'PRIVACY',
  LEGAL = 'LEGAL'
}

export type Encoding = 'hex' | 'base64';

export interface CryptoParams {
  operation: CryptoOperation;
  algorithm?: string;
  encoding: Encoding;
  length?: number;
  payload?: string;
  secret?: string;
  file?: File;
}

export interface CryptoResult {
  output: string;
  details: any;
  timestamp: string;
  header?: string;
}