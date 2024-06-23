//layout.tsx
export default function LoginLayout({
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
