export default function ProvidersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="container max-w-(--breakpoint-lg) py-4">{children}</main>;
}
