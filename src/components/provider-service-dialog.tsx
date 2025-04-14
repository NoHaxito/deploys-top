"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { cn } from "@/lib/utils";
import type { Provider, ServiceOffered } from "@/types/provider";
import { CheckIcon, LucideArrowUpRight, XIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
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
			<CredenzaTrigger className="text-start w-full">
				{children}
			</CredenzaTrigger>
			<CredenzaContent
				className={cn(
					"max-h-[95vh] max-w-[95vw] md:max-w-[85vw] lg:max-w-",
					"flex flex-col overflow-hidden",
					isDesktop ? "h-[85vh]" : "h-[95vh] mt-0",
				)}
			>
				<div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
					<div className="flex gap-2 overflow-x-auto whitespace-nowrap px-4 py-3 sm:px-6 hide-scrollbar">
						{service.supported_types?.map((type) => (
							<Badge
								variant="outline"
								key={type}
								className="px-3 py-1 text-xs font-medium bg-background/50 shrink-0"
							>
								{type}
							</Badge>
						))}
					</div>
					<CredenzaHeader className="text-left px-4 sm:px-6 pb-4">
						<CredenzaTitle className="text-xl sm:text-2xl font-bold tracking-tight">
							{service.name}
						</CredenzaTitle>
						<CredenzaDescription className="text-muted-foreground mt-2 text-sm sm:text-base">
							View information about the{" "}
							<span className="font-medium text-foreground">
								{service.name}
							</span>{" "}
							service offered by{" "}
							<span className="font-medium text-foreground">
								{provider.name}
							</span>
							.
						</CredenzaDescription>
					</CredenzaHeader>
				</div>

				<div className="flex-1 overflow-y-auto px-4 sm:px-6 space-y-6 py-4">
					{open && (
						<Accordion
							type="multiple"
							defaultValue={[
								`pricing-${service.pricing.plans[0].name.toLowerCase()}`,
							]}
							className="w-full space-y-4"
						>
							{service.pricing.plans.map((plan) => (
								<AccordionItem
									key={`pricing-${plan.name.toLowerCase()}`}
									value={`pricing-${plan.name.toLowerCase()}`}
									className="border rounded-lg px-4 py-2 transition-all duration-200 data-[state=open]:bg-muted/50"
								>
									<AccordionTrigger className="hover:no-underline">
										<div className="flex items-center gap-3">
											<span className="text-base sm:text-lg font-semibold capitalize">
												{plan.name}
											</span>
										</div>
									</AccordionTrigger>
									<AccordionContent className="pt-4 pb-2">
										<div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
											{plan.plan_features.map((feature) => (
												<Card
													key={feature.name.toLowerCase().replace(" ", "_")}
													className="overflow-hidden border-muted h-fit"
												>
													<AccordionItem
														value={feature.name.toLowerCase().replace(" ", "_")}
														className="border-none"
													>
														<AccordionTrigger className="px-4 py-3 hover:no-underline bg-muted/50">
															<p className="font-medium text-sm sm:text-base">
																{feature.name}
															</p>
														</AccordionTrigger>
														<AccordionContent>
															<CardContent className="grid gap-2.5 p-4 pt-3">
																{feature.values.map(
																	({ key, value }, index: number) => (
																		<div
																			key={`${key.replaceAll(
																				"_",
																				" ",
																			)}-${index}`}
																			className="flex items-center justify-between gap-4 text-xs sm:text-sm"
																		>
																			<p className="capitalize text-muted-foreground">
																				{key.replaceAll("_", " ")}
																			</p>

																			{value.toLowerCase() === "true" ? (
																				<CheckIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
																			) : value.toLowerCase() === "false" ? (
																				<XIcon className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground shrink-0" />
																			) : (
																				<p className="font-medium text-right">
																					{value}
																				</p>
																			)}
																		</div>
																	),
																)}
															</CardContent>
														</AccordionContent>
													</AccordionItem>
												</Card>
											))}
										</div>
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					)}
				</div>

				<CredenzaFooter className="flex-col-reverse sm:flex-row gap-3 px-4 sm:px-6 py-4 border-t bg-background/80 backdrop-blur-sm">
					<CredenzaClose asChild>
						<Button
							size={isDesktop ? "default" : "sm"}
							variant="outline"
							className="w-full sm:w-auto"
						>
							Close
						</Button>
					</CredenzaClose>
					{service.service_pricing_url && (
						<Link
							href={service.service_pricing_url}
							target="_blank"
							rel="noreferrer"
							className="w-full sm:w-auto"
						>
							<Button
								size={isDesktop ? "default" : "sm"}
								className="group w-full"
								variant="ringHover"
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
}
