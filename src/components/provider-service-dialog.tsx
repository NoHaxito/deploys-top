"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import type { Provider, ServiceOffered } from "@/types/provider";
import * as React from "react";
import { Badge } from "./ui/badge";

import { LucideArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "./ui/checkbox";
import {
	Credenza,
	CredenzaClose,
	CredenzaContent,
	CredenzaDescription,
	CredenzaFooter,
	CredenzaHeader,
	CredenzaTitle,
	CredenzaTrigger,
} from "./ui/credenza";

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

	return (
		<Credenza open={open} onOpenChange={setOpen}>
			<CredenzaTrigger className="text-start">{children}</CredenzaTrigger>
			<CredenzaContent className="max-h-[96%] sm:overflow-hidden sm:overflow-y-auto">
				{service.supported_types?.length && (
					<div className="mt-3 flex gap-0.5 overflow-y-auto whitespace-nowrap px-4 pb-3 sm:px-0">
						{service.supported_types?.map((type) => (
							<Badge variant="outline" key={type}>
								{type}
							</Badge>
						))}
					</div>
				)}
				<CredenzaHeader className="text-left">
					<CredenzaTitle>{service.name}</CredenzaTitle>
					<CredenzaDescription>
						View information about the <b>{service.name}</b> service offered by{" "}
						<b>{provider.name}</b>.
					</CredenzaDescription>
				</CredenzaHeader>
				<div className="overflow-hidden overflow-y-auto px-4 sm:overflow-hidden sm:overflow-y-hidden sm:px-0">
					{
						<Accordion
							type="multiple"
							defaultValue={[
								`pricing-${service.pricing.plans[0].name.toLowerCase()}`,
							]}
							className="w-full space-y-0.5"
						>
							{service.pricing.plans.map((plan) => (
								<AccordionItem
									className="border border-transparent px-3 transition-all data-[state=open]:rounded-lg data-[state=open]:border-border data-[state=open]:bg-accent/50"
									key={`pricing-${plan.name.toLowerCase()}`}
									value={`pricing-${plan.name.toLowerCase()}`}
								>
									<AccordionTrigger>
										<p className="capitalize">{plan.name}</p>
									</AccordionTrigger>
									<AccordionContent className="px-2">
										<Accordion type="multiple" className="space-y-0.5">
											{plan.plan_features.map((feature) => (
												<AccordionItem
													className="border border-transparent px-3 transition-all data-[state=open]:rounded-lg data-[state=open]:border-border data-[state=open]:bg-accent/90"
													value={feature.name.toLowerCase().replace(" ", "_")}
													key={feature.name.toLowerCase().replace(" ", "_")}
												>
													<AccordionTrigger className="py-2">
														<p>{feature.name}</p>
													</AccordionTrigger>
													<AccordionContent className="px-1">
														{feature.values.map(
															({ key, value }, index: number) => (
																<div
																	key={`${key.replaceAll("_", " ")}-${index}`}
																	className="flex items-center justify-between gap-2"
																>
																	<p className="capitalize">
																		{key.replaceAll("_", " ")}
																	</p>

																	{/* Fix this later */}
																	{value.toLowerCase() === "true" ? (
																		<Checkbox checked={Boolean(value)} />
																	) : (
																		<p>{value}</p>
																	)}
																</div>
															),
														)}
													</AccordionContent>
												</AccordionItem>
											))}
										</Accordion>
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					}
				</div>
				<CredenzaFooter>
					<CredenzaClose asChild>
						<Button size="sm" variant="outline">
							Close
						</Button>
					</CredenzaClose>
					{service.service_pricing_url && (
						<Link
							href={service.service_pricing_url}
							target="_blank"
							rel="noreferrer"
						>
							<Button
								size="sm"
								className="group w-full"
								iconPlacement="right"
								Icon={LucideArrowUpRight}
							>
								See pricing
							</Button>
						</Link>
					)}
				</CredenzaFooter>
			</CredenzaContent>
		</Credenza>
	);

	/*	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger disabled={service.disabled} className="text-start">
				{children}
			</DrawerTrigger>
			<DrawerContent className="max-h-[96%]">
				<div className="mt-4 flex gap-0.5 overflow-y-auto whitespace-nowrap px-4 pb-3">
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
													value={`pricing-${key}-${item.type
														.toLowerCase()
														.replaceAll(" ", "-")}`}
													key={`pricing-${key}-${item.type
														.toLowerCase()
														.replaceAll(" ", "-")}`}
												>
													<AccordionTrigger className="py-2">
														<p className="font-semibold text-md capitalize">
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
																		key={`${key.replaceAll(
																			"_",
																			" ",
																		)}-${entryIndex}`}
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
	*/
}
