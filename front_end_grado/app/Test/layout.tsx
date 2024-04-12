export default function TestLayout({
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
