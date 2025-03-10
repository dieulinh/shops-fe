import { generateCheckoutTokenAsync} from "@/features/checkout/checkoutSlice";
import {useSelector, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {Elements, PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutForm from "@/components/cart/CheckoutForm.jsx";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default function CheckoutCart() {

  const {stripeToken} = useSelector(state => state.checkout)
  const [productLines, setProductLines] = useState([])

  const {cart} = useSelector(state => state.cart)

  const dispatch = useDispatch();
  useEffect(() => {
    setProductLines(cart.map((item) => {
      return {
        product_id: item.id,
        product_name: item.name,
        quantity: parseInt(item.quantity),
        unit_price: parseFloat(item.price)
      }
    }))
  }, [cart]);
  useEffect(() => {
    if(!stripeToken) return;

  }, [stripeToken]);

  const processCheckout = (e) => {
    console.log(productLines)
    e.preventDefault()
    dispatch(generateCheckoutTokenAsync({checkout_info: productLines}))
  }

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

      {!stripeToken && <button className={"primary-button"} onClick={processCheckout}>Save and Continue</button>}
      {stripeToken && <Elements stripe={stripePromise} options={{clientSecret: stripeToken}}>
        <CheckoutForm clientSecret={stripeToken}/>
      </Elements>
      }

    </div>
  );
}