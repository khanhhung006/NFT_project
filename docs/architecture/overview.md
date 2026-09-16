# System architecture

## Guiding principle

MoviePass NFT is a hybrid Web3 application. The blockchain establishes the immutable ticket asset, wallet ownership, and one-time admission state. PostgreSQL is the operational source for cinema content, seating inventory, prices, booking workflow, and audit history. IPFS hosts public NFT metadata only.

```text
Customer web ─┐
Admin portal ─┼──> NestJS API ──> PostgreSQL
Check-in UI ──┘         │              │
                          │              └─ Movies, shows, seats, bookings, audit history
                          ├── Redis: short seat holds and QR nonces
                          ├── IPFS: public NFT metadata and art
                          └── Polygon: NFT ownership and ticket redemption
```

## Bounded responsibilities

| Layer | Responsibilities | Must not own |
| --- | --- | --- |
| Customer web | Browsing, seat-map interaction, wallet transaction UX, ticket display | Trusted price calculation or ticket validity decisions |
| Admin portal | Authorized content, venue, pricing, booking, and gate operations | Direct database bypass or private-key access |
| API | Authorization, trusted availability/pricing, order state, mint orchestration, audit trail | Custody of customer wallets |
| PostgreSQL | Operational records and state history | NFT ownership source of truth |
| Smart contract | NFT issuance, ownership, uniqueness, redemption state | Personal data, film catalogue, seat-layout logic |
| IPFS | Immutable public metadata | QR secrets or customer data |

## Planned transaction boundary

The backend holds selected seats briefly, recalculates the price, and records a pending order. After an approved payment is confirmed, a privileged minter mints one NFT for each ticket. The backend persists the transaction and token ID. At entry, the check-in service validates current ownership and submits a one-time redemption transaction.

## Phase 1 runtime topology

Only two services run today:

- `apps/web`: customer-facing Next.js foundation on port 3000.
- `apps/api`: NestJS health API on port 4000.

The admin portal, Redis, PostgreSQL container, IPFS pinning, and contract deployment are documented integration points and intentionally not started in this phase.
