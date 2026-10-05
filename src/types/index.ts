export type ContentType = 'news' | 'recommendation' | 'social';

export type Category = 
  | 'technology' 
  | 'sports' 
  | 'finance' 
  | 'entertainment' 
  | 'health' 
  | 'science';

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  content: string;
  type: ContentType;
  category: Category;
  source: string;
  author: string;
  authorAvatar?: string;
  imageUrl: string;
  url?: string;
  publishedAt: string;
  readTime?: string;
  likes: number;
  shares: number;
  trendingScore: number;
  tags: string[];
  mediaExtra?: {
    rating?: number;
    duration?: string;
    platform?: string;
    handle?: string;
  };
}

export interface UserPreferences {
  name: string;
  email: string;
  avatar: string;
  favoriteCategories: Category[];
  layoutMode: 'grid' | 'list';
  notificationsEnabled: boolean;
  autoRefresh: boolean;
}

export type ActiveTab = 'feed' | 'trending' | 'favorites' | 'preferences' | 'analytics';
