import './common.css'
import './App.css'

import {Routes, Route} from 'react-router-dom';
import TaskList from "./components/Tasks.jsx";
import Products from "@/components/Products.jsx";
import Layout from "@/layout/Layout.jsx";
import ProductForm from "@/components/products/ProductForm.jsx";
import Cart from "@/components/cart/Cart.jsx";
import ProductDetails from "@/components/products/ProductDetails.jsx";
import ProductPhotoForm from "@/components/products/ProductPhotoForm.jsx";
import CheckoutCart from "@/components/cart/CheckoutCart.jsx";
import {loadStripe} from "@stripe/stripe-js";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import {Elements} from "@stripe/react-stripe-js";
import ConfirmOrder from "@/components/orders/ConfirmOrder.jsx";
import Login from "@/components/auth/Login.jsx";
import GoogleEventCalendar from "@/components/google_events/Calendar.jsx";
import Calendar from "@/components/Calendar.jsx";
import JobListing from "@/components/jobs/JobListing.jsx";
import JobApplications from "@/components/jobs/JobApplications.jsx";
import JobApplication from "@/components/jobs/JobApplication.jsx";
import Job from "@/components/jobs/Job.jsx";
import {Dashboard} from "@/components/dashboard/Dashboard.jsx";
import Logout from "@/components/auth/Logout.jsx";
import Posts from "@/components/blogs/Posts.jsx";
import NewPost from "@/components/blogs/NewPost.jsx";
import CustomerLogin from "@/components/customers/Login.jsx";
import CustomerSignUp from "@/components/customers/SignUp.jsx";


const About = () =>(<div className={"container"}> <h1>About Page</h1></div>);
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const App = () => {
  const [token, setToken] = useState(null);
  const [stripeOptions, setStripeOptions] = useState({});
  const stripeToken = useSelector(state => state.checkout.clientSecret);
  const appearance = {
    theme: 'stripe',
  };

  useEffect(() => {
    if(!stripeToken) return;
    setStripeOptions({
      clientSecret: stripeToken,
      appearance
    });
  }, [stripeToken]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout"  element={
            <Elements stripe={stripePromise} options={{ clientSecret: stripeToken }}>
              <CheckoutCart />
            </Elements>
          } />

          <Route path="/login" element={<Login setToken={setToken}/>} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/availability" element={<GoogleEventCalendar />} />
          <Route path="/orders/confirm" element={<ConfirmOrder />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/about" element={<About />} />
          <Route path={"/products"} element={<Products />} />
          <Route path={"/products/:id"} element={<ProductDetails />} />
          <Route path={"/products/:id/upload"} element={<ProductPhotoForm />} />
          <Route path={"/products/add"} element={<ProductForm />} />

          <Route path={"/jobs"} element={<JobListing />} />
          <Route path={"/job_applications"} element={<JobApplications />} />
          <Route path={"/job_applications/:job_application_id"} element={<JobApplication />} />
          <Route path={"/jobs/:job_id"} element={<Job />} />
          <Route path={"/blogs"} element={<Posts />} />
          <Route path={"/blogs/new"} element={<NewPost />} />
          <Route path={"/logout"} element={<Logout />} />

          {/*Customers*/}
          <Route path={"/customer/login"} element={<CustomerLogin />} />
          <Route path={"/customer/sign_up"} element={<CustomerSignUp />} />
          <Route
            path="/dashboard"
            element={

                <Dashboard />

            }
          />

        </Route>

      </Routes>
    </>
  );
};

export default App;
