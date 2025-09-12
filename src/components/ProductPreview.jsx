
import styles from "./ProductPreview.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice.js";
import PropTypes from "prop-types";
import { formatPrice } from "@/utils/utils.js";

// formatPrice extracted to utils for reuse

function ProductPreview({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const img = item?.image_url || item?.imageUrl || item?.photo ||
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80&auto=format&fit=crop";

  const handleAddToCart = (e) => {
    // Prevent the card link navigation when clicking the button
    e?.preventDefault?.();
    e?.stopPropagation?.();
    dispatch(addToCart(item));
  };

  const handleBuyNow = (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    dispatch(addToCart(item));
    navigate('/cart');
  };

  return (
    <div className={styles.card}>
      <Link to={`/products/${item.id}`} state={{ productId: item.id }} className={styles.link}>
        <div className={styles.media}>
          <img className={styles.image} src={img} alt={item?.name || "Product image"} loading="lazy" />
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>{item?.name}</h2>
          <div className={styles.meta}>
            <span className={styles.price}>{formatPrice(item?.price)}</span>
          </div>
        </div>
      </Link>
      <div className={styles.actions}>
        <button className={`${styles.btn} add-to-cart`} onClick={handleAddToCart}>Add to cart</button>
        <button className={`${styles.btn} buy-now`} onClick={handleBuyNow}>Buy now</button>
      </div>
    </div>
  );
}

export default ProductPreview

ProductPreview.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    image_url: PropTypes.string,
    imageUrl: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
}