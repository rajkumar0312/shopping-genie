import type { PlatformConnector } from "./common/connector.js";
import { MockPlatformConnector } from "./mock_connector.js";
import { FlipkartConnector } from "./flipkart/connector.js";

const mockConnectors: PlatformConnector[] = [
  new MockPlatformConnector("amazon", "Amazon", 1029, "IN_STOCK", "Tomorrow"),
  new MockPlatformConnector("zepto", "Zepto", 1049, "IN_STOCK", "12 mins"),
  new MockPlatformConnector("blinkit", "Blinkit", null, "OUT_OF_STOCK", undefined),
];

const flipkartAffiliateId = process.env.FLIPKART_AFFILIATE_ID?.trim();
const flipkartAffiliateToken = process.env.FLIPKART_AFFILIATE_TOKEN?.trim();

export const activeConnectors: PlatformConnector[] =
  flipkartAffiliateId && flipkartAffiliateToken
    ? [
        new FlipkartConnector(flipkartAffiliateId, flipkartAffiliateToken),
        ...mockConnectors,
      ]
    : [
        new MockPlatformConnector("flipkart", "Flipkart", 999, "IN_STOCK", "Tomorrow"),
        ...mockConnectors,
      ];
