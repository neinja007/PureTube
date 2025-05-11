import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
	try {
		const query = request.nextUrl.searchParams.get('query');

		if (!query) {
			return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
		}

		const response = await axios
			.get(
				`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&results=5&type=channel&key=${process.env.YOUTUBE_API_KEY}`
			)
			.then((res) => res.data);

		const channels =
			response.items?.map(
				(item: {
					id: { kind: string; channelId: string };
					snippet: { title: string; thumbnails: { default: { url: string } } };
				}) => ({
					id: item.id?.channelId,
					name: item.snippet?.title,
					thumbnail: item.snippet?.thumbnails?.default?.url
				})
			) || [];

		return NextResponse.json({ channels });
	} catch (error) {
		console.error('YouTube API error:', error);
		return NextResponse.json({ error: 'Failed to fetch channels' }, { status: 500 });
	}
}
