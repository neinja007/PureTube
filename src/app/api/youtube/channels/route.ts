import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface ChannelStatistics {
	subscriberCount: string;
	viewCount: string;
	videoCount: string;
}

export async function GET(request: NextRequest) {
	try {
		const query = request.nextUrl.searchParams.get('query');

		if (!query) {
			return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
		}

		const searchResponse = await axios
			.get(
				`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=5&type=channel&key=${process.env.YOUTUBE_API_KEY}`
			)
			.then((res) => res.data);

		const channelIds = searchResponse.items?.map((item: { id: { channelId: string } }) => item.id.channelId) || [];

		const channelsResponse = await axios
			.get(
				`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelIds.join(',')}&key=${
					process.env.YOUTUBE_API_KEY
				}`
			)
			.then((res) => res.data);

		const channelStats = new Map<string, ChannelStatistics>(
			channelsResponse.items?.map((item: { id: string; statistics: ChannelStatistics }) => [
				item.id,
				item.statistics
			]) || []
		);

		const channels =
			searchResponse.items?.map(
				(item: {
					id: { kind: string; channelId: string };
					snippet: { title: string; thumbnails: { default: { url: string } } };
				}) => ({
					id: item.id?.channelId,
					name: item.snippet?.title,
					subscribers: channelStats.get(item.id.channelId)?.subscriberCount || '0',
					thumbnail: item.snippet?.thumbnails?.default?.url
				})
			) || [];

		return NextResponse.json(channels);
	} catch (error) {
		console.error('YouTube API error:', error);
		return NextResponse.json({ error: 'Failed to fetch channels' }, { status: 500 });
	}
}
