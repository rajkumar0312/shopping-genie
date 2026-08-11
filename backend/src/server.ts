import express from "express";
import cors from "cors";
import { z } from "zod";
import type { ComparisonResult } from "./types.js";

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
  res.json({ platforms });
});

app.post("/api/v1/search", (req, res) => {
  const parsed = searchSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "INVALID_SEARCH_REQUEST",
      details: parsed.error.flatten(),
    });
  }

  const { query, latitude, longitude, pincode } = parsed.data;

  // Sprint 1A mock data. Real connector results will replace this layer.
  const now = new Date().toISOString();

  const results: ComparisonResult[] = [
    {
      platform: "Flipkart",
      platformType: "ECOMMERCE",
      productTitle: query,
      productUrl: "https://www.flipkart.com/",
      price: 999,
      mrp: 1199,
      currency: "INR",
      availability: "IN_STOCK",
      deliveryText: "Tomorrow",
      lastCheckedAt: now,
    },
    {
      platform: "Amazon",
      platformType: "ECOMMERCE",
      productTitle: query,
      productUrl: "https://www.amazon.in/",
      price: 1029,
      mrp: 1199,
      currency: "INR",
      availability: "IN_STOCK",
      deliveryText: "Tomorrow",
      lastCheckedAt: now,
    },
    {
      platform: "Zepto",
      platformType: "QUICK_COMMERCE",
      productTitle: query,
      productUrl: "https://www.zeptonow.com/",
      price: 1049,
      mrp: 1199,
      currency: "INR",
      availability: "IN_STOCK",
      deliveryText: "12 mins",
      lastCheckedAt: now,
    },
    {
      platform: "Blinkit",
      platformType: "QUICK_COMMERCE",
      productTitle: query,
      productUrl: "https://blinkit.com/",
      price: null,
      mrp: null,
      currency: "INR",
      availability: "OUT_OF_STOCK",
      deliveryText: null,
      lastCheckedAt: now,
    },
  ];

  res.json({
    query,
    location: { latitude, longitude, pincode },
    results,
    meta: {
      source: "MOCK_SPRINT_1A",
      note: "Replace mock results with authorized platform connectors after access verification.",
    },
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Shopping Genie backend listening on http://${HOST}:${PORT}`);
});
