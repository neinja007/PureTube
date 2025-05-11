import { z } from 'zod';

export const channelSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	channels: z.array(z.string()).default([])
});

export type ChannelSchema = z.infer<typeof channelSchema>;
