import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Fix for TypeEncoder/Decoder in Node environment
Object.defineProperty(globalThis, 'TextEncoder', {
  value: TextEncoder,
});

Object.defineProperty(globalThis, 'TextDecoder', {
  value: TextDecoder,
});