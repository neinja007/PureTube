'use client';

import { Channel, Collection } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useCollections = () => {
	return useQuery<(Collection & { channels: Channel[] })[]>({
		queryKey: ['collections'],
		queryFn: () => axios.get('/api/collections').then((res) => res.data)
	});
};
