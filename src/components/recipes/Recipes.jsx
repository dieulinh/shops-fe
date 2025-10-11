import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipesAsync } from '@/features/recipes/recipesSlice.js';
import RecipeCard from './RecipeCard.jsx';
import './recipes.css';

const Recipes = () => {
  const dispatch = useDispatch();
  const { recipes, status, error, total_pages } = useSelector(state => state.recipes);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRecipesAsync({ page: 1, query: '' }));
    }
  }, [status, dispatch]);

  // Debounce query to avoid firing on each keystroke
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 350);
    return () => clearTimeout(t);
  }, [query]);

  // Fetch when page or debounced query changes
  useEffect(() => {
    if (status === 'idle') return; // initial handled above
    dispatch(fetchRecipesAsync({ page, query: debouncedQuery }));
  }, [page, debouncedQuery, dispatch]);

  const loadingSkeletons = Array.from({ length: 6 }, (_, i) => (
    <div className="recipe-skeleton" key={i} aria-hidden="true" />
  ));

  return (
    <div className="container recipe-list-page">
      <header className="recipes-page-header">
        <h1>Recipes</h1>
        <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--recipe-text-muted,#64748b)' }}>
          Explore delicious ideas & inspiration. Pick one to start cooking!
        </p>
      </header>

      <div className="recipes-toolbar" role="search">
        <input
          className="recipe-search"
          type="search"
          placeholder="Search recipes…"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          aria-label="Search recipes"
        />
        {total_pages > 1 && (
          <div className="recipes-pager">
            <button
              className="pager-btn"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1 || status === 'loading'}
            >
              Prev
            </button>
            <span className="pager-status" aria-live="polite">Page {page} / {total_pages}</span>
            <button
              className="pager-btn"
              onClick={() => setPage((p) => Math.min(total_pages, p + 1))}
              disabled={page >= total_pages || status === 'loading'}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {status === 'failed' && (
        <div className="empty-state-inline" role="alert">Error: {error}</div>
      )}

      {status === 'loading' && (
        <div className="recipes-grid" aria-label="Loading recipes">{loadingSkeletons}</div>
      )}

      {status === 'succeeded' && recipes.length === 0 && (
        <div className="empty-state-inline">No recipes found.</div>
      )}

      {status === 'succeeded' && recipes.length > 0 && (
        <div className="recipes-grid" role="list">
          {recipes.map(r => <RecipeCard key={r.id} recipe={r} />)}
        </div>
      )}
    </div>
  );
};

export default Recipes;
