import type { PlatformConnector } from "./common/connector.js";
import { MockPlatformConnector } from "./mock_connector.js";

export const activeConnectors: PlatformConnector[] = [
  new MockPlatformConnector("flipkart", "Flipkart", 999, "IN_STOCK", "Tomorrow"),
  new MockPlatformConnector("amazon", "Amazon", 1029, "IN_STOCK", "Tomorrow"),
  new MockPlatformConnector("zepto", "Zepto", 1049, "IN_STOCK", "12 mins"),
  new MockPlatformConnector("blinkit", "Blinkit", null, "OUT_OF_STOCK", undefined),
];
