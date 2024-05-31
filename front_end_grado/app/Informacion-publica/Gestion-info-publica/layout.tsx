export default function GestionInformacionPublicaLayout({
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
