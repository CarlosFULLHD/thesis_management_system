//layout.tsx
export default function MyStudentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 h-full w-full">
      <div className="w-full h-full">
        {children}
      </div>
    </section>
  );
}
