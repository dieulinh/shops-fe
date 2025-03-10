import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';

const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentIntent, setPaymentIntent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!stripe || !clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      setPaymentIntent(paymentIntent);
    });
  }, [stripe, clientSecret]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage('');

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:5173/orders/confirm?payment_intent={PAYMENT_INTENT_ID}&payment_intent_client_secret={PAYMENT_INTENT_CLIENT_SECRET}',
      },
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setMessage('Payment successful!');
    }
    setLoading(false);
  };

  return (
    <div>
      {paymentIntent && <p>Status: {paymentIntent.status}</p>}
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button type="submit" disabled={!stripe || loading}>
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CheckoutForm;
