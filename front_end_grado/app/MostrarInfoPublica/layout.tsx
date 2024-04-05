export default function MostrarInformacionPublicaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section >
      <div >
        {children}
      </div>
    </section>
  );
}
