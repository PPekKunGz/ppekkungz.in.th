import HomePage from "./(root)/_components/pages/Home";

export default function Home() {
  return (
    <main className="min-h-screen h-full transition-fade">
      <section className="overflow-clip scroll-area bg-cover bg-center h-screen justify-center text-center">
        <HomePage />
      </section>
    </main>
  );
}
