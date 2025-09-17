import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BASE_URL, SUPPORTED_LANGS, type Lang, isValidVin, canonicalUrl, hreflangs } from "@/lib/seo";

type Props = { params: { lang: Lang; vin: string } };

function isTestVin(vin: string) {
  const list = (process.env.TEST_VINS ?? "").split(",").map(s => s.trim().toUpperCase()).filter(Boolean);
  return list.includes(vin.toUpperCase());
}

// TODO: replace with real fetch when data is wired
async function hasRealData(_vin: string): Promise<boolean> {
  return false; // no real data yet
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, vin } = params;
  const upperVin = vin.toUpperCase();

  // invalid VIN => 404 (Next will render global 404)
  if (!isValidVin(upperVin)) return { robots: { index: false, follow: true } };

  const path = `/${lang}/vin/${upperVin}`;
  const alt: Record<Lang,string> = {
    en: `/en/vin/${upperVin}`,
    ru: `/ru/vin/${upperVin}`,
  };

  const hasData = await hasRealData(upperVin);
  const isTest = isTestVin(upperVin);

  // Если данных нет и VIN не из тест-списка — 404
  if (!hasData && !isTest) {
    return {
      alternates: { canonical: canonicalUrl(path), languages: hreflangs(alt) },
      robots: { index: false, follow: true },
    };
  }

  // Заглушка/или реальная страница: noindex если данных нет
  const title = hasData ? `VIN ${upperVin} — vinops` : `VIN ${upperVin} (no data yet) — vinops`;
  const description = hasData
    ? "Auction history, photos, specs and sale results."
    : "We don't have data for this VIN yet. This page is not indexed.";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl(path),
      languages: hreflangs(alt),
    },
    robots: { index: hasData, follow: true },
    openGraph: {
      title,
      description,
      url: canonicalUrl(path),
      siteName: "vinops",
      type: "website",
    },
  };
}

export default async function VinPage({ params }: Props) {
  const { vin } = params;
  const upperVin = vin.toUpperCase();

  if (!isValidVin(upperVin)) {
    notFound();
  }

  const hasData = await hasRealData(upperVin);
  const isTest = isTestVin(upperVin);

  if (!hasData && !isTest) {
    // Чистый 404, чтобы не индексировать пустое
    notFound();
  }

  // Простая заглушка для тестовых VIN; реальную карточку подключим в Sprint 2
  return (
    <main className="container-prose py-8">
      <h1 className="h1 mb-4">VIN {upperVin}</h1>
      <p className="text-fg-muted">
        {hasData ? "Data available (placeholder)" : "No data yet — placeholder (robots: noindex)."}
      </p>
      <section className="mt-10 text-sm">
        <h2 className="font-semibold mb-2">Removal request</h2>
        <p>
          Email: <a href="mailto:request@vinops.online">request@vinops.online</a> • Telegram:{" "}
          <a href="https://t.me/keustis" target="_blank" rel="noreferrer">@keustis</a>
        </p>
        <p>Include VIN, reason and proof. SLA: up to 10 minutes (410 + CDN purge).</p>
      </section>
    </main>
  );
}
