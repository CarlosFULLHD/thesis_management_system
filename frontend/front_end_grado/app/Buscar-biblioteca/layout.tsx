export default function BuscarBibliotecaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="px-6">{children}</div>
    </section>
  );
}
