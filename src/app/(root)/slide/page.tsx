import type { NextPage } from 'next';
import ThemeToggle from './themeToggle';

const Home: NextPage = () => {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="text-center max-w-lg">
                <ThemeToggle />
                <h1 className="text-4xl md:text-6xl font-bold">
                    Use View Transitions
                </h1>
                <p className="mt-4 text-lg">
                    Progressively enhanced theme switching with View Transitions.
                </p>
                <a
                    href="https://developer.chrome.com/docs/web-platform/view-transitions/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                >
                    Read About Them
                </a>
            </div>
            <div className="mt-8 flex justify-center gap-4">
                <img
                    src="https://picsum.photos/300/300?random=1"
                    alt="Random Image 1"
                    className="w-64 h-64 object-cover rounded-lg shadow-md"
                />
                <img
                    src="https://picsum.photos/300/300?random=2"
                    alt="Random Image 2"
                    className="w-64 h-64 object-cover rounded-lg shadow-md dark:hidden"
                />
            </div>
        </main>
    );
};

export default Home;
