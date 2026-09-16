import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const requiredFiles = [
  "README.md",
  "docs/architecture/overview.md",
  "docs/database-design.md",
  "docs/security-model.md",
  "apps/web/app/page.tsx",
  "apps/web/app/api/health/route.ts",
  "apps/api/src/main.ts",
  "apps/api/src/health/health.controller.ts",
  "packages/database/prisma/schema.prisma",
  "packages/contracts/foundry.toml"
];

test("Phase 1 foundation files are present", () => {
  for (const file of requiredFiles) assert.equal(existsSync(file), true, `${file} must exist`);
});

test("database schema contains the ticketing lifecycle models", () => {
  const schema = readFileSync("packages/database/prisma/schema.prisma", "utf8");
  for (const model of ["Movie", "Cinema", "Showtime", "ShowtimeSeat", "Order", "Ticket", "NftMint", "CheckInAttempt"]) {
    assert.match(schema, new RegExp(`model ${model} \\{`));
  }
});

test("contract configuration reserves Solidity 0.8.28", () => {
  const config = readFileSync("packages/contracts/foundry.toml", "utf8");
  assert.match(config, /solc_version = "0\.8\.28"/);
});
