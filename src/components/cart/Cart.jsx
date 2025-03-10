
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setCart, removeFromCart} from "@/features/cart/cartSlice.js";
import CartItem from "@/components/cart/CartItem.jsx";

export default function Cart() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {cart} = useSelector(state => state.cart)
  const handleQuantityChange = (index, newQuantity) => {
    dispatch(setCart({index, newQuantity}))
  };
  const handleCheckout = () => {
    navigate('/checkout')
  }
  const removeCartItem = (itemId) => {
    dispatch(removeFromCart({id: itemId}))
  }

  return <>
    <h1>Checkout cart with these items:</h1>
    {cart.map((item, index) => {return (
      <div className={"cart-item"} key={index}>
       <CartItem item={item} onRemoveItem={() => removeCartItem(item.id)} onQuantityChange={(newQuantity) => handleQuantityChange(index, newQuantity)} />
      </div>)} )
    }
      <div className={"form-actions"}>
        <button className={"primary-button"} onClick={handleCheckout}>Checkout</button>
      </div>

  </>
}