export default function ProvidersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="container max-w-screen-2xl py-4">{children}</main>;
}
