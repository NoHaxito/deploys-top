export default function ProvidersLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <main className="container max-w-screen-lg py-4">{children}</main>;
}
