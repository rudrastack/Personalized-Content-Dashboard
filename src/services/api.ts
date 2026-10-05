import { ContentItem, Category } from '@/types';
import { INITIAL_CONTENT_ITEMS } from '@/data/mockData';

export async function fetchContentData(categories?: Category[]): Promise<ContentItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 450));

  let items = [...INITIAL_CONTENT_ITEMS];

  if (categories && categories.length > 0) {
    items = items.filter((item) => categories.includes(item.category));
    if (items.length === 0) {
      items = INITIAL_CONTENT_ITEMS;
    }
  }

  return items;
}

/**
 * Generates an incoming live item to simulate real-time updates (WebSockets / SSE)
 */
export function generateLiveItem(): ContentItem {
  const categories: Category[] = ['technology', 'finance', 'entertainment', 'sports', 'health', 'science'];
  const randomCat = categories[Math.floor(Math.random() * categories.length)];
  const timestamp = new Date().toISOString();
  const id = `live-${Date.now()}`;

  const sampleLiveFeed = [
    {
      title: 'Breaking: Next-gen fusion reactor prototype achieves net energy gain for 30 minutes',
      category: 'science' as Category,
      type: 'news' as const,
      description: 'Continuous magnetic confinement milestone reached in commercial test reactor facility.',
      imageUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&auto=format&fit=crop&q=80',
      source: 'Global Science Wire',
      author: 'Dr. Sarah Chen',
    },
    {
      title: 'Open Source Vision-Language Model v4 officially dropped with Apache 2.0 license',
      category: 'technology' as Category,
      type: 'news' as const,
      description: 'Weights, fine-tuning scripts, and dataset cards are now fully public on HuggingFace.',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      source: 'TechPulse',
      author: 'Alex River',
    },
    {
      title: 'Just tested the new CSS Subgrid in complex responsive dashboard layouts — mind blown!',
      category: 'technology' as Category,
      type: 'social' as const,
      description: 'Aligning nested card footers across uneven content heights without hacky JS calculations. Pure joy.',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
      source: 'Frontend Weekly',
      author: 'Dev Zoe',
    },
    {
      title: 'Global markets react as inflation print beats forecast by 40 basis points',
      category: 'finance' as Category,
      type: 'news' as const,
      description: 'Major stock and bond indices experience rapid repricing following the morning labor report.',
      imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80',
      source: 'Markets Daily',
      author: 'James Vance',
    },
  ];

  const pick = sampleLiveFeed[Math.floor(Math.random() * sampleLiveFeed.length)];

  return {
    id,
    title: pick.title,
    description: pick.description,
    content: `${pick.description} Full coverage and ongoing live analysis continue as more updates develop. Stay tuned for expert breakdowns and community commentary.`,
    type: pick.type,
    category: pick.category,
    source: pick.source,
    author: pick.author,
    imageUrl: pick.imageUrl,
    publishedAt: timestamp,
    readTime: '2 min read',
    likes: Math.floor(Math.random() * 50) + 10,
    shares: Math.floor(Math.random() * 20) + 3,
    trendingScore: 95,
    tags: [pick.category.toUpperCase(), 'LIVE', 'BREAKING'],
  };
}
