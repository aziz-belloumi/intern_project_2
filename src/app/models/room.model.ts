export interface Room {
  id: number;
  capacity: number;
  roomType: string;
  hasProjector: boolean;
  hasWhiteboard: boolean;
  description: string;
  pricePerMinute: number;
  userId?: number;
}
