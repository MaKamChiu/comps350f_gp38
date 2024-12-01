import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { mockApp, mockAuth, mockFirestore, mockStorage } from './mocks/firebase';
import { mockTranslation } from './mocks/i18n';

// Mock Firebase
vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => mockApp),
  getApp: vi.fn(() => mockApp),
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => mockAuth),
  signInWithEmailAndPassword: mockAuth.signInWithEmailAndPassword,
  createUserWithEmailAndPassword: mockAuth.createUserWithEmailAndPassword,
  signOut: mockAuth.signOut,
  onAuthStateChanged: mockAuth.onAuthStateChanged,
  updateProfile: vi.fn(),
}));

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => mockFirestore),
  collection: mockFirestore.collection,
  doc: mockFirestore.doc,
  setDoc: mockFirestore.setDoc,
  getDoc: mockFirestore.getDoc,
  updateDoc: mockFirestore.updateDoc,
  getDocs: mockFirestore.getDocs,
  writeBatch: mockFirestore.writeBatch,
  serverTimestamp: mockFirestore.serverTimestamp,
}));

vi.mock('firebase/storage', () => ({
  getStorage: vi.fn(() => mockStorage),
  ref: mockStorage.ref,
  uploadBytes: mockStorage.uploadBytes,
  getDownloadURL: mockStorage.getDownloadURL,
}));

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => mockTranslation,
  initReactI18next: {
    type: '3rdParty',
    init: vi.fn(),
  },
}));

// Clean up after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});