"use strict";

/**
 * env.js — единая точка чтения/валидации окружения для vinops-tg-bot (MS-S2.5-01)
 * Политики:
 * - PROD требует: BOT_MODE=webhook, WEBHOOK_PUBLIC_URL, WEBHOOK_SECRET, REPLY_MODE=telegram
 * - DRY_RUN и WEBHOOK_ONLY — депрециированы; допускаются только вне PROD; в PROD → фатал.
 */

const isProd = (process.env.NODE_ENV || "").toLowerCase() === "production";

/** Back-compat адаптация старых флагов (только вне PROD) */
function applyBackCompat() {
  const hasDRY = process.env.DRY_RUN && process.env.DRY_RUN !== "0";
  const hasWHOnly = process.env.WEBHOOK_ONLY && process.env.WEBHOOK_ONLY !== "0";

  // BOT_MODE: webhook/polling
  if (!process.env.BOT_MODE) {
    if (hasWHOnly) process.env.BOT_MODE = "webhook";
    else process.env.BOT_MODE = "polling";
  }

  // REPLY_MODE: telegram|log|both
  if (!process.env.REPLY_MODE) {
    process.env.REPLY_MODE = hasDRY ? "log" : "telegram";
  }
}

/** Жёсткая валидация PROD */
function validateProd() {
  const missing = [];
  if (!process.env.BOT_MODE) missing.push("BOT_MODE");
  if (!process.env.WEBHOOK_PUBLIC_URL) missing.push("WEBHOOK_PUBLIC_URL");
  if (!process.env.WEBHOOK_SECRET) missing.push("WEBHOOK_SECRET");
  if (!process.env.REPLY_MODE) missing.push("REPLY_MODE");

  // Депрециированные ключи в проде запрещены
  const hasDRY = process.env.DRY_RUN && process.env.DRY_RUN !== "0";
  const hasWHOnly = process.env.WEBHOOK_ONLY && process.env.WEBHOOK_ONLY !== "0";
  if (hasDRY) {
    throw new Error("PROD forbidden: DRY_RUN detected. Use REPLY_MODE=telegram (no DRY).");
  }
  if (hasWHOnly) {
    // Допускается только если все обязательные выставлены явно
    if (!process.env.WEBHOOK_PUBLIC_URL) {
      throw new Error("PROD forbidden: WEBHOOK_ONLY without WEBHOOK_PUBLIC_URL.");
    }
  }

  if (missing.length) {
    throw new Error("Missing required PROD env: " + missing.join(", "));
  }
  if (String(process.env.BOT_MODE).toLowerCase() !== "webhook") {
    throw new Error("PROD requires BOT_MODE=webhook.");
  }
  if (String(process.env.REPLY_MODE).toLowerCase() !== "telegram") {
    throw new Error("PROD requires REPLY_MODE=telegram.");
  }
}

/** Публичные геттеры */
function snapshot() {
  return {
    NODE_ENV: process.env.NODE_ENV || "",
    BOT_MODE: process.env.BOT_MODE || "",
    WEBHOOK_PUBLIC_URL: process.env.WEBHOOK_PUBLIC_URL || "",
    WEBHOOK_SECRET: process.env.WEBHOOK_SECRET ? "<hidden>" : "",
    REPLY_MODE: process.env.REPLY_MODE || "",
    POSTGRES_DSN: process.env.POSTGRES_DSN ? "<hidden>" : "",
    WEBAPP_BASE_URL: process.env.WEBAPP_BASE_URL || "",
  };
}

// Применяем BC и/или валидируем
if (!isProd) {
  applyBackCompat();
} else {
  validateProd();
}

// Небольшой отчёт в лог (без секретов)
const snap = snapshot();
console.info("[env] NODE_ENV=%s BOT_MODE=%s REPLY_MODE=%s WEBHOOK_PUBLIC_URL=%s WEBAPP_BASE_URL=%s",
  snap.NODE_ENV, snap.BOT_MODE, snap.REPLY_MODE, snap.WEBHOOK_PUBLIC_URL, snap.WEBAPP_BASE_URL);

module.exports = {
  isProd,
  BOT_MODE: process.env.BOT_MODE,
  WEBHOOK_PUBLIC_URL: process.env.WEBHOOK_PUBLIC_URL,
  WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
  REPLY_MODE: process.env.REPLY_MODE,
};
