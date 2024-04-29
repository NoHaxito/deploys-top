import { LucideChevronLeft, LucideInfo } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProviderHeader } from "@/components/provider-header";
import { ProviderServiceDialog } from "@/components/provider-service-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { providers } from "@/lib/data";

// import { SupportedTypesPopover } from "./_test";

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
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://deploy.nohaxito.xyz",
      title: `${provider?.name} - Deploys.top`,
      description: "Search and compare free and paid providers.",
      siteName: "Deploys.top",
      images: [
        {
          url: `https://deploy.nohaxito.xyz/api/og-image?provider=${provider.name.toLowerCase().replaceAll(' ', '-').replaceAll('.', '-')}`,
          width: 1200,
          height: 630,
          alt: "Deploys.top",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${provider?.name} - Deploys.top`,
      description: "Search and compare free and paid providers.",
      images: [`https://deploy.nohaxito.xyz/api/og-image?provider=${provider.name.toLowerCase().replaceAll(' ', '-').replaceAll('.', '-')}`],
    },
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
  const providerCategories = [
    ...new Set(
      provider.services_offered.map(({ category_name }) => category_name!),
    ),
  ];

  return (
    <div className="space-y-6">
      <Button
        className="mb-4 h-8 rounded-full md:hidden"
        asChild
        variant="secondary"
      >
        <Link href={"/providers"}>
          <LucideChevronLeft className="size-4" />
          Back to providers
        </Link>
      </Button>
      <ProviderHeader provider={provider} />
      <section id="provider-categories" className="space-y-2">
        <h3 className="text-lg font-bold">Categories</h3>
        <div className="space-x-0.5">
          {providerCategories.map((category_name) => {
            if (!category_name) return;
            return (
              <Link
                href={`/providers?category=${category_name.toLowerCase().replaceAll(" ", "-").replace(".", "-")}`}
                key={category_name.toLowerCase().replaceAll(" ", "-")}
              >
                <Badge
                  variant="secondary"
                  className="h-8 rounded-lg capitalize"
                >
                  {category_name?.replaceAll("_", " ")}
                </Badge>
              </Link>
            );
          })}
          {provider.is_serverless && (
            <Badge variant="secondary" className="capitalize">
              Serverless
            </Badge>
          )}
        </div>
      </section>
      <section id="provider-services-offered" className="space-y-2">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold">Services Offered</h3>
          <Popover>
            <PopoverTrigger>
              <LucideInfo className="size-4" />
              <span className="sr-only">See info about services offered</span>
            </PopoverTrigger>
            <PopoverContent className="p-2 text-sm">
              Click on each service card to see more info.
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid h-full gap-4 sm:grid-cols-2">
          {provider.services_offered.map((service) => (
            <ProviderServiceDialog
              service={service}
              provider={provider}
              key={service.name.toLowerCase()}
            >
              <Card className="relative">
                <div className="absolute -top-2.5 right-2 rounded-lg border bg-background px-2 py-0.5 text-xs">
                  Free Tier
                </div>
                <CardHeader className="px-4 py-3">
                  <CardTitle className="text-md capitalize">
                    {service.name}
                  </CardTitle>
                  <CardDescription>
                    {service.description ??
                      "No description provided for this service."}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="px-4 py-3 pt-0">
                  {service.supported_types && (
                    <>
                      <div className="hidden gap-0.5 overflow-hidden whitespace-nowrap xs:flex">
                        {service.supported_types?.map((type) => (
                          <Badge variant="outline" key={type}>
                            {type}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-0.5 xs:hidden">
                        <Badge variant="outline">
                          {service.supported_types?.[0]}
                        </Badge>

                        {service.supported_types?.length > 1 && (
                          <Badge
                            title={`${service.supported_types.join(", ")}`}
                            variant="outline"
                          >
                            +{service.supported_types?.length - 1} more
                          </Badge>
                        )}
                      </div>
                    </>
                  )}
                </CardFooter>
              </Card>
            </ProviderServiceDialog>
          ))}
        </div>
        {/* <p>Free tier included:</p> */}
        {/* {service.pricing?.free_tier?.map((item, index) => (
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
     ))} */}
        {/* </div> */}
      </section>
    </div>
  );
}
