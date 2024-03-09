import HomePage from '../components/pages/Home';
import Footer from '../components/layouts/Footer';

export default function Home() {
  return (
    <main className="min-h-screen h-full transition-fade">
      <section className="bg-[url('/2023-12-23_22.05.09.png')] overflow-clip scroll-area bg-cover bg-center h-screen justify-center text-center">
        <HomePage />
      </section>
    </main>
  );
}
