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
    // in order to get duration and views, we have to search via video IDs

    // call to get search results video IDs
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${encodeURIComponent(query)}&type=video&key=${YOUTUBE_API_KEY}`
    );

    if (!searchResponse.ok) {
      throw new Error('Failed to fetch videos from YouTube API');
    }

    const searchData = await searchResponse.json();
    console.log('Search Data received:');
    console.dir(searchData, { depth: null });

    const videoIds: any = searchData.items.map((item: any) => {
      return item.id.videoId;
    })

    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds.join(',')}&key=${YOUTUBE_API_KEY}`
    )

    if (!detailsResponse.ok) {
      throw new Error('Failed to fetch video details from YouTube API');
    }

    const detailsData = await detailsResponse.json();

    
    const videos = detailsData.items.map((item: any) => ({
      title: item.snippet.title,
      description: item.snippet.description,
      url: `https://www.youtube.com/watch?v=${item.id}`,
      videoId: item.id,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
      postType: 'youtube' as const,
      date: item.snippet.publishedAt,
      channel: item.snippet.channelTitle,
      duration: formatDuration(item.contentDetails.duration),
      views: item.statistics.viewCount,
      likes: item.statistics.likeCount,
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

function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '00:00';

  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '').replace('S', '');

  let result = '';
  if (hours) result += `${hours}:`;
  result += `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  return result;
}