INSERT INTO vehicles (vin, make, model, year, body, fuel, transmission, drive, engine)
VALUES ('WAUZZZAAAAAAAAAAA', 'AUDI', 'A4', 2016, 'SEDAN', 'GAS', 'AUTO', 'FWD', '2.0L')
ON CONFLICT (vin) DO NOTHING;

INSERT INTO lots (vin, source, site_code, city, region, country, tz, auction_datetime_utc, retail_value_usd, status)
VALUES ('WAUZZZAAAAAAAAAAA', 'COPART', 'CA-SAC', 'Sacramento', 'CA', 'US', 'America/Los_Angeles',
        NOW() - INTERVAL '1 day', 15500, 'PENDING_RESULT')
ON CONFLICT DO NOTHING;

WITH last_lot AS (
  SELECT id FROM lots WHERE vin='WAUZZZAAAAAAAAAAA' ORDER BY auction_datetime_utc DESC LIMIT 1
)
INSERT INTO images (vin, lot_id, seq, variant, storage_key, width, height, bytes)
SELECT 'WAUZZZAAAAAAAAAAA', id, 1, 'xl', 'img/copart/WAUZZZAAAAAAAAAAA/'||id||'/xl/1.webp', 1280, 720, 350000 FROM last_lot
ON CONFLICT DO NOTHING;
