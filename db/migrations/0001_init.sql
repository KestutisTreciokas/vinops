CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS vehicles (
  vin CHAR(17) PRIMARY KEY,
  make TEXT, model TEXT, year INTEGER,
  body TEXT, fuel TEXT, transmission TEXT, drive TEXT, engine TEXT
);

CREATE TABLE IF NOT EXISTS lots (
  id BIGSERIAL PRIMARY KEY,
  vin CHAR(17) NOT NULL REFERENCES vehicles(vin) ON DELETE CASCADE,
  source TEXT NOT NULL DEFAULT 'COPART',
  site_code TEXT, city TEXT, region TEXT, country TEXT, tz TEXT,
  auction_datetime_utc TIMESTAMPTZ,
  retail_value_usd NUMERIC,
  status TEXT
);
CREATE INDEX IF NOT EXISTS idx_lots_vin ON lots(vin);
CREATE INDEX IF NOT EXISTS idx_lots_auction_dt ON lots(auction_datetime_utc DESC);

CREATE TABLE IF NOT EXISTS sale_events (
  id BIGSERIAL PRIMARY KEY,
  vin CHAR(17) NOT NULL REFERENCES vehicles(vin) ON DELETE CASCADE,
  lot_id BIGINT REFERENCES lots(id) ON DELETE CASCADE,
  sale_date DATE,
  status TEXT,
  final_bid_usd NUMERIC,
  currency TEXT,
  collected_via TEXT
);
CREATE INDEX IF NOT EXISTS idx_sale_events_vin ON sale_events(vin);
CREATE INDEX IF NOT EXISTS idx_sale_events_date ON sale_events(sale_date DESC);

CREATE TABLE IF NOT EXISTS images (
  id BIGSERIAL PRIMARY KEY,
  vin CHAR(17) NOT NULL REFERENCES vehicles(vin) ON DELETE CASCADE,
  lot_id BIGINT REFERENCES lots(id) ON DELETE CASCADE,
  seq INTEGER,
  variant TEXT,
  storage_key TEXT,
  source_url TEXT,
  width INTEGER,
  height INTEGER,
  bytes INTEGER,
  content_hash TEXT
);
CREATE INDEX IF NOT EXISTS idx_images_vin ON images(vin);
CREATE INDEX IF NOT EXISTS idx_images_lot_seq ON images(lot_id, seq);
