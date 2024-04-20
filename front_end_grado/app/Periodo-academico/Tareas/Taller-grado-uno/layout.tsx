//layout.tsx
export default function TareasAcadUnoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="">
      <div className=" ">
        {children}
      </div>
    </section>
  );
}
