import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchRecipeAsync, fetchRecipeCommentsAsync, addRecipeCommentAsync, resetAddCommentStatus } from '@/features/recipes/recipeSlice.js';
import { useSelector as useReduxSelector } from 'react-redux';
import './recipes.css';

const Recipe = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { recipe, status, error, comments, commentsStatus, addCommentStatus, addCommentError } = useSelector((state) => state.recipe);
  const { auth, token } = useReduxSelector(state => state.auth);
  const [commentBody, setCommentBody] = useState('');

  useEffect(() => {
    if (!id) return;
    dispatch(fetchRecipeAsync(id));
  }, [id, dispatch]);

  // Fetch comments when recipe successfully loaded or id changes
  useEffect(() => {
    if (!id) return;
    if (status === 'succeeded') {
      dispatch(fetchRecipeCommentsAsync(id));
    }
  }, [id, status, dispatch]);

  // Reset add comment status after success to clear loading/disabled state
  useEffect(() => {
    if (addCommentStatus === 'succeeded') {
      setCommentBody('');
      const t = setTimeout(() => dispatch(resetAddCommentStatus()), 1200);
      return () => clearTimeout(t);
    }
  }, [addCommentStatus, dispatch]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!commentBody.trim()) return;
    dispatch(addRecipeCommentAsync({ recipeId: id, body: commentBody.trim() }));
  };

  const title = recipe.title || recipe.name || (id ? `Recipe #${id}` : 'Recipe');
  const img = recipe.image_url || recipe.photo_url || recipe.cover || null;

  // --- Helpers to build JSON-LD ---
  const toIsoDuration = (val) => {
    if (!val) return undefined;
    if (typeof val === 'number') {
      const m = Math.max(0, Math.round(val));
      return `PT${m}M`;
    }
    if (typeof val === 'string') {
      const s = val.toLowerCase();
      // Extract hours and minutes, e.g. "1h 20m", "1 hr 30 mins", "45 min"
      const hrMatch = s.match(/(\d+)\s*(h|hr|hrs|hour|hours)/);
      const minMatch = s.match(/(\d+)\s*(m|min|mins|minute|minutes)/);
      const onlyMin = s.match(/^\s*(\d+)\s*$/); // plain number means minutes
      let h = 0; let m = 0;
      if (hrMatch) h = parseInt(hrMatch[1], 10) || 0;
      if (minMatch) m = parseInt(minMatch[1], 10) || 0;
      if (!hrMatch && !minMatch && onlyMin) m = parseInt(onlyMin[1], 10) || 0;
      if (h === 0 && m === 0) return undefined;
      return `PT${h ? `${h}H` : ''}${m ? `${m}M` : ''}`;
    }
    return undefined;
  };

  const ingredientsToStrings = (ings) => {
    if (!Array.isArray(ings)) return undefined;
    return ings.map((ing) => {
      if (typeof ing === 'string') return ing;
      if (ing == null) return '';
      // Try common fields
      const qty = ing.quantity || ing.qty || '';
      const unit = ing.unit || '';
      const name = ing.name || ing.title || '';
      return [qty, unit, name].filter(Boolean).join(' ').trim() || JSON.stringify(ing);
    }).filter(Boolean);
  };

  const instructionsToSchema = (instr) => {
    if (!instr) return undefined;
    if (Array.isArray(instr)) {
      return instr.map((step) => ({ '@type': 'HowToStep', text: String(step) }));
    }
    return String(instr);
  };

  const aggregateRating = () => {
    const ratingValue = recipe.average_rating || recipe.rating || recipe.avg_rating;
    const ratingCount = recipe.ratings_count || recipe.rating_count || recipe.reviews_count;
    if (!ratingValue || !ratingCount) return undefined;
    return { '@type': 'AggregateRating', ratingValue: Number(ratingValue), ratingCount: Number(ratingCount) };
  };

  const authorSchema = () => {
    const authorName = recipe.author?.name || recipe.user?.name || recipe.author || undefined;
    if (!authorName) return undefined;
    return { '@type': 'Person', name: authorName };
  };

  const commentsToSchema = (list) => {
    if (!Array.isArray(list) || list.length === 0) return undefined;
    return list.slice(0, 20).map((c) => ({
      '@type': 'Comment',
      author: c.user?.name || c.author_name || 'Anonymous',
      datePublished: c.created_at ? new Date(c.created_at).toISOString() : undefined,
      text: c.body || c.text || ''
    }));
  };

  const jsonLd = useMemo(() => {
    if (status !== 'succeeded') return null;
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Recipe',
      name: title,
      description: recipe.description || undefined,
      image: img ? [img] : undefined,
      mainEntityOfPage: url || undefined,
      author: authorSchema(),
      datePublished: recipe.created_at ? new Date(recipe.created_at).toISOString() : undefined,
      recipeYield: recipe.servings || recipe.yield || undefined,
      prepTime: toIsoDuration(recipe.prep_time || recipe.prepTime),
      cookTime: toIsoDuration(recipe.cook_time || recipe.cooking_time || recipe.time),
      totalTime: toIsoDuration(recipe.total_time || recipe.totalTime),
      recipeIngredient: ingredientsToStrings(recipe.ingredients),
      recipeInstructions: instructionsToSchema(recipe.instructions),
      aggregateRating: aggregateRating(),
      keywords: Array.isArray(recipe.tags) ? recipe.tags.join(', ') : recipe.keywords || undefined,
      comment: commentsToSchema(comments),
    };
    // Clean undefined fields
    Object.keys(data).forEach((k) => { if (data[k] === undefined || data[k] === null) delete data[k]; });
    return data;
  }, [status, title, img, recipe, comments]);

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
          {jsonLd && (
            <script
              type="application/ld+json"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
          )}
          <section className="recipe-hero">
            <h1 itemProp="name">{title}</h1>
            {recipe.description && (
              <p style={{ margin: 0, maxWidth: '780px', lineHeight: 1.45 }} itemProp="description">{recipe.description}</p>
            )}
            <div className="recipe-meta-bar">
              {recipe.ingredients && Array.isArray(recipe.ingredients) && (
                <span className="recipe-meta-pill">{recipe.ingredients.length} ingredients</span>
              )}
              {(recipe.time || recipe.cooking_time || recipe.total_time) && (
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
          {/* Comments Section */}
          <section className="recipe-comments" aria-label="Comments">
            <h2>Comments</h2>
            {commentsStatus === 'loading' && <p className="comment-hint" aria-busy="true">Loading comments…</p>}
            {commentsStatus === 'failed' && <p className="comment-error">Failed to load comments.</p>}
            {commentsStatus === 'succeeded' && comments.length === 0 && <p className="comment-hint">No comments yet. Be the first!</p>}
            {commentsStatus === 'succeeded' && comments.length > 0 && (
              <ul className="comment-list">
                {comments.map(c => (
                  <li key={c.id || c._id || Math.random()} className="comment-item">
                    <div className="comment-meta">
                      <strong className="comment-author">{c.user?.name || c.author_name || 'Anon'}</strong>
                      <span className="comment-date">{c.created_at ? new Date(c.created_at).toLocaleString() : ''}</span>
                    </div>
                    <p className="comment-body">{c.body || c.text}</p>
                  </li>
                ))}
              </ul>
            )}

            {token ? (
              <form onSubmit={handleSubmitComment} className="comment-form">
                <label htmlFor="comment-body">Add a comment</label>
                <textarea
                  id="comment-body"
                  value={commentBody}
                  onChange={e => setCommentBody(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows={3}
                  disabled={addCommentStatus === 'loading'}
                />
                <div className="comment-form-actions">
                  <button
                    type="submit"
                    className="primary-button"
                    disabled={addCommentStatus === 'loading' || !commentBody.trim()}
                  >
                    {addCommentStatus === 'loading' ? 'Posting…' : 'Post Comment'}
                  </button>
                </div>
                {addCommentError && <p className="comment-error" role="alert">{addCommentError}</p>}
                {addCommentStatus === 'succeeded' && <p className="comment-success">Comment posted!</p>}
              </form>
            ) : (
              <p className="comment-login-hint">Please <Link to="/login">log in</Link> to comment.</p>
            )}
          </section>
        </article>
      )}
    </div>
  );
};

export default Recipe;
