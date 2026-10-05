import contentReducer, {
  setSearchQuery,
  setSelectedCategory,
  setSelectedType,
  toggleFavorite,
  clearFavorites,
  reorderItems,
  addLiveItem,
  toggleLiveUpdates,
  ContentState,
} from '../redux/slices/contentSlice';
import { ContentItem } from '../types';

describe('contentSlice reducers', () => {
  const initialTestState: ContentState = {
    items: [
      {
        id: 'item-1',
        title: 'Quantum Computing Breakthrough',
        description: 'Coherence milestone achieved.',
        content: 'Full article text here.',
        type: 'news',
        category: 'technology',
        source: 'Tech Daily',
        author: 'Elena',
        imageUrl: 'https://example.com/img1.jpg',
        publishedAt: '2026-10-05T08:00:00Z',
        likes: 100,
        shares: 20,
        trendingScore: 90,
        tags: ['Quantum', 'Tech'],
      },
      {
        id: 'item-2',
        title: 'Global Markets Rally',
        description: 'Central bank announcements.',
        content: 'Full market summary.',
        type: 'news',
        category: 'finance',
        source: 'Market Watch',
        author: 'David',
        imageUrl: 'https://example.com/img2.jpg',
        publishedAt: '2026-10-05T09:00:00Z',
        likes: 80,
        shares: 10,
        trendingScore: 85,
        tags: ['Finance', 'Economy'],
      },
    ],
    status: 'succeeded',
    error: null,
    searchQuery: '',
    selectedCategory: 'all',
    selectedType: 'all',
    favorites: [],
    liveUpdates: false,
    lastUpdated: new Date().toISOString(),
  };

  it('should update search query correctly', () => {
    const nextState = contentReducer(initialTestState, setSearchQuery('quantum'));
    expect(nextState.searchQuery).toBe('quantum');
  });

  it('should update selected category correctly', () => {
    const nextState = contentReducer(initialTestState, setSelectedCategory('technology'));
    expect(nextState.selectedCategory).toBe('technology');
  });

  it('should update selected type correctly', () => {
    const nextState = contentReducer(initialTestState, setSelectedType('recommendation'));
    expect(nextState.selectedType).toBe('recommendation');
  });

  it('should toggle item into favorites and remove it on second toggle', () => {
    // Add to favorites
    const stateWithFav = contentReducer(initialTestState, toggleFavorite('item-1'));
    expect(stateWithFav.favorites).toContain('item-1');

    // Remove from favorites
    const stateWithoutFav = contentReducer(stateWithFav, toggleFavorite('item-1'));
    expect(stateWithoutFav.favorites).not.toContain('item-1');
  });

  it('should clear all favorites', () => {
    const stateWithMultipleFavs: ContentState = {
      ...initialTestState,
      favorites: ['item-1', 'item-2'],
    };
    const clearedState = contentReducer(stateWithMultipleFavs, clearFavorites());
    expect(clearedState.favorites).toEqual([]);
  });

  it('should reorder items properly', () => {
    const reversed = [...initialTestState.items].reverse();
    const reorderedState = contentReducer(initialTestState, reorderItems(reversed));
    expect(reorderedState.items[0].id).toBe('item-2');
    expect(reorderedState.items[1].id).toBe('item-1');
  });

  it('should prepend a live item to items list', () => {
    const newItem: ContentItem = {
      id: 'live-new',
      title: 'Breaking Satellite Discovery',
      description: 'New telescope telemetry.',
      content: 'Detailed telemetry.',
      type: 'news',
      category: 'science',
      source: 'Space Wire',
      author: 'Prof. Henrik',
      imageUrl: 'https://example.com/space.jpg',
      publishedAt: '2026-10-05T12:00:00Z',
      likes: 10,
      shares: 2,
      trendingScore: 99,
      tags: ['Space'],
    };

    const nextState = contentReducer(initialTestState, addLiveItem(newItem));
    expect(nextState.items.length).toBe(3);
    expect(nextState.items[0].id).toBe('live-new');
  });

  it('should toggle live updates status', () => {
    const nextState = contentReducer(initialTestState, toggleLiveUpdates());
    expect(nextState.liveUpdates).toBe(true);

    const toggledAgain = contentReducer(nextState, toggleLiveUpdates());
    expect(toggledAgain.liveUpdates).toBe(false);
  });
});
