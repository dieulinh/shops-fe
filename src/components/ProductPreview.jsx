
import styles from "./ProductPreview.module.css";
import { Link } from "react-router-dom";

function formatPrice(v, currency = "CAD") {
  if (v == null || isNaN(Number(v))) return "";
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(Number(v));
  } catch {
    return `CA$ ${v}`;
  }
}

function ProductPreview({ item }) {
  const img = item?.image_url || item?.imageUrl || item?.photo ||
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80&auto=format&fit=crop";

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
    </div>
  );
}

export default ProductPreview