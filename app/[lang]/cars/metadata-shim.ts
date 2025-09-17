import type { Metadata } from "next";
import { type Lang } from "@/lib/seo";
import { carsMetadata } from "@/lib/canonical";

export async function generateMetadata(
  { params, searchParams }: { params: { lang: Lang }, searchParams: Record<string, string | string[] | undefined> }
): Promise<Metadata> {
  return carsMetadata(params.lang, searchParams);
}
