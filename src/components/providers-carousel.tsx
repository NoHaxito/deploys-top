"use client";
import type { Provider } from "@/types/provider";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
export function ProvidersCarousel({ providers }: { providers: Provider[] }) {
	return (
		<Carousel
			opts={{
				align: "center",
				loop: true,
			}}
			plugins={[
				Autoplay({
					delay: 2000,
					stopOnInteraction: false,
					stopOnMouseEnter: true,
				}),
			]}
			className="mt-6 w-full max-w-sm"
		>
			<CarouselContent>
				{providers.slice(0, 7).map((provider) => (
					<CarouselItem
						className="flex basis-1/3 items-center justify-center lg:basis-1/3"
						key={provider.name}
					>
						<img
							title={`${provider.name} logo`}
							src={provider.icon}
							alt={provider.name}
							className="h-12 w-auto opacity-50"
						/>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
}
