import preferencesReducer, {
  toggleCategoryPreference,
  setCategories,
  setLayoutMode,
  setAutoRefresh,
  resetPreferences,
  PreferencesState,
} from '../redux/slices/preferencesSlice';

describe('preferencesSlice reducers', () => {
  const initialTestState: PreferencesState = {
    preferences: {
      name: 'Test User',
      email: 'test@example.com',
      avatar: 'https://example.com/avatar.jpg',
      favoriteCategories: ['technology', 'finance'],
      layoutMode: 'grid',
      notificationsEnabled: true,
      autoRefresh: false,
    },
    isPreferencesModalOpen: false,
  };

  it('should toggle an unselected category into favoriteCategories', () => {
    const nextState = preferencesReducer(initialTestState, toggleCategoryPreference('science'));
    expect(nextState.preferences.favoriteCategories).toContain('science');
  });

  it('should remove a selected category if more than 1 category remains', () => {
    const nextState = preferencesReducer(initialTestState, toggleCategoryPreference('finance'));
    expect(nextState.preferences.favoriteCategories).not.toContain('finance');
    expect(nextState.preferences.favoriteCategories).toEqual(['technology']);
  });

  it('should not allow deselecting the last remaining category', () => {
    const stateWithOneCat: PreferencesState = {
      ...initialTestState,
      preferences: {
        ...initialTestState.preferences,
        favoriteCategories: ['technology'],
      },
    };
    const nextState = preferencesReducer(stateWithOneCat, toggleCategoryPreference('technology'));
    expect(nextState.preferences.favoriteCategories).toEqual(['technology']);
  });

  it('should set layout mode between grid and list', () => {
    const nextState = preferencesReducer(initialTestState, setLayoutMode('list'));
    expect(nextState.preferences.layoutMode).toBe('list');
  });

  it('should toggle autoRefresh state', () => {
    const nextState = preferencesReducer(initialTestState, setAutoRefresh(true));
    expect(nextState.preferences.autoRefresh).toBe(true);
  });
});
