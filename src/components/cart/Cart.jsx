
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

  return (
    <div className="cart-page container">
      <h1 className="cart-title">Your Cart</h1>
      <p className="cart-subtitle">Review the items below before proceeding to checkout.</p>
      <div className="cart-items">
        {cart.length === 0 && (
          <div className="empty-state">Your cart is empty.</div>
        )}
        {cart.map((item, index) => (
          <div className="cart-item" key={index}>
            <CartItem
              item={item}
              onRemoveItem={() => removeCartItem(item.id)}
              onQuantityChange={(newQuantity) => handleQuantityChange(index, newQuantity)}
            />
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div className="form-actions cart-actions">
          <button className="primary-button" onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  )
}