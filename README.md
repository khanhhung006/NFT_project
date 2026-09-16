# MoviePass NFT

MoviePass NFT is an original university blockchain project for issuing cinema tickets as non-transferable NFT admission passes. This repository deliberately starts with the Phase 1 platform foundation only: architecture, database model, local service scaffolds, design tokens, and contract-development configuration.

No source code or files were copied from the reference project supplied during planning.

## Phase 1 scope

- npm workspace monorepo
- Next.js customer-web foundation and health route
- NestJS API foundation and health route
- PostgreSQL/Prisma data model
- shared TypeScript domain types and visual design tokens
- Foundry contract-development configuration (the NFT implementation begins in Phase 4)
- architecture, security, and local-development documentation

Customer booking, administrator operations, wallet integration, payments, NFT minting, and QR check-in are intentionally deferred to later phases.

## Prerequisites

- Node.js 22 or newer (Node 24 is used by this workspace)
- npm 10 or newer
- PostgreSQL 16+ only when running database migrations in a later phase
- Foundry only when developing the smart contract in Phase 4

## Quick start

```bash
npm install
npm run dev
```

The customer foundation starts at `http://localhost:3000` and the API health endpoint is available at `http://localhost:4000/api/health`.

Useful checks:

```bash
npm test
npm run build
npm run db:validate
```

Copy `.env.example` to `.env` before using database tooling or later blockchain integrations. Do not commit a real `.env` file.

## Documentation

- [Architecture](docs/architecture/overview.md)
- [Database design](docs/database-design.md)
- [Security model](docs/security-model.md)
- [Development roadmap](docs/development-roadmap.md)
