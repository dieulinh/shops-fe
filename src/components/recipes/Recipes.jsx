import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipesAsync } from '@/features/recipes/recipesSlice.js';
import RecipeCard from './RecipeCard.jsx';
import './recipes.css';

const Recipes = () => {
  const dispatch = useDispatch();
  const { recipes, status, error } = useSelector(state => state.recipes);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRecipesAsync({ page: 1 }));
    }
  }, [status, dispatch]);

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
