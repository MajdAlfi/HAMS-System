import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

Object.defineProperty(globalThis, 'TextEncoder', {
  value: TextEncoder,
});

Object.defineProperty(globalThis, 'TextDecoder', {
  value: TextDecoder,
});