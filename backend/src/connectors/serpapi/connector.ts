import type {
  ConnectorProduct,
  NormalizedSearchQuery,
  PlatformConnector,
} from "../common/connector.js";

const SERPAPI_URL = "https://serpapi.com/search.json";

type ShoppingResult = {
  product_id?: string;
  title?: string;
  link?: string;
  product_link?: string;
  thumbnail?: string;
  price?: string;
  extracted_price?: number;
  old_price?: string;
  extracted_old_price?: number;
  source?: string;
  delivery?: string;
  shipping?: string;
  availability?: string;
};

interface SerpApiShoppingResponse {
  shopping_results?: ShoppingResult[];
  error?: string;
}

function parsePrice(value?: string): number | undefined {
  if (!value) return undefined;
  const normalized = value.replace(/[^0-9.]/g, "");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function availabilityFromText(value?: string): ConnectorProduct["availability"] {
  const text = value?.toLowerCase() ?? "";
  if (text.includes("out of stock") || text.includes("unavailable")) return "OUT_OF_STOCK";
  if (text.includes("limited")) return "LIMITED";
  if (text.includes("in stock") || text.includes("available")) return "IN_STOCK";
  return "UNKNOWN";
}

export class SerpApiShoppingConnector implements PlatformConnector {
  readonly id = "google-shopping";
  readonly name = "Google Shopping";

  constructor(private readonly apiKey: string) {}

  async search(query: NormalizedSearchQuery): Promise<ConnectorProduct[]> {
    const url = new URL(SERPAPI_URL);
    url.searchParams.set("engine", "google_shopping");
    url.searchParams.set("q", query.raw);
    url.searchParams.set("api_key", this.apiKey);
    url.searchParams.set("gl", "in");
    url.searchParams.set("hl", "en");

    // Use a city-level location when we have a pincode. Exact pincode-to-city
    // resolution will be added later; we don't pretend it is exact yet.
    if (query.pincode) {
      url.searchParams.set("location", query.pincode);
    }

    const response = await fetch(url);
    const payload = (await response.json()) as SerpApiShoppingResponse;

    if (!response.ok || payload.error) {
      throw new Error(payload.error ?? `SerpApi returned HTTP ${response.status}`);
    }

    const now = new Date().toISOString();

    return (payload.shopping_results ?? []).map((item, index) => ({
      platformProductId: item.product_id ?? `${item.source ?? "merchant"}-${index}`,
      title: item.title ?? "Unknown product",
      url: item.link ?? item.product_link ?? "",
      imageUrl: item.thumbnail,
      price: item.extracted_price ?? parsePrice(item.price),
      mrp: item.extracted_old_price ?? parsePrice(item.old_price),
      currency: "INR" as const,
      availability: availabilityFromText(item.availability),
      deliveryText: item.delivery ?? item.shipping,
      lastCheckedAt: now,
    }));
  }
}
