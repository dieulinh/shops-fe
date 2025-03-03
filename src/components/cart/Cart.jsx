import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {updateCart,setCart} from "@/features/cart/cartSlice.js";
import CartItem from "@/components/cart/CartItem.jsx";

export default function Cart() {
  const navigate = useNavigate();
  const [currentItem, setCurrentItem] = useState({})
  const dispatch = useDispatch();
  const {cart} = useSelector(state => state.cart)
  const handleRemove = () => {
    console.log('removing item')
  }
  const handleQuantityChange = (index, newQuantity) => {
    dispatch(setCart({index, newQuantity}))
    // setCart((prevCart) => {
    //   const updatedCart = [...prevCart];
    //   updatedCart[index] = { ...updatedCart[index], quantity: newQuantity };
    //   return updatedCart;
    // });
  };
  const handleCheckout = () => {
    console.log('checking out')
    navigate('/checkout')
  }

  return <>
    <h1> your cart</h1>
    {cart.map((item, index) => {return (
      <div className={"cart-item"} key={index}>
       <CartItem item={item}  onQuantityChange={(newQuantity) => handleQuantityChange(index, newQuantity)} />
      </div>)} )
    }
      <div className={"form-actions"}>
        <button className={"primary-button"} onClick={handleCheckout}>Checkout</button>
      </div>

  </>
}