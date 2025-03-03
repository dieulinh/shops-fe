import {useCallback, useEffect, useState} from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

import {fetchProductAsync} from "@/features/products/productSlice.js";
import {addToCart} from "@/features/cart/cartSlice.js";
import {ShoppingCartIcon} from "lucide-react";
const { SERVER_PATH } = process.env

export default function ProductDetails() {
  const {cart} = useSelector(state => state.cart)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const productId = location.state?.productId || useParams().id
  const [photoUrls,setPhotoUrls] = useState([])
  const handleBuy = () => {
    console.log('buying now')
    dispatch(addToCart(product))
    console.log(cart)
    navigate('/cart')
  }
  const {product, status} = useSelector((state) => state.product)

  useEffect(() => {

    if (productId) {
      dispatch(fetchProductAsync(productId))
    }
  }, [productId])

  useEffect(() => {
    console.log('here is cart',cart)
  }, [cart.count]);

  useEffect(() => {
    if(!product) return;
    if (product.photos?.length) {
      setPhotoUrls(product.photos.map(photo => `${SERVER_PATH}${photo.image_url}`))
    }
  }, [product])

  const handleAddToCart = () => {
    console.log('adding to cart', product)
    dispatch(addToCart(product))
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }
  console.log('render ...', product)
  return (
    <div className={"container w-100"}>

      <h1 className={"product-title"}>{product.name}</h1>
      <div className={"product-view"}>
        <div className={"flex-column photo-gallery"}>
          {product.photos?.length && photoUrls.map((photo,index) => <img src={photo} alt={product.name} key={index}/>)}
        </div>

        <div>
          <p className={"product-description"}>{product.description}</p>
          <div className={"form-actions"}>
            <button disabled={status==='loading'} onClick={handleAddToCart} className={"add-to-cart"}>add to cart <ShoppingCartIcon/></button>
            <button onClick={handleBuy} className={"buy-now"}>buy now </button>
          </div>
        </div>
      </div>
    </div>
  )
}