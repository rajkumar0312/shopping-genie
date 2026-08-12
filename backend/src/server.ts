import express from "express";
import cors from "cors";
import { z } from "zod";
import { activeConnectors } from "./connectors/registry.js";
import { normalizeQuery, toComparisonResult } from "./connectors/normalize.js";

const app = express();
app.use(cors());
app.use(express.json());

// Keep the backend port configurable. 8081 avoids conflicts with local Windows services.
const PORT = Number(process.env.PORT ?? 8081);
const HOST = process.env.HOST ?? "0.0.0.0";

const searchSchema = z.object({
  query: z.string().trim().min(1),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  pincode: z.string().optional(),
});

const platforms = [
  { id: "amazon", name: "Amazon", type: "ECOMMERCE" },
  { id: "flipkart", name: "Flipkart", type: "ECOMMERCE" },
  { id: "blinkit", name: "Blinkit", type: "QUICK_COMMERCE" },
  { id: "zepto", name: "Zepto", type: "QUICK_COMMERCE" },
  { id: "instamart", name: "Swiggy Instamart", type: "QUICK_COMMERCE" },
  { id: "amazon-now", name: "Amazon Now", type: "QUICK_COMMERCE" },
  { id: "flipkart-minutes", name: "Flipkart Minutes", type: "QUICK_COMMERCE" },
  { id: "jiomart", name: "JioMart", type: "ECOMMERCE" },
  { id: "dmart-ready", name: "DMart Ready", type: "RETAIL" },
  { id: "croma", name: "Croma", type: "RETAIL" },
  { id: "reliance-digital", name: "Reliance Digital", type: "RETAIL" },
  { id: "vijay-sales", name: "Vijay Sales", type: "RETAIL" },
] as const;

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "shopping-genie-backend", version: "0.1.0" });
});

app.get("/api/v1/platforms", (_req, res) => {
  res.json({
    platforms,
    activeConnectors: activeConnectors.map((connector) => ({
      id: connector.id,
      name: connector.name,
    })),
  });
});

app.post("/api/v1/search", async (req, res) => {
  const parsed = searchSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "INVALID_SEARCH_REQUEST",
      details: parsed.error.flatten(),
    });
  }

  const { query, latitude, longitude, pincode } = parsed.data;
  const normalizedQuery = normalizeQuery(query, { pincode, latitude, longitude });

  try {
    const connectorResults = await Promise.all(
      activeConnectors.map(async (connector) => ({
        connector,
        products: await connector.search(normalizedQuery),
      })),
    );

    const results = connectorResults.flatMap(({ connector, products }) =>
      products.map((product) =>
        toComparisonResult(connector.id, connector.name, product),
      ),
    );

    const hasLiveConnector = activeConnectors.some(
      (connector) => connector.id === "google-shopping" || connector.id === "flipkart",
    );

    res.json({
      query,
      location: { latitude, longitude, pincode },
      results,
      meta: {
        source: hasLiveConnector ? "CONNECTOR_LAYER" : "CONNECTOR_LAYER_MOCK",
        activeConnectors: activeConnectors.map((connector) => connector.id),
        note: hasLiveConnector
          ? "Results include data from configured live connectors and any remaining mock connectors."
          : "Connector layer is active. Configure an authorized live connector to replace mock results.",
      },
    });
  } catch (error) {
    console.error("Connector search failed", error);
    res.status(502).json({
      error: "CONNECTOR_SEARCH_FAILED",
      message: "One or more shopping connectors failed while searching.",
    });
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Shopping Genie backend listening on http://${HOST}:${PORT}`);
});
