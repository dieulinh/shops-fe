import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchRecipeAsync } from '@/features/recipes/recipeSlice.js';
import './recipes.css';

const Recipe = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { recipe, status, error } = useSelector((state) => state.recipe);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchRecipeAsync(id));
  }, [id, dispatch]);

  const title = recipe.title || recipe.name || (id ? `Recipe #${id}` : 'Recipe');
  const img = recipe.image_url || recipe.photo_url || recipe.cover || null;

  return (
    <div className="container recipe-detail-wrapper">
      <Link to="/recipes" className="recipe-back-link">← Back to Recipes</Link>

      {status === 'loading' && (
        <div className="recipe-hero" aria-busy="true" aria-live="polite" style={{ minHeight: '240px' }}>
          <p style={{ margin: 0, opacity: .6 }}>Loading recipe…</p>
        </div>
      )}
      {status === 'failed' && (
        <div className="empty-state-inline" role="alert">Error: {error}</div>
      )}

      {status === 'succeeded' && (
        <article className="recipe-detail" itemScope itemType="https://schema.org/Recipe">
          <section className="recipe-hero">
            <h1 itemProp="name">{title}</h1>
            {recipe.description && (
              <p style={{ margin: 0, maxWidth: '780px', lineHeight: 1.45 }} itemProp="description">{recipe.description}</p>
            )}
            <div className="recipe-meta-bar">
              {recipe.ingredients && Array.isArray(recipe.ingredients) && (
                <span className="recipe-meta-pill">{recipe.ingredients.length} ingredients</span>
              )}
              {(recipe.time || recipe.cook_time || recipe.total_time) && (
                <span className="recipe-meta-pill">Time: {recipe.time || recipe.cook_time || recipe.total_time}</span>
              )}
              {recipe.servings && <span className="recipe-meta-pill">Serves {recipe.servings}</span>}
            </div>
            {img && (
              <div style={{ marginTop: '24px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 32px -12px rgba(0,0,0,0.25)' }}>
                <img src={img} alt={title} style={{ width: '100%', display: 'block', maxHeight: '480px', objectFit: 'cover' }} loading="lazy" itemProp="image" />
              </div>
            )}
          </section>

          <div className="recipe-detail-layout">
            {recipe.ingredients && Array.isArray(recipe.ingredients) && (
              <aside className="recipe-panel" aria-label="Ingredients">
                <h2>Ingredients</h2>
                <ul className="ingredient-list">
                  {recipe.ingredients.map((ing, idx) => (
                    <li key={idx} itemProp="recipeIngredient">
                      {typeof ing === 'string' ? ing : ing.name || JSON.stringify(ing)}
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            <section className="recipe-panel" aria-label="Instructions">
              <h2>Instructions</h2>
              {recipe.instructions ? (
                Array.isArray(recipe.instructions) ? (
                  <ol className="instruction-steps" itemProp="recipeInstructions">
                    {recipe.instructions.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                ) : (
                  <p style={{ lineHeight: 1.6 }} itemProp="recipeInstructions">{recipe.instructions}</p>
                )
              ) : (
                <p style={{ opacity: .6 }}>No instructions provided.</p>
              )}
            </section>
          </div>
        </article>
      )}
    </div>
  );
};

export default Recipe;
