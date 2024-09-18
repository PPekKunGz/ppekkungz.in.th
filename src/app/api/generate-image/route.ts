// src/app/api/search-image/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const response = await axios.get('https://api.pexels.com/v1/search', {
      params: {
        query,      // Search query from the user
        per_page: 1 // Number of images to retrieve
      },
      headers: {
        Authorization: `Bearer ${process.env.PEXELS_API_KEY}`,  // Pexels API key from environment
      },
    });

    const imageUrl = response.data.photos[0]?.src?.original;

    if (!imageUrl) {
      return NextResponse.json({ error: 'No image found' }, { status: 404 });
    }

    return NextResponse.json({ image: imageUrl }, { status: 200 });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        // Handle the unauthorized error
        return NextResponse.json(
          { error: 'Unauthorized: Invalid API key. Please check your Pexels API key.' },
          { status: 401 }
        );
      }
      console.error('Axios error response:', error.response?.data);
      return NextResponse.json(
        { error: 'Failed to fetch image', details: error.response?.data },
        { status: 500 }
      );
    } else if (error instanceof Error) {
      // Handle general JavaScript errors
      console.error('Error fetching image:', error.message);
      return NextResponse.json(
        { error: 'Failed to fetch image', details: error.message },
        { status: 500 }
      );
    } else {
      // Fallback for unknown error types
      console.error('Unknown error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch image', details: 'Unknown error occurred' },
        { status: 500 }
      );
    }
  }
}
