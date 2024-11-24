import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../../components/Navbar';

describe('Navbar Component', () => {
  const mockUser = {
    id: 'user-1',
    email: 'test@example.com',
    name: 'Test User',
    isAdmin: false,
    votedOptions: new Set<string>(),
  };

  const mockAdminUser = {
    ...mockUser,
    isAdmin: true,
  };

  const mockOnLogout = vi.fn();

  it('renders correctly for logged-in user', () => {
    render(
      <Navbar user={mockUser} onLogout={mockOnLogout}>
        <div>Test Child</div>
      </Navbar>
    );

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
    expect(screen.getByText('common.logout')).toBeInTheDocument();
  });

  it('renders admin indicator for admin users', () => {
    render(
      <Navbar user={mockAdminUser} onLogout={mockOnLogout}>
        <div>Test Child</div>
      </Navbar>
    );

    expect(screen.getByText(/\(common.admin\)/)).toBeInTheDocument();
  });

  it('calls logout function when logout button is clicked', () => {
    render(
      <Navbar user={mockUser} onLogout={mockOnLogout}>
        <div>Test Child</div>
      </Navbar>
    );

    fireEvent.click(screen.getByText('common.logout'));
    expect(mockOnLogout).toHaveBeenCalled();
  });

  it('renders correctly when no user is logged in', () => {
    render(
      <Navbar user={null} onLogout={mockOnLogout}>
        <div>Test Child</div>
      </Navbar>
    );

    expect(screen.queryByText('common.logout')).not.toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});