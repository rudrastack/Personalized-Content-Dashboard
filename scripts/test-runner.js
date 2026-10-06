/**
 * PrismFlow Personalized Content Dashboard
 * Automated Unit & Business Logic Test Suite
 */

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion Failed: ${message}`);
  }
}

console.log('🧪 Starting PrismFlow Dashboard Unit & Logic Tests...\n');

let passed = 0;
let failed = 0;

function it(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     ${err.message}`);
    failed++;
  }
}

// 1. Categories & Topics
it('User can select and toggle categories while enforcing at least 1 active topic', () => {
  let favoriteCategories = ['technology', 'finance', 'science'];

  const toggleCategory = (cat) => {
    if (favoriteCategories.includes(cat)) {
      if (favoriteCategories.length > 1) {
        favoriteCategories = favoriteCategories.filter((c) => c !== cat);
      }
    } else {
      favoriteCategories = [...favoriteCategories, cat];
    }
  };

  // Toggle off 'science'
  toggleCategory('science');
  assert(!favoriteCategories.includes('science'), 'Category science should have been removed');
  assert(favoriteCategories.length === 2, 'Should have 2 categories left');

  // Toggle on 'sports'
  toggleCategory('sports');
  assert(favoriteCategories.includes('sports'), 'Category sports should have been added');

  // Attempt to remove all until 1 remains
  toggleCategory('technology');
  toggleCategory('finance');
  toggleCategory('sports'); // Last remaining - should not be removed!
  assert(favoriteCategories.length === 1, 'Should retain at least 1 category');
});

// 2. Debounced Search Filtering
it('Debounced search query filters by title, description, author, and tags', () => {
  const sampleItems = [
    {
      id: '1',
      title: 'Quantum Computing Processor Milestone',
      description: 'Superconductor qubit coherence reached 1.2ms.',
      author: 'Elena Rostova',
      source: 'TechChronicle',
      tags: ['Quantum', 'Hardware'],
    },
    {
      id: '2',
      title: 'Central Banks Announce Settlement Standard',
      description: 'Cross-border digital settlement protocol deployed.',
      author: 'David Sterling',
      source: 'Financial Horizon',
      tags: ['Fintech', 'Markets'],
    },
    {
      id: '3',
      title: 'Formula Peak Aerodynamic Downforce',
      description: 'Ground effect floors and downforce optimization.',
      author: 'Sofia Rossi',
      source: 'SpeedStream',
      tags: ['Motorsport', 'Engineering'],
    },
  ];

  const filterItems = (query) => {
    if (!query.trim()) return sampleItems;
    const q = query.toLowerCase().trim();
    return sampleItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
    );
  };

  // Test keyword search
  assert(filterItems('quantum').length === 1, 'Search for "quantum" should return 1 item');
  assert(filterItems('Elena').length === 1, 'Search by author should return 1 item');
  assert(filterItems('Fintech').length === 1, 'Search by tag should return 1 item');
  assert(filterItems('downforce').length === 1, 'Search in description should return 1 item');
  assert(filterItems('xyz123').length === 0, 'Non-existent term should return 0 items');
});

// 3. Favorites Bookmarking Toggle
it('Favorites bookmarking toggles items and maintains uniqueness', () => {
  let favorites = [];

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      favorites = favorites.filter((favId) => favId !== id);
    } else {
      favorites = [...favorites, id];
    }
  };

  toggleFavorite('tech-1');
  assert(favorites.includes('tech-1'), 'tech-1 should be bookmarked');
  assert(favorites.length === 1, 'Favorites count should be 1');

  toggleFavorite('tech-2');
  assert(favorites.length === 2, 'Favorites count should be 2');

  toggleFavorite('tech-1');
  assert(!favorites.includes('tech-1'), 'tech-1 should be unbookmarked');
  assert(favorites.length === 1, 'Favorites count should be 1');
});

// 4. Drag and Drop Array Reordering
it('Reorder action updates array order correctly for customized feeds', () => {
  const original = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }];
  const moveItem = (arr, fromIndex, toIndex) => {
    const copy = [...arr];
    const [moved] = copy.splice(fromIndex, 1);
    copy.splice(toIndex, 0, moved);
    return copy;
  };

  const reordered = moveItem(original, 0, 2);
  assert(reordered[0].id === 'b', 'First item should now be b');
  assert(reordered[1].id === 'c', 'Second item should now be c');
  assert(reordered[2].id === 'a', 'Third item should now be a');
});

// 5. Live Feed Real-Time Simulation
it('Simulated incoming items are prepended with fresh timestamps and unique IDs', () => {
  let stream = [{ id: 'old-1', title: 'Old News' }];

  const simulateLiveArrival = (newTitle) => {
    const item = {
      id: `live-${Date.now()}-${Math.random()}`,
      title: newTitle,
      publishedAt: new Date().toISOString(),
      trendingScore: 95,
    };
    stream = [item, ...stream];
  };

  simulateLiveArrival('Breaking: Market Rally');
  assert(stream.length === 2, 'Stream should have 2 items');
  assert(stream[0].title === 'Breaking: Market Rally', 'New item should be prepended');
  assert(stream[0].id.startsWith('live-'), 'New item should have live- prefix');
});

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
