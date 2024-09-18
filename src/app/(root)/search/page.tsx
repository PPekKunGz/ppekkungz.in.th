'use client';

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [query, setQuery] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchImage = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/generate-image', {
        params: { query },
      });
      setImageUrl(response.data.image);
    } catch (err: unknown) {
      setError('Failed to fetch image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black/20 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Search Images from Pexels</h1>
      <div className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter an image description..."
          className="p-2 border border-gray-300 rounded-md mr-2"
        />
        <button
          onClick={searchImage}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Searching...' : 'Search Image'}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {imageUrl && (
        <div className="mt-8">
          <img src={imageUrl} alt="Searched Image" className="rounded-md shadow-md" />
        </div>
      )}
    </div>
  );
}
