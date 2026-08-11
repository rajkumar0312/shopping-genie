CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS platforms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('ECOMMERCE', 'QUICK_COMMERCE', 'RETAIL')),
  enabled BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY,
  brand TEXT,
  name TEXT NOT NULL,
  model TEXT,
  variant TEXT,
  storage TEXT,
  color TEXT,
  size TEXT,
  pack_size TEXT,
  canonical_title TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS platform_products (
  id UUID PRIMARY KEY,
  product_id UUID REFERENCES products(id),
  platform_id TEXT NOT NULL REFERENCES platforms(id),
  platform_product_id TEXT NOT NULL,
  title TEXT NOT NULL,
  product_url TEXT NOT NULL,
  mrp NUMERIC(12,2),
  selling_price NUMERIC(12,2),
  currency TEXT NOT NULL DEFAULT 'INR',
  availability TEXT NOT NULL DEFAULT 'UNKNOWN',
  delivery_text TEXT,
  last_checked_at TIMESTAMPTZ,
  UNIQUE(platform_id, platform_product_id)
);

CREATE INDEX IF NOT EXISTS idx_platform_products_product
  ON platform_products(product_id);

CREATE INDEX IF NOT EXISTS idx_platform_products_platform
  ON platform_products(platform_id);

CREATE TABLE IF NOT EXISTS searches (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  query TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  pincode TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
