import { AccessSection } from "@/components/organisms/access-section";
import { AmenitiesSection } from "@/components/organisms/amenities-section";
import { ChatAssistant } from "@/components/organisms/chat-assistant";
import { ContactSection } from "@/components/organisms/contact-section";
import { ExperienceGuideSection } from "@/components/organisms/experience-guide-section";
import { GuideHeader } from "@/components/organisms/guide-header";
import { RulesSection } from "@/components/organisms/rules-section";
import type { Property } from "@/domain/property";

interface PropertyGuideTemplateProps {
  property: Property;
}

export function PropertyGuideTemplate({ property }: PropertyGuideTemplateProps) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-28 pt-5 md:pt-8">
      <GuideHeader property={property} />
      <main className="mt-7 grid gap-5">
        <AccessSection operational={property.operational} />
        <RulesSection rules={property.rules} />
        <AmenitiesSection amenities={property.amenities} />
        <ExperienceGuideSection code={property.code} />
        <ContactSection host={property.host} address={property.address} />
      </main>
      <ChatAssistant code={property.code} propertyName={property.name} />
    </div>
  );
}
