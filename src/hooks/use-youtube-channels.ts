'use client';

import { Channel, Collection } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useYoutubeChannels = (query: string) => {
	return useQuery<Collection & { channels: Channel[] }>({
		queryKey: ['youtube-channels', query],
		queryFn: () => axios.get(`/api/youtube/channels?query=${query}`).then((res) => res.data)
	});
};
