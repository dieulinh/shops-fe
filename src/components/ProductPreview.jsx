
import styles from "./ProductPreview.module.css";
function ProductPreview({item}) {

  return <div className={styles.product}>
    <h1>{item.name}</h1>
    <p>$ {item.price}</p>
    <p>{item.description}</p>
  </div>
}
export default ProductPreview