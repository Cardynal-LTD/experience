import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";

interface LegalLayoutProps {
  children: React.ReactNode;
}

export default async function LegalLayout({ children }: LegalLayoutProps) {
  return (
    <>
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-24">
        {children}
      </main>
      <Footer />
    </>
  );
}
