export default function Card({ children, className }: { children: React.ReactNode, className?:string }) {
  return (
    <section className={`container main-card mb-4 border border-3 border-dark p-4 rounded-2 ${className} `}>
      {children}
    </section>
  );
}
