// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import * as dotenv from 'dotenv';
import crypto from "crypto";

import { TextEncoder, TextDecoder } from 'util';

// Polyfill the global scope with these constructors
// @ts-ignore
global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder;

Object.defineProperty(global.self, "crypto", {
  value: crypto,
});
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: any) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
    })
});
dotenv.config({ path: './.env' });