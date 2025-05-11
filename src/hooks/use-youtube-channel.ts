'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useYoutubeChannel = (id: string) => {
	return useQuery<{ id: string; name: string; thumbnail: string; subscribers: string }[]>({
		queryKey: ['youtube-channel', id],
		queryFn: () => axios.get(`/api/youtube/channels?id=${id}`).then((res) => res.data),
		enabled: id.length > 0
	});
};
