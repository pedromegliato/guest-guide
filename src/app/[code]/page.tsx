import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { PropertyGuideTemplate } from "@/components/templates/property-guide-template";
import { formatLocation, normalizePropertyCode } from "@/domain/property";
import { getPropertyRepository } from "@/di/container";

const findProperty = cache((code: string) =>
  getPropertyRepository().findByCode(normalizePropertyCode(code)),
);

interface PageProps {
  params: Promise<{ code: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { code } = await params;
  const property = await findProperty(code);
  if (!property) {
    return { title: "Imóvel não encontrado" };
  }
  return {
    title: property.name,
    description: `Guia digital da sua estadia em ${property.name}, ${formatLocation(property.address)}.`,
  };
}

export default async function PropertyGuidePage({ params }: PageProps) {
  const { code } = await params;
  const property = await findProperty(code);
  if (!property) {
    notFound();
  }
  return <PropertyGuideTemplate property={property} />;
}
