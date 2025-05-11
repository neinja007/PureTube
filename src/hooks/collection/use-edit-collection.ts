'use client';

import { ChannelSchema } from '@/app/schemas/channel';
import { Channel, Collection } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useEditCollection = (id: string) => {
	const queryClient = useQueryClient();

	return useMutation<Collection & { channels: Channel[] }, Error, ChannelSchema>({
		mutationFn: (body: ChannelSchema) => axios.patch(`/api/collection/${id}`, body).then((res) => res.data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['collection', id] });
			queryClient.invalidateQueries({ queryKey: ['collections'] });
		}
	});
};
