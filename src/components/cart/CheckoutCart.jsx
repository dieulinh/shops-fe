import {useEffect} from "react";
import {useSelector} from "react-redux";

export default function CheckoutCart() {
  const processCheckout = () => {
    console.log('processing checkout')
  }
  const {cart} = useSelector(state => state.cart)
  return (
    <div>
      <h1>Checkout Cart</h1>
      {cart.map((item, index) => {

        return (
          <div className="cart-item" key={index}>
            <div>{item.name}</div>
            <div>{item.quantity}</div>
            <div>{item.price}</div>
            <div>{item.price*item.quantity}</div>
          </div>
        );
      })}
      <p>total: </p>
      <button onClick={processCheckout}>Save and Continue</button>

    </div>
  );
}