'use client';

import { Channel, Collection } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useCollection = (id: string) => {
	return useQuery<Collection & { channels: Channel[] }>({
		queryKey: ['collection', id],
		queryFn: () => axios.get(`/api/collection/${id}`).then((res) => res.data)
	});
};
