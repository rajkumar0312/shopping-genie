export type ConnectorAvailability =
  | "IN_STOCK"
  | "OUT_OF_STOCK"
  | "LIMITED"
  | "UNKNOWN";

export interface NormalizedSearchQuery {
  raw: string;
  brand?: string;
  model?: string;
  variant?: string;
  quantity?: string;
  pincode?: string;
  latitude?: number;
  longitude?: number;
}

export interface ConnectorProduct {
  platformProductId: string;
  title: string;
  url: string;
  imageUrl?: string;
  price?: number;
  mrp?: number;
  currency: "INR";
  availability: ConnectorAvailability;
  deliveryText?: string;
  lastCheckedAt: string;
}

export interface PlatformConnector {
  id: string;
  name: string;
  search(query: NormalizedSearchQuery): Promise<ConnectorProduct[]>;
}
