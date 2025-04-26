// app/api/youtube/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

  if (!YOUTUBE_API_KEY) {
    return NextResponse.json(
      { success: false, error: 'YouTube API key not configured' },
      { status: 500 }
    );
  }

  if (!query) {
    return NextResponse.json(
      { success: false, error: 'Query parameter is required' },
      { status: 400 }
    );
  }

  try {
    // Single API call to get search results
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${encodeURIComponent(query)}&type=video&key=${YOUTUBE_API_KEY}`
    );

    if (!searchResponse.ok) {
      throw new Error('Failed to fetch videos from YouTube API');
    }

    const searchData = await searchResponse.json();
    console.log('Search Data received:');
    console.dir(searchData, { depth: null });
    
    const videos = searchData.items.map((item: any) => ({
      title: item.snippet.title,
      description: item.snippet.description,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      videoId: item.id.videoId,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
      postType: 'youtube' as const,
      date: item.snippet.publishedAt,
      channel: item.snippet.channelTitle
      // Note: duration and views are removed since they require the second API call
    }));

    return NextResponse.json({ success: true, videos }, { status: 200 });
  } catch (error) {
    console.error('YouTube API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search YouTube videos' },
      { status: 500 }
    );
  }
}
