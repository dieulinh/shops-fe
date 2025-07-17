
import styles from "./ProductPreview.module.css";
import {Link} from "react-router-dom";
function ProductPreview({item}) {

  return <div className="product-preview">
    <Link to={`/products/${item.id}`} state={{ productId: item.id }}>
      <h1 className={"product-headline"}>{item.name}</h1>
      <p>$ {item.price}</p>
      <p>{item.description}</p>
    </Link>
  </div>
}
export default ProductPreview