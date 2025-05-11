import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface ChannelStatistics {
	subscriberCount: string;
	viewCount: string;
	videoCount: string;
}

interface ChannelSnippet {
	title: string;
	thumbnails: {
		default: {
			url: string;
		};
	};
}

export async function GET(request: NextRequest) {
	try {
		const query = request.nextUrl.searchParams.get('query');
		const id = request.nextUrl.searchParams.get('id');

		if (!query && !id) {
			return NextResponse.json({ error: 'Either query or id parameter is required' }, { status: 400 });
		}

		let channels = [];

		if (id) {
			const channelsResponse = await axios
				.get(
					`https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${id}&key=${process.env.YOUTUBE_API_KEY}`
				)
				.then((res) => res.data);

			channels =
				channelsResponse.items?.map((item: { id: string; statistics: ChannelStatistics; snippet: ChannelSnippet }) => ({
					id: item.id,
					name: item.snippet?.title,
					subscribers: item.statistics?.subscriberCount || '0',
					thumbnail: item.snippet?.thumbnails?.default?.url
				})) || [];
		} else {
			// Search by query - get channel IDs first
			const searchResponse = await axios.get(
				`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
					query || ''
				)}&maxResults=5&type=channel&key=${process.env.YOUTUBE_API_KEY}`
			);

			const channelIds =
				searchResponse.data.items?.map((item: { id: { channelId: string } }) => item.id.channelId) || [];

			// Get full channel data including statistics in a single call
			const channelsResponse = await axios
				.get(
					`https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelIds.join(',')}&key=${
						process.env.YOUTUBE_API_KEY
					}`
				)
				.then((res) => res.data);

			channels =
				channelsResponse.items?.map((item: { id: string; statistics: ChannelStatistics; snippet: ChannelSnippet }) => ({
					id: item.id,
					name: item.snippet?.title,
					subscribers: item.statistics?.subscriberCount || '0',
					thumbnail: item.snippet?.thumbnails?.default?.url
				})) || [];
		}

		return NextResponse.json(channels);
	} catch (error) {
		console.error('YouTube API error:', error);
		return NextResponse.json({ error: 'Failed to fetch channels' }, { status: 500 });
	}
}
