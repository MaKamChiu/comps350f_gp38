import { vi } from 'vitest';

export const mockTranslation = {
  t: (key: string) => key,
  i18n: {
    changeLanguage: vi.fn(),
    language: 'en',
  },
};