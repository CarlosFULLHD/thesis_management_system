//layout.tsx
export default function SelectFormalDefenseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-5">
    {/* <div className="inline-block max-w-lg text-center justify-center"> */}
    <div className="inline-block  text-center justify-center">
        {children}
      </div>
    </section>
  );
}
