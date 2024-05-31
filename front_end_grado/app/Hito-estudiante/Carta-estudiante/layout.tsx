//layout.tsx
export default function CartaEstudianteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="">
    <div className="">
        {children}
      </div>
    </section>
  );
}
