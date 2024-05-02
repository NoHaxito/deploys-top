"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { cn } from "@/lib/utils";
import type { Provider, ServiceOffered } from "@/types/provider";
import { Badge } from "./ui/badge";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export function ProviderServiceDialog({
  children,
  provider,
  service,
}: {
  children: React.ReactNode;
  provider: Provider;
  service: ServiceOffered;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          disabled={service.disabled}
          className="h-full text-start"
        >
          {children}
        </DialogTrigger>
        <DialogContent className="max-h-[90%] overflow-y-auto sm:max-w-[600px]">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className=" flex gap-0.5 overflow-hidden overflow-x-auto whitespace-nowrap pb-3">
              {service.supported_types?.map((type) => (
                <Badge variant="outline" key={type}>
                  {type}
                </Badge>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <DialogHeader>
            <DialogTitle>{service.name}</DialogTitle>
            <DialogDescription>
              View information about the <b>{service.name}</b> service offered
              by <b>{provider.name}</b>.
            </DialogDescription>
          </DialogHeader>
          <div className="">
            {open && (
              <Accordion
                type="multiple"
                defaultValue={["pricing-free_tier"]}
                className="w-full"
              >
                {Object.entries(service.pricing).map(([key, value]) => (
                  <AccordionItem
                    className={cn(
                      Object.entries(service.pricing).length === 1 &&
                        "border-transparent",
                    )}
                    key={`pricing-${key}`}
                    value={`pricing-${key}`}
                  >
                    <AccordionTrigger>
                      <p className="capitalize">{key.replaceAll("_", " ")}</p>
                    </AccordionTrigger>
                    <AccordionContent className="px-2">
                      <Accordion type="multiple">
                        {value.map((item) => (
                          <AccordionItem
                            value={`pricing-${key}-${item.type.toLowerCase().replaceAll(" ", "-")}`}
                          >
                            <AccordionTrigger className="py-2">
                              <p className="text-md font-semibold capitalize">
                                {item.type}
                              </p>
                            </AccordionTrigger>
                            <AccordionContent className="space-y-1">
                              {Object.entries(item).map(
                                ([key, value], entryIndex) => {
                                  if (
                                    key === "_key" ||
                                    key === null ||
                                    (key === "type" && value === item.type)
                                  )
                                    return;
                                  return (
                                    <div
                                      key={entryIndex}
                                      className="flex items-center justify-between gap-2"
                                    >
                                      <p className="capitalize">
                                        {key.replaceAll("_", " ")}
                                      </p>
                                      <p>{value}</p>
                                    </div>
                                  );
                                },
                              )}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger disabled={service.disabled} className="text-start">
        {children}
      </DrawerTrigger>
      <DrawerContent className="max-h-[96%]">
        <div className="mt-4 flex gap-0.5 overflow-y-auto whitespace-nowrap pb-3 px-4">
          {service.supported_types?.map((type) => (
            <Badge variant="outline" key={type}>
              {type}
            </Badge>
          ))}
        </div>
        <DrawerHeader className="text-left">
          <DrawerTitle>{service.name}</DrawerTitle>
          <DrawerDescription>
            View information about the <b>{service.name}</b> service offered by{" "}
            <b>{provider.name}</b>.
          </DrawerDescription>
        </DrawerHeader>
        <div className="overflow-hidden overflow-y-auto px-4">
          {open && (
            <Accordion
              type="multiple"
              defaultValue={["pricing-free_tier"]}
              className="w-full"
            >
              {Object.entries(service.pricing).map(([key, value]) => (
                <AccordionItem
                  className={cn(
                    Object.entries(service.pricing).length === 1 &&
                      "border-transparent",
                  )}
                  key={`pricing-${key}`}
                  value={`pricing-${key}`}
                >
                  <AccordionTrigger>
                    <p className="capitalize">{key.replaceAll("_", " ")}</p>
                  </AccordionTrigger>
                  <AccordionContent className="px-2">
                    <Accordion type="multiple">
                      {value.map((item) => (
                        <AccordionItem
                          value={`pricing-${key}-${item.type.toLowerCase().replaceAll(" ", "-")}`}
                        >
                          <AccordionTrigger className="py-2">
                            <p className="text-md font-semibold capitalize">
                              {item.type}
                            </p>
                          </AccordionTrigger>
                          <AccordionContent className="space-y-1">
                            {Object.entries(item).map(
                              ([key, value], entryIndex) => {
                                if (
                                  key === "_key" ||
                                  key === null ||
                                  (key === "type" && value === item.type)
                                )
                                  return;
                                return (
                                  <div
                                    key={entryIndex}
                                    className="flex items-center justify-between gap-2"
                                  >
                                    <p className="capitalize">
                                      {key.replaceAll("_", " ")}
                                    </p>
                                    <p>{value}</p>
                                  </div>
                                );
                              },
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
