
import {useEffect} from "react";
import {useSelector} from "react-redux";
import { useSearchParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {confirmOrderAsync} from "@/features/orders/currentOrderSlice.js";

export default function ConfirmOrder() {
  const {currentOrder,status} = useSelector(state => state.currentOrder);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const payment_intent = searchParams.get('payment_intent');
  const payment_intent_client_secret = searchParams.get('payment_intent_client_secret');
  useEffect(() => {
    if(status==='idle')
    {
      dispatch(confirmOrderAsync({payment_intent, payment_intent_client_secret}))
    }

  },[dispatch, status])
  useEffect(() => {
    if(!currentOrder) return;
    console.log('current order',currentOrder)

  }, [currentOrder]);

  if(status==='loading') return <div>Loading...</div>
  if(!currentOrder) return <div>Order data...</div>


  return (
    <div>
      <h1>Confirm Order</h1>
      <div>
        <p>Order Id: {currentOrder.id}</p>
        <p>Amount: {currentOrder.price}</p>
        <p>Status: {currentOrder.status}</p>
      </div>

    </div>
  );
}