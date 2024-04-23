import { LucideChevronLeft, LucideChevronRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderDescription,
  PageHeaderTitle,
} from "@/components/ui/page-header";
import { providers } from "@/lib/data";

export function generateMetadata({
  params,
}: {
  params: { provider: string };
}): Metadata {
  const provider = providers.find(
    (provider) =>
      provider.name.toLowerCase().replace(" ", "-").replace(".", "-") ===
      params.provider.toLowerCase(),
  );

  return {
    title: provider?.name,
    description: "Search and compare free and paid providers.",
  };
}

export default function ProviderPage({
  params,
}: {
  params: { provider: string };
}) {
  const provider = providers.find(
    (provider) =>
      provider.name.toLowerCase().replace(" ", "-").replace(".", "-") ===
      params.provider.toLowerCase(),
  );
  if (!provider) return notFound();
  return (
    <div className="space-y-2">
      <Button className="mb-4 h-8 rounded-full" asChild variant="secondary">
        <Link href={"/providers"}>
          <LucideChevronLeft className="size-4" />
          Back to providers
        </Link>
      </Button>
      <PageHeader>
        <PageHeaderTitle
          icon={<img src={provider.icon} className="aspect-square size-12" />}
        >
          {provider.name}
        </PageHeaderTitle>
        <PageHeaderDescription>{provider.description}</PageHeaderDescription>
        <PageHeaderActions className="grid w-full grid-cols-2 sm:flex sm:w-max">
          <Button
            className="group h-8"
            asChild
            Icon={LucideChevronRight}
            iconPlacement="right"
          >
            <Link href={provider.href} target="_blank">
              Website
            </Link>
          </Button>
          <Button
            variant="outline"
            className="group h-8"
            asChild
            Icon={LucideChevronRight}
            iconPlacement="right"
          >
            <Link href={provider.pricing_href} target="_blank">
              Pricing
            </Link>
          </Button>
        </PageHeaderActions>
      </PageHeader>
      <div className="space-x-0.5">
        {provider.services_offered.map((service) => (
          <Badge
            variant="secondary"
            key={service.name.toLowerCase()}
            className="capitalize"
          >
            {service.name}
          </Badge>
        ))}
        {provider.is_serverless && (
          <Badge variant="secondary" className="capitalize">
            Serverless
          </Badge>
        )}
      </div>
      <p className="text-lg font-bold">Services Offered</p>
      {provider.services_offered.map((service) => (
        <div key={service.name.toLowerCase()} className="space-y-2">
          <h2 className="font-medium capitalize">{service.name}</h2>
          {service.supported_types && (
            <div>
              {service.supported_types?.map((type) => <Badge>{type}</Badge>)}
            </div>
          )}
          <p>Free tier included:</p>
          {service.pricing?.free_tier?.map((item, index) => (
            <div key={index}>
              <h2 className="capitalize">{item.type}</h2>
              {Object.entries(item).map(
                ([key, value], entryIndex) =>
                  key !== "type" && (
                    <p key={entryIndex} className="capitalize">
                      {key.replaceAll("_", " ")}: {String(value)}
                    </p>
                  ),
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
