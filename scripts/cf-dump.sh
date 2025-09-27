#!/usr/bin/env sh
set +e
: "${CF_API_TOKEN:?CF_API_TOKEN is required}"
: "${CF_ZONE_ID:?CF_ZONE_ID is required}"
OUT_DIR="${1:-./evidence/ms-01-00/cf}"
mkdir -p "$OUT_DIR" || true
curl -sS -H "Authorization: Bearer ${CF_API_TOKEN}" -H "Content-Type: application/json" \
  "https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}" > "$OUT_DIR/zone.json"
curl -sS -H "Authorization: Bearer ${CF_API_TOKEN}" "https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/settings/ssl" > "$OUT_DIR/ssl.json"
curl -sS -H "Authorization: Bearer ${CF_API_TOKEN}" "https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/settings/always_use_https" > "$OUT_DIR/always_use_https.json"
curl -sS -H "Authorization: Bearer ${CF_API_TOKEN}" "https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/settings/security_header" > "$OUT_DIR/security_header.json"
curl -sS -H "Authorization: Bearer ${CF_API_TOKEN}" "https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/pagerules" > "$OUT_DIR/pagerules.json"
curl -sS -H "Authorization: Bearer ${CF_API_TOKEN}" "https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/rulesets" > "$OUT_DIR/rulesets.json"
for phase in http_request_transform http_request_redirect http_response_headers; do
  curl -sS -H "Authorization: Bearer ${CF_API_TOKEN}" \
    "https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/rulesets/phases/${phase}/entrypoint" \
    > "$OUT_DIR/ruleset_${phase}_entrypoint.json"
done
echo "Cloudflare dumps saved to $OUT_DIR"
