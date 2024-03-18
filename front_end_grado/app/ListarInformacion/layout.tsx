export default function ListarInformacionLayout({
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
