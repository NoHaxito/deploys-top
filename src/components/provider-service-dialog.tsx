"use client";

import * as React from "react";
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
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="h-full text-start">{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <div className="flex gap-0.5 overflow-hidden whitespace-nowrap">
            {service.supported_types?.map((type) => (
              <Badge variant="outline" key={type}>
                {type}
              </Badge>
            ))}
          </div>
          <DialogHeader>
            <DialogTitle>{service.name}</DialogTitle>
            <DialogDescription>
              View information about the <b>{service.name}</b> service offered
              by <b>{provider.name}</b>.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="text-start">{children}</DrawerTrigger>
      <DrawerContent className="max-h-[96%]">
        <div className="mt-4 flex gap-0.5 overflow-hidden whitespace-nowrap px-4">
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
        <div className="overflow-auto"></div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
