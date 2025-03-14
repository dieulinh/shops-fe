
import {useEffect,useState} from "react";
import {useSelector} from "react-redux";
import { useSearchParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {confirmOrderAsync,updateOrderAsync} from "@/features/orders/currentOrderSlice.js";

export default function ConfirmOrder() {
  const [shippingAddressVisible, setShippingAddressVisible] = useState(false);
  const {currentOrder,status} = useSelector(state => state.currentOrder);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const payment_intent = searchParams.get('payment_intent');
  const payment_intent_client_secret = searchParams.get('payment_intent_client_secret');
  const toggleShippingAddressForm = () => {
    setShippingAddressVisible(!shippingAddressVisible)
  }
  const [addressFormData,setAddressFormData] = useState({});
  const handleFormChange  = (event) => {

    setAddressFormData({...addressFormData, [event.target.name]: event.target.value})
    console.log(addressFormData)
  }

  const saveShippingAddress = () => {
    console.log('save shipping address', addressFormData)

    dispatch(updateOrderAsync({payment_intent,orderParams: addressFormData}))
  }
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
      <div role={"tablist"} aria-label="Order information">
        <div role={"tab"} aria-selected={"true"} aria-controls="panel-1" tabIndex={"0"}>
          <h2>General info</h2>
          <p>Order Id: {currentOrder.id}</p>
          <p>Amount: {currentOrder.price}</p>
          <p>Status: {currentOrder.status}</p>
        </div>

      </div>
      <div className={"form-actions"}>
        <button onClick={toggleShippingAddressForm}>Add Shipping address</button>
      </div>
      {shippingAddressVisible && (<div className={"shipping-address-modal"}>
        <div className={"form-control"}>
          <label htmlFor="shipping_address">Shipping Address</label>
          <input type="text" name="shipping_address" onChange={handleFormChange} id="shipping_address"/>
        </div>
        <div className={"form-control"}>
          <label htmlFor="shipping_city">Shipping city</label>
          <input type="text" name="shipping_city" id="shipping_city" onChange={handleFormChange}/>
        </div>
        <div className={"form-control"}>
          <label htmlFor="shipping_state">Shipping state</label>
          <input type="text" name="shipping_state" onChange={handleFormChange} id="shipping_state"/>
        </div>

        <div className={"form-control"}>
          <label htmlFor="shipping_country">Country</label>
          <input type="text" name="shipping_country" onChange={handleFormChange} id="shipping_country"/>
        </div>
        <div className={"form-actions"}>
          <button className={"primary-button"} onClick={saveShippingAddress}>Save</button>
        </div>
      </div>)
      }
    </div>
  );
}