'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useYoutubeChannels = (query: string) => {
	return useQuery<{ id: string; name: string; thumbnail: string; subscribers: string }[]>({
		queryKey: ['youtube-channels', query],
		queryFn: () => axios.get(`/api/youtube/channels?query=${query}`).then((res) => res.data),
		enabled: query.length > 0
	});
};
