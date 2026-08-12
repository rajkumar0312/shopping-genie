import type {
  ConnectorProduct,
  NormalizedSearchQuery,
  PlatformConnector,
} from "./common/connector.js";

export class MockPlatformConnector implements PlatformConnector {
  constructor(
    public readonly id: string,
    public readonly name: string,
    private readonly price: number | null,
    private readonly availability: ConnectorProduct["availability"],
    private readonly deliveryText: string | undefined,
  ) {}

  async search(query: NormalizedSearchQuery): Promise<ConnectorProduct[]> {
    const now = new Date().toISOString();

    return [
      {
        platformProductId: `${this.id}-mock-${query.raw.toLowerCase().replace(/\s+/g, "-")}`,
        title: query.raw,
        url: `https://example.com/${this.id}`,
        price: this.price ?? undefined,
        mrp: this.price == null ? undefined : this.price + 200,
        currency: "INR",
        availability: this.availability,
        deliveryText: this.deliveryText,
        lastCheckedAt: now,
      },
    ];
  }
}
