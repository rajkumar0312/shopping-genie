import type {
  ConnectorProduct,
  NormalizedSearchQuery,
  PlatformConnector,
} from "../common/connector.js";

const FLIPKART_SEARCH_URL =
  "https://affiliate-api.flipkart.net/affiliate/1.0/search.json";

interface FlipkartProductBaseInfo {
  productId?: string;
  title?: string;
  imageUrls?: Record<string, string>;
  maximumRetailPrice?: { amount?: number; currency?: string };
  flipkartSellingPrice?: { amount?: number; currency?: string };
  flipkartSpecialPrice?: { amount?: number; currency?: string };
  sellingPrice?: { amount?: number; currency?: string };
  productUrl?: string;
  productBrand?: string;
  inStock?: boolean;
}

interface FlipkartSearchItem {
  productBaseInfoV1?: FlipkartProductBaseInfo;
}

interface FlipkartSearchResponse {
  productInfoList?: FlipkartSearchItem[];
}

export class FlipkartConnector implements PlatformConnector {
  readonly id = "flipkart";
  readonly name = "Flipkart";

  constructor(
    private readonly affiliateId: string,
    private readonly affiliateToken: string,
  ) {}

  async search(query: NormalizedSearchQuery): Promise<ConnectorProduct[]> {
    const url = new URL(FLIPKART_SEARCH_URL);
    url.searchParams.set("query", query.raw);
    url.searchParams.set("resultCount", "10");

    const response = await fetch(url, {
      headers: {
        "Fk-Affiliate-Id": this.affiliateId,
        "Fk-Affiliate-Token": this.affiliateToken,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Flipkart API returned HTTP ${response.status}`);
    }

    const payload = (await response.json()) as FlipkartSearchResponse;
    const now = new Date().toISOString();

    return (payload.productInfoList ?? [])
      .map((item) => item.productBaseInfoV1)
      .filter(
        (product): product is FlipkartProductBaseInfo =>
          Boolean(product?.productId && product.title),
      )
      .map((product) => {
        const imageUrl =
          product.imageUrls?.["400x400"] ?? product.imageUrls?.unknown;
        const price =
          product.flipkartSpecialPrice?.amount ??
          product.flipkartSellingPrice?.amount ??
          product.sellingPrice?.amount;

        return {
          platformProductId: product.productId!,
          title: product.title!,
          url:
            product.productUrl ??
            `https://www.flipkart.com/search?q=${encodeURIComponent(query.raw)}`,
          imageUrl,
          price,
          mrp: product.maximumRetailPrice?.amount,
          currency: "INR" as const,
          availability:
            product.inStock === true
              ? ("IN_STOCK" as const)
              : ("OUT_OF_STOCK" as const),
          deliveryText: undefined,
          lastCheckedAt: now,
        };
      });
  }
}
