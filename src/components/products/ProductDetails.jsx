import {useEffect} from "react";
import { useLocation, useParams } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {fetchProductAsync} from "@/features/products/productSlice.js";
import {ShoppingCartIcon} from "lucide-react";

export default function ProductDetails() {
  const dispatch = useDispatch()
  const location = useLocation()
  const productId = location.state?.productId || useParams().id

  const {product, status} = useSelector((state) => state.product)
  useEffect(() => {
    console.log('location', location)

    if (productId) {
      dispatch(fetchProductAsync(productId))
      console.log('currentProduct', product)
    }
  }, [dispatch, productId])

  const addToCart = () => {
    console.log('adding to cart', product)
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }
  return (
    <div className={"container w-100"}>
      <h1>Product Details</h1>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <div className={"form-actions"}>
        <button onClick={addToCart} className={"add-to-cart"}>add to cart <ShoppingCartIcon/></button>
        <button onClick={addToCart} className={"buy-now"}>buy now </button>
      </div>
    </div>
  )
}