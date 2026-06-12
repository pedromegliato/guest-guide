import { AccessSection } from "@/components/organisms/access-section";
import { AmenitiesSection } from "@/components/organisms/amenities-section";
import { BottomNav } from "@/components/organisms/bottom-nav";
import { ChatAssistantProvider } from "@/components/organisms/chat-assistant-context";
import { LazyChatAssistantPanel } from "@/components/organisms/chat-assistant-lazy";
import { ContactSection } from "@/components/organisms/contact-section";
import { ExperienceGuideSection } from "@/components/organisms/experience-guide-section";
import { GuideDesktopNav } from "@/components/organisms/guide-desktop-nav";
import { GuideHeader } from "@/components/organisms/guide-header";
import { MoraFloatingButton } from "@/components/organisms/mora-floating-button";
import { RulesSection } from "@/components/organisms/rules-section";
import { SiteHeader } from "@/components/organisms/site-header";
import {
  formatCityState,
  formatFullAddress,
  type Property,
} from "@/domain/property";

interface PropertyGuideTemplateProps {
  property: Property;
}

export function PropertyGuideTemplate({ property }: PropertyGuideTemplateProps) {
  return (
    <ChatAssistantProvider>
      <SiteHeader>
        <GuideDesktopNav />
      </SiteHeader>
      <div className="mx-auto w-full max-w-3xl px-4 pb-28 pt-5 md:pt-8">
        <GuideHeader property={property} />
        <main className="mt-7 grid gap-5">
          <AccessSection operational={property.operational} />
          <RulesSection rules={property.rules} />
          <AmenitiesSection amenities={property.amenities} />
          <ExperienceGuideSection
            code={property.code}
            route={{
              origin: formatFullAddress(property.address),
              destinationContext: formatCityState(property.address),
            }}
          />
          <ContactSection host={property.host} address={property.address} />
        </main>
        <LazyChatAssistantPanel
          code={property.code}
          propertyName={property.name}
        />
        <BottomNav />
        <MoraFloatingButton />
      </div>
    </ChatAssistantProvider>
  );
}
