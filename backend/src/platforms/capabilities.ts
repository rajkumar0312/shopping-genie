export type AccessMethod =
  | "OFFICIAL_API"
  | "AFFILIATE_API"
  | "PARTNER_API"
  | "UNVERIFIED"
  | "NOT_AVAILABLE";

export interface PlatformCapabilities {
  id: string;
  name: string;
  type: "ECOMMERCE" | "QUICK_COMMERCE" | "RETAIL";
  productSearch: boolean;
  price: boolean;
  stock: boolean;
  locationAvailability: boolean;
  deliveryEta: boolean;
  accessMethod: AccessMethod;
  status: "READY" | "INVESTIGATING" | "BLOCKED";
}

/**
 * Capability registry is deliberately conservative.
 * A capability is only marked true when our current connector/access route
 * can reliably provide it; unknown platform capabilities remain false.
 */
export const platformCapabilities: PlatformCapabilities[] = [
  {
    id: "flipkart",
    name: "Flipkart",
    type: "ECOMMERCE",
    productSearch: true,
    price: true,
    stock: true,
    locationAvailability: false,
    deliveryEta: false,
    accessMethod: "AFFILIATE_API",
    status: "INVESTIGATING",
  },
  {
    id: "amazon",
    name: "Amazon",
    type: "ECOMMERCE",
    productSearch: false,
    price: false,
    stock: false,
    locationAvailability: false,
    deliveryEta: false,
    accessMethod: "OFFICIAL_API",
    status: "INVESTIGATING",
  },
  {
    id: "blinkit",
    name: "Blinkit",
    type: "QUICK_COMMERCE",
    productSearch: false,
    price: false,
    stock: false,
    locationAvailability: false,
    deliveryEta: false,
    accessMethod: "UNVERIFIED",
    status: "INVESTIGATING",
  },
  {
    id: "zepto",
    name: "Zepto",
    type: "QUICK_COMMERCE",
    productSearch: false,
    price: false,
    stock: false,
    locationAvailability: false,
    deliveryEta: false,
    accessMethod: "UNVERIFIED",
    status: "INVESTIGATING",
  },
  {
    id: "instamart",
    name: "Swiggy Instamart",
    type: "QUICK_COMMERCE",
    productSearch: false,
    price: false,
    stock: false,
    locationAvailability: false,
    deliveryEta: false,
    accessMethod: "PARTNER_API",
    status: "INVESTIGATING",
  },
  {
    id: "amazon-now",
    name: "Amazon Now",
    type: "QUICK_COMMERCE",
    productSearch: false,
    price: false,
    stock: false,
    locationAvailability: false,
    deliveryEta: false,
    accessMethod: "OFFICIAL_API",
    status: "INVESTIGATING",
  },
  {
    id: "flipkart-minutes",
    name: "Flipkart Minutes",
    type: "QUICK_COMMERCE",
    productSearch: false,
    price: false,
    stock: false,
    locationAvailability: false,
    deliveryEta: false,
    accessMethod: "AFFILIATE_API",
    status: "INVESTIGATING",
  },
  {
    id: "jiomart",
    name: "JioMart",
    type: "ECOMMERCE",
    productSearch: false,
    price: false,
    stock: false,
    locationAvailability: false,
    deliveryEta: false,
    accessMethod: "PARTNER_API",
    status: "INVESTIGATING",
  },
  {
    id: "dmart-ready",
    name: "DMart Ready",
    type: "RETAIL",
    productSearch: false,
    price: false,
    stock: false,
    locationAvailability: false,
    deliveryEta: false,
    accessMethod: "UNVERIFIED",
    status: "INVESTIGATING",
  },
];
