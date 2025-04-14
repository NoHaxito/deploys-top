import { queries } from "@/lib/groq-queries";
import { client } from "@/sanity/lib/client";
import type { Provider } from "@/types/provider";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";
export const revalidate = 60;

export async function GET(req: NextRequest) {
	const { searchParams } = req.nextUrl;
	const provider = searchParams.get("provider");
	const providerLogo = (
		await client.fetch<Provider>(queries.getProvider, {
			id: provider,
		})
	)?.icon;

	if (!provider || !providerLogo) {
		return new ImageResponse(
			<div
				style={{
					height: "100%",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "rgb(10 10 10 / 1)",
					backgroundImage:
						"radial-gradient(ellipse 80% 80% at 50% -20%,rgba(120,119,198,0.3),rgba(255,255,255,0))",
				}}
				// tw="bg-neutral-950 "
			>
				<div tw="flex items-center flex-col" style={{ gap: "3rem" }}>
					<div tw="flex items-center" style={{ gap: "2rem" }}>
						{/* biome-ignore lint/a11y/useAltText: <explanation> */}
						<img
							style={{
								objectFit: "contain",
							}}
							src="https://deploy.nohaxito.xyz/deploys-top.png"
							height={125}
							width={125}
						/>
						<h1 tw="text-7xl text-white font-extrabold">Deploys.top</h1>
					</div>
					<span tw="text-neutral-300 text-5xl text-center ">
						Compare your favorite providers
					</span>
				</div>
			</div>,
			{
				width: 1200,
				height: 630,
			},
		);
	}

	return new ImageResponse(
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "rgb(10 10 10 / 1)",
				backgroundImage:
					"radial-gradient(ellipse 80% 80% at 50% -20%,rgba(120,119,198,0.3),rgba(255,255,255,0))",
			}}
		>
			<div tw="flex items-center flex-col" style={{ gap: "3rem" }}>
				<div tw="flex items-center" style={{ gap: "3rem" }}>
					{/* biome-ignore lint/a11y/useAltText: <explanation> */}
					<img
						src={providerLogo}
						height={125}
						width={125}
						style={{
							objectFit: "contain",
						}}
					/>
					<span tw="text-7xl font-bold text-white">›</span>
					{/* biome-ignore lint/a11y/useAltText: <explanation> */}
					<img
						style={{
							objectFit: "contain",
						}}
						src="https://deploy.nohaxito.xyz/deploys-top.png"
						width={125}
						height={125}
					/>
				</div>
				<span tw="text-neutral-300 text-4xl text-center ">
					Compare your favorite providers
				</span>
			</div>
		</div>,
		{
			width: 1200,
			height: 630,
		},
	);
}
