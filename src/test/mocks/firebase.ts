import { vi } from 'vitest';

const mockQuery = vi.fn(); // Mock the query function

const mockBatch = {
  set: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  commit: vi.fn().mockResolvedValue(undefined),
};

export const mockAuth = {
  currentUser: null,
  onAuthStateChanged: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
};

export const mockFirestore = {
  collection: vi.fn().mockReturnValue({
    doc: vi.fn().mockReturnValue({
      id: 'mock-doc-id',
      collection: vi.fn(),
      set: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    }),
  }),
  doc: vi.fn().mockReturnValue({
    id: 'mock-doc-id',
    set: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  }),
  setDoc: vi.fn(),
  getDoc: vi.fn(),
  updateDoc: vi.fn(),
  getDocs: vi.fn(),
  writeBatch: vi.fn(() => mockBatch),
  serverTimestamp: vi.fn(() => new Date()),
  query: mockQuery, // Add this line
};

export const mockStorage = {
  ref: vi.fn(),
  uploadBytes: vi.fn(),
  getDownloadURL: vi.fn(),
};

export const mockApp = {
  auth: () => mockAuth,
  firestore: () => mockFirestore,
  storage: () => mockStorage,
};
