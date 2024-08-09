import { EnvironmentsEnum } from 'types';

export * from './sharedConfig';

export const contractAddress =
  'erd1qqqqqqqqqqqqqpgqr58j50m0zqkk7rwkt5ax4qlak5msm489dy7s2qp2fq';
export const API_URL = 'https://devnet-api.multiversx.com';
export const sampleAuthenticatedDomains = [API_URL];
export const environment = EnvironmentsEnum.devnet;
export const ESCROW_API_SERIVCE_URL = 'http://localhost:3000/escrow';
