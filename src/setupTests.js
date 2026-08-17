import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

class MemoryStorage {
  constructor() {
    this.store = new Map();
  }

  getItem(key) {
    return this.store.has(key) ? this.store.get(key) : null;
  }

  setItem(key, value) {
    this.store.set(String(key), String(value));
  }

  removeItem(key) {
    this.store.delete(key);
  }

  clear() {
    this.store.clear();
  }

  get length() {
    return this.store.size;
  }

  key(index) {
    return [...this.store.keys()][index] ?? null;
  }
}

const storage = new MemoryStorage();
Object.defineProperty(globalThis, 'localStorage', {
  value: storage,
  writable: true,
  configurable: true,
});
Object.defineProperty(window, 'localStorage', {
  value: storage,
  writable: true,
  configurable: true,
});

afterEach(() => {
  cleanup();
  localStorage.clear();
});

const warn = console.warn;
console.warn = (...args) => {
  if (String(args[0] ?? '').includes('React Router Future Flag')) return;
  warn(...args);
};

