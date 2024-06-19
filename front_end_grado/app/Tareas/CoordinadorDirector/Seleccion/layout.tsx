//layout.tsx
export default function CDTasksLayout({
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
  