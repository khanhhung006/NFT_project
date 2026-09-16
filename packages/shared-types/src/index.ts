/** Domain primitives shared by future web, admin, and API features. */
export type TicketLifecycleStatus =
  | "HELD"
  | "PAYMENT_PENDING"
  | "PAID"
  | "MINT_PENDING"
  | "MINTED"
  | "CHECKED_IN"
  | "FAILED"
  | "EXPIRED"
  | "REFUNDED";

export type SeatAvailability = "AVAILABLE" | "HELD" | "SOLD" | "BLOCKED";

export interface TicketSummary {
  id: string;
  movieTitle: string;
  cinemaName: string;
  auditoriumName: string;
  startsAt: string;
  seatCode: string;
  status: TicketLifecycleStatus;
  tokenId?: string;
}
