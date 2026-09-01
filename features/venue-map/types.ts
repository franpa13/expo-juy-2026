export interface VenueStand {
  id: string;
  exhibitorId: string;
  zone: "A" | "B" | "C" | "D";
  x: number;
  y: number;
  width: number;
  height: number;
}
