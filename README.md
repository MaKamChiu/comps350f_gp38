# COMPS350F Group 38 - Online Voting System

A modern, secure, and flexible online voting system built with React and TypeScript.

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

4.Accounts for Testing:
- **Admin account (pre-configured and cannot be created)**:
  - Email: admin@admin.com
  - Password: 123456
- **Example user account** (for testing):
  - Email: test@test.com
  - Password: 123456


## Features

- **Multiple Voting Topics**
  - Support for multiple concurrent voting topics
  - Configurable number of selections per topic
  - Dynamic addition and removal of voting options

- **User Management**
  - Secure authentication system
  - Role-based access control (Admin/Voter)
  - Multi-language support (English, Spanish, Chinese)

- **Admin Features**
  - Real-time voting statistics
  - Candidate management
  - Voting topic configuration
  - Audit logs and reporting
  - Export results to CSV

- **Security**
  - Ballot verification system
  - Vote integrity checks
  - Audit trail for all actions

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- i18next for internationalization
- Lucide React for icons
- Vite for development and building
- Firebase for authentication and data storage

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── admin/        # Admin-specific components
│   ├── auth/         # Authentication components
│   └── voting/       # Voting-related components
├── contexts/         # React context providers
├── hooks/            # Custom React hooks
├── services/         # API and business logic
├── types/           # TypeScript type definitions
├── utils/           # Helper functions and utilities
├── i18n/            # Internationalization resources
└── test/            # Test files and utilities
```

## Code Organization

- **Component Structure**: Each component is in its own file with associated types and tests
- **Business Logic**: Separated into services for better maintainability
- **State Management**: Uses React Context for global state
- **Type Safety**: Comprehensive TypeScript types for all features
- **Testing**: Unit tests for components and services

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write meaningful component and function names
- Include JSDoc comments for complex functions

### Component Guidelines

- Keep components focused and single-responsibility
- Extract reusable logic into custom hooks
- Use composition over inheritance
- Implement proper error boundaries

### Testing

- Write unit tests for components and services
- Use integration tests for complex features
- Run tests with:
  ```bash
  npm run test
  ```

## Usage

### Admin Panel

1. **Managing Voting Topics**
   - Create new voting topics
   - Set maximum selections per topic
   - Add/remove candidates
   - Configure voting periods

2. **Monitoring**
   - View real-time voting statistics
   - Access audit logs
   - Generate reports

### Voter Interface

1. **Casting Votes**
   - Select from available voting topics
   - Choose candidates (up to max selections)
   - View voting history

2. **Account Management**
   - Update profile
   - Change language preferences
   - View voting status

## Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the coding guidelines
4. Write tests for new features
5. Submit a Pull Request

### Pull Request Guidelines

- Keep changes focused and atomic
- Include relevant tests
- Update documentation
- Follow the commit message convention

## License

MIT License - feel free to use this project for your own purposes.

## Support

For support or feature requests, please open an issue in the repository.
