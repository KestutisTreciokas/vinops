/**
 * Runtime required/optional env validation (S0 contract).
 * Fatal on missing required keys.
 */
const REQUIRED = ["BOT_TOKEN","POSTGRES_DSN","WEBAPP_BASE_URL","PAYMENTS_BASE_URL","NODE_ENV"];
const OPTIONAL = ["LOG_LEVEL","PORT","RATELIMIT_QPS","ALERT_BOT_TOKEN"];
function validateRuntimeEnv() {
  const missing = REQUIRED.filter(k => !process.env[k] || String(process.env[k]).trim()==="");
  if (missing.length) {
    console.error("[FATAL] Missing required env keys:", missing.join(","));
    process.exit(1);
  }
  return true;
}
if (require.main === module) validateRuntimeEnv();
module.exports = { validateRuntimeEnv, REQUIRED, OPTIONAL };
