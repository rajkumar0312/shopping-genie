export type PlatformType = "ECOMMERCE" | "QUICK_COMMERCE" | "RETAIL";

export type Availability =
  | "IN_STOCK"
  | "OUT_OF_STOCK"
  | "LIMITED"
  | "UNKNOWN";

export interface SearchRequest {
  query: string;
  latitude?: number;
  longitude?: number;
  pincode?: string;
}

export interface ComparisonResult {
  platform: string;
  platformType: PlatformType;
  productTitle: string;
  productUrl: string;
  price: number | null;
  mrp: number | null;
  currency: "INR";
  availability: Availability;
  deliveryText: string | null;
  lastCheckedAt: string;
}
