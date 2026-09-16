# Security model

## Trust boundaries

1. Customers sign only with their own wallet. The platform never requests their private key.
2. Administrative users authenticate through the API and must be authorized for their assigned role.
3. The contract minter and check-in service are server-controlled roles. Their private keys are supplied only by deployment secrets, never browser code.
4. The browser treats price and seat availability as display data. The API recalculates them before accepting an order.

## NFT-ticket rules planned for Phase 4

- Every completed ticket maps to one ERC-721 token.
- The contract records ticket issuance and a terminal `checkedIn` state.
- An NFT cannot be checked in more than once.
- Tickets will be non-transferable in the first release to reduce scalping.
- The contract stores hashes and public metadata URIs, not personal information.

## QR-code policy

QR codes must contain a signed, short-lived challenge rather than a reusable raw token ID. A scanner will verify that signature, resolve the ticket, confirm on-chain ownership and unused state, and then submit the redemption transaction. QR content, wallet keys, credentials, and customer personal data must never be stored in NFT metadata.

## Operational controls

- Validate all API input with schemas.
- Use role checks for administrative endpoints.
- Log privileged changes and every check-in attempt.
- Rate-limit authentication, booking, and scan endpoints.
- Use database transactions plus seat-hold expiry to protect inventory.
