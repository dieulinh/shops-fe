import {signUpCustomerAsync} from "@/features/cusomers/customersSlice.js";
import {useDispatch} from "react-redux";
const CustomerSignUp = () => {
  const dispatch = useDispatch();
  const handleSignUp = (event) => {
    dispatch(signUpCustomerAsync({
      email: event.target.email.value,
      password: event.target.password.value,
    }));
  }
  return (
    <div className={"login-wrapper"}>
      <h1>Customer Login</h1>
      <form className={"customer-login"} onSubmit={handleSignUp}>
        <div className={"form-control"}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={"form-control"}>
          <label htmlFor="password" >Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className={"form-actions flex-full"}>
          <button type="submit" className={"full-flex login-btn "}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}
export default CustomerSignUp;