import type { Metadata } from "next";
import { type Lang } from "@/lib/seo";
import { carsMetadata } from "@/lib/canonical";

export async function generateMetadata(
  { params, searchParams }: { params: { lang: Lang }, searchParams: Record<string, string | string[] | undefined> }
): Promise<Metadata> {
  return carsMetadata(params.lang, searchParams);
}

export default function CarsPage() {
  return (
    <main className="container-prose py-8">
      <h1 className="h1 mb-4">Catalog</h1>
      <p className="text-fg-muted">Server-rendered list (placeholder).</p>
    </main>
  );
}
