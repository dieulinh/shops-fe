import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './recipes.css';

// Small presentational card for a recipe preview
const RecipeCard = ({ recipe }) => {
  const title = recipe.title || recipe.name || `Recipe #${recipe.id}`;
  const description = recipe.description?.slice(0, 140) || '';
  const img = recipe.image_url || recipe.photo_url || recipe.cover || null;

  return (
    <article className="recipe-card">
      <Link to={`/recipes/${recipe.id}`} className="recipe-card-link" aria-label={title}>
        <div className="recipe-card-media">
          {img ? (
            <img src={img} alt={title} loading="lazy" />
          ) : (
            <div className="recipe-card-placeholder" aria-hidden="true">
              <span className="recipe-card-initials">{title.slice(0, 2).toUpperCase()}</span>
            </div>
          )}
        </div>
        <div className="recipe-card-body">
          <h3 className="recipe-card-title">{title}</h3>
          {description && <p className="recipe-card-desc">{description}{recipe.description?.length > 140 ? '…' : ''}</p>}
          <div className="recipe-card-footer">
            {recipe.ingredients && Array.isArray(recipe.ingredients) && (
              <span className="recipe-chip" title={`${recipe.ingredients.length} ingredients`}>
                {recipe.ingredients.length} ing
              </span>
            )}
            {recipe.time || recipe.cook_time || recipe.total_time ? (
              <span className="recipe-chip" title="Estimated time">
                {(recipe.time || recipe.cook_time || recipe.total_time)}
              </span>
            ) : null}
          </div>
        </div>
      </Link>
    </article>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default RecipeCard;
