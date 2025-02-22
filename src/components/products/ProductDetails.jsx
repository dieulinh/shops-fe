import {useEffect} from "react";
import { useLocation, useParams } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {fetchProductAsync} from "@/features/products/productSlice.js";

export default function ProductDetails() {

  const dispatch = useDispatch()
  const location = useLocation()
  const productId = location.state?.productId

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
      <div>
        <button onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  )
}