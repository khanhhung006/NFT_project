# Database design

## Design decisions

- UUID primary keys are used off-chain; an NFT token ID is stored separately after minting.
- `ShowtimeSeat` is an immutable operational snapshot of a seat at a particular showtime. It retains the price and seat category that applied at sale time.
- `SeatHold` is temporary and will later be backed by Redis. The database row preserves checkout/audit context while Redis handles expiry.
- A unique `Ticket.showtimeSeatId` prevents two completed tickets from representing the same showtime seat.
- On-chain identifiers are stored as hashes in the future contract; PostgreSQL retains the internal identifiers needed for operations.
- Ticket status in the database supports operational progress. NFT ownership and redemption status remain authoritative on-chain after minting.

## Primary relationships

```text
Cinema → Auditorium → SeatTemplate → Seat
Movie + Auditorium → Showtime → ShowtimeSeat
User → Order → Ticket → NftMint
ShowtimeSeat → Ticket → CheckInAttempt
```

The canonical schema is at `packages/database/prisma/schema.prisma`. It covers identity, catalogue, venues, scheduling, pricing, orders, NFT lifecycle, check-in, and audit logs.
