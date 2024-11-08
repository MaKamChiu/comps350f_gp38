import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import LanguageSelector from './LanguageSelector';
import { useLanguage, LanguageProvider } from '../contexts/LanguageContext';

vi.mock('../contexts/LanguageContext', () => ({
  useLanguage: vi.fn(),
  LanguageProvider: ({ children }) => <>{children}</>,
}));

describe('LanguageSelector Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly', () => {
    const mockChangeLanguage = vi.fn();
    const useLanguageMock = vi.mocked(useLanguage);
    useLanguageMock.mockReturnValue({
      currentLanguage: 'en',
      changeLanguage: mockChangeLanguage,
    });

    render(<LanguageSelector />);
    expect(screen.getByText('English')).toBeInTheDocument();
  });

  it('should change language when a new language is selected', () => {
    const mockChangeLanguage = vi.fn();
    const useLanguageMock = vi.mocked(useLanguage);
    useLanguageMock.mockReturnValue({
      currentLanguage: 'en',
      changeLanguage: mockChangeLanguage,
    });

    render(<LanguageSelector />);
    const select = screen.getByRole('combobox');
    
    fireEvent.change(select, { target: { value: 'es' } });
    expect(mockChangeLanguage).toHaveBeenCalledWith('es');
  });
});