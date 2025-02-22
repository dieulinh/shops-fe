
import styles from "./ProductPreview.module.css";
import {Link} from "react-router-dom";
function ProductPreview({item}) {

  return <div className={styles.product}>
    <Link to={`/products/${item.id}`} state={{ productId: item.id }}>
      <h1>{item.name}</h1>
      <p>$ {item.price}</p>
      <p>{item.description}</p>
    </Link>
  </div>
}
export default ProductPreview