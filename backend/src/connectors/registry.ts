import type { PlatformConnector } from "./common/connector.js";
import { MockPlatformConnector } from "./mock_connector.js";
import { FlipkartConnector } from "./flipkart/connector.js";
import { SerpApiShoppingConnector } from "./serpapi/connector.js";

const mockConnectors: PlatformConnector[] = [
  new MockPlatformConnector("amazon", "Amazon", 1029, "IN_STOCK", "Tomorrow"),
  new MockPlatformConnector("zepto", "Zepto", 1049, "IN_STOCK", "12 mins"),
  new MockPlatformConnector("blinkit", "Blinkit", null, "OUT_OF_STOCK", undefined),
];

const flipkartAffiliateId = process.env.FLIPKART_AFFILIATE_ID?.trim();
const flipkartAffiliateToken = process.env.FLIPKART_AFFILIATE_TOKEN?.trim();
const serpApiKey = process.env.SERPAPI_API_KEY?.trim();

const serpApiConnectors: PlatformConnector[] = serpApiKey
  ? [new SerpApiShoppingConnector(serpApiKey)]
  : [];

const flipkartConnectors: PlatformConnector[] =
  flipkartAffiliateId && flipkartAffiliateToken
    ? [new FlipkartConnector(flipkartAffiliateId, flipkartAffiliateToken)]
    : [new MockPlatformConnector("flipkart", "Flipkart", 999, "IN_STOCK", "Tomorrow")];

export const activeConnectors: PlatformConnector[] = [
  ...serpApiConnectors,
  ...flipkartConnectors,
  ...mockConnectors,
];
