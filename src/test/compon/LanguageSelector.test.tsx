import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LanguageSelector from '../../components/LanguageSelector';
import { useLanguage } from '../../contexts/LanguageContext';

// Mock the LanguageContext
vi.mock('../../contexts/LanguageContext', () => ({
  useLanguage: vi.fn(),
}));

describe('LanguageSelector Component', () => {
  const mockChangeLanguage = vi.fn();

  beforeEach(() => {
    (useLanguage as any).mockReturnValue({
      currentLanguage: 'en',
      changeLanguage: mockChangeLanguage,
      availableLanguages: ['en', 'es', 'zh'],
    });
  });

  it('renders language options correctly', () => {
    render(<LanguageSelector />);
    
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Español')).toBeInTheDocument();
    expect(screen.getByText('中文')).toBeInTheDocument();
  });

  it('changes language when a new option is selected', () => {
    render(<LanguageSelector />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'es' } });
    
    expect(mockChangeLanguage).toHaveBeenCalledWith('es');
  });

  it('displays current language as selected', () => {
    (useLanguage as any).mockReturnValue({
      currentLanguage: 'es',
      changeLanguage: mockChangeLanguage,
      availableLanguages: ['en', 'es', 'zh'],
    });

    render(<LanguageSelector />);
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('es');
  });
});