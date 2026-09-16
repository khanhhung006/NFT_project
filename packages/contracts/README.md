# Contract workspace

This directory is deliberately a Phase 1 development scaffold. The `MovieTicketNFT` Solidity implementation and Foundry tests begin in Phase 4, after cinema booking rules are implemented and contract invariants have been finalized.

The future contract will use OpenZeppelin ERC-721 and AccessControl primitives, enforce a unique booking hash per NFT, mint one token per completed ticket, restrict transfers in the initial release, and record irreversible check-in state.

Run Phase 4 contract commands from this directory after installing Foundry:

```bash
forge build
forge test
```
