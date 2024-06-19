//layout.tsx
export default function HistoricLayout({
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
