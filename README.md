# ExperienceMatch.ai

ExperienceMatch.ai is a specialized matching platform designed for the DACH apprenticeship market. It prioritizes workplace culture and individual character traits over conventional academic metrics to reduce dropout rates and improve long-term professional fit.

## Core Philosophy
The dual education system in Germany, Austria, and Switzerland is a cornerstone of the economy, yet one in four apprenticeships ends prematurely. This platform addresses the "Retention Gap" by analyzing the psychological and environmental alignment between students and companies. Instead of traditional CV-based screening, ExperienceMatch employs a character-driven intake process to identify the optimal environment for each individual.

## Technical Architecture
The platform is built on a high-performance, modern stack focused on security and responsiveness:

Frontend: Next.js 14+ with TypeScript and Tailwind CSS.
Animations: Framer Motion for scroll-driven focus and blur effects.
Backend: PostgreSQL via Supabase with Row Level Security (RLS).
Authentication: Secure JWT-based auth handling with encrypted session management.
Typography: Noto Serif for an editorial, sophisticated aesthetic.

## Security and Privacy
Given the sensitivity of career data and the inclusion of minors, security is integrated into the core architecture:

Database Firewall: Row Level Security policies ensure that user data is isolated at the database level. Users can only access rows where their authenticated UUID matches the record's owner ID.
Encryption: All password handling and session persistence are managed by Supabase Auth, utilizing industry-standard hashing and encryption protocols.
Data Minimization: The platform only stores the essential character traits and career preferences required for the matching algorithm.

## Local Development
To set up the development environment locally:

1. Clone the repository.
2. Install dependencies using npm install.
3. Configure environment variables in a .env.local file including NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.
4. Execute npm run dev to start the local development server.

## Licensing and Rights
All rights reserved by Thomas Haiden. 2026.
