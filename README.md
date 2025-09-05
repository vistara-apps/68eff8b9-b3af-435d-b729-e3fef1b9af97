# KnowYourRights Cards - Base Mini App

A mobile-first application providing instant, actionable legal information and documentation tools for individuals during police interactions.

## Features

### Core Functionality
- **Know Your Rights Summary**: Essential rights information in digestible card formats
- **State-Specific Laws & Scripts**: Localized legal information with pre-written scripts
- **Interaction Recording**: One-tap audio/video recording with sharing capabilities
- **Emergency Alerts**: Location-based alerts to emergency contacts

### Technical Features
- Built with Next.js 15 and App Router
- Base blockchain integration via OnchainKit
- Mobile-first responsive design
- Real-time recording capabilities
- Geolocation services
- Multi-language support (English/Spanish)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd knowyourrights-cards
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture

### Data Models
- **User**: Profile with state, language preferences, and emergency contacts
- **InteractionLog**: Records of police interactions with timestamps and recordings
- **StateLaw**: State-specific legal information and scripts

### Key Components
- **InfoCard**: Reusable card component with variants (basic, detailed, script)
- **ActionFAB**: Floating action buttons for quick actions
- **RecordingControls**: Audio/video recording interface
- **EmergencyAlert**: Emergency contact notification system

### Design System
- Purple gradient theme matching legal/authority context
- Glass morphism UI elements
- Mobile-first responsive design
- Accessibility-focused interactions

## API Integration

### Planned Integrations
- **OpenAI API**: Dynamic script generation and translation
- **Supabase**: Backend data management and real-time features
- **Stripe**: Micro-transaction payments for premium content
- **Geolocation APIs**: State detection and location services

## Business Model

- **Freemium**: Basic rights information free, premium state-specific content paid
- **Micro-transactions**: $1-3 for advanced scripts and legal summaries
- **Target**: Users needing immediate, specific legal guidance

## Legal Disclaimer

This application provides general legal information and should not replace professional legal advice. Laws vary by jurisdiction. Always consult with a qualified attorney for specific legal situations.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please contact [support@knowyourrights.app](mailto:support@knowyourrights.app) or create an issue in this repository.
