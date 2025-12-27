import { defineCollection, z } from 'astro:content';

const topicSchema = z.object({
  slug: z.string(),
  region: z.enum(['global', 'india', 'taiwan_hk', 'latam']),
  category: z.enum(['politics', 'economy', 'tech', 'entertainment', 'sports']),
  
  locale: z.record(z.string(), z.object({
    title: z.string(),
    question: z.string(),
    description: z.string(),
  })),
  
  options: z.tuple([z.string(), z.string()]),
  keywords: z.array(z.string()),
  
  status: z.enum(['active', 'closed']).default('active'),
  publishedAt: z.coerce.date(),
  expirationDate: z.string(),
  source: z.string(),
  image: z.string().optional(),
});

export type Topic = z.infer<typeof topicSchema>;

const topics = defineCollection({
  type: 'data',
  schema: topicSchema,
});

export const collections = {
  topics,
};
