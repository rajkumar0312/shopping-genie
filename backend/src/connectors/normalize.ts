import type {
  ConnectorProduct,
  NormalizedSearchQuery,
} from "../../../connectors/common/connector.js";
import type { ComparisonResult, PlatformType } from "../types.js";

const platformTypes: Record<string, PlatformType> = {
  amazon: "ECOMMERCE",
  flipkart: "ECOMMERCE",
  zepto: "QUICK_COMMERCE",
  blinkit: "QUICK_COMMERCE",
};

export function normalizeQuery(
  raw: string,
  location: Pick<NormalizedSearchQuery, "pincode" | "latitude" | "longitude">,
): NormalizedSearchQuery {
  return {
    raw: raw.trim(),
    ...location,
  };
}

export function toComparisonResult(
  connectorId: string,
  connectorName: string,
  product: ConnectorProduct,
): ComparisonResult {
  return {
    platform: connectorName,
    platformType: platformTypes[connectorId] ?? "RETAIL",
    productTitle: product.title,
    productUrl: product.url,
    price: product.price ?? null,
    mrp: product.mrp ?? null,
    currency: product.currency,
    availability: product.availability,
    deliveryText: product.deliveryText ?? null,
    lastCheckedAt: product.lastCheckedAt,
  };
}
