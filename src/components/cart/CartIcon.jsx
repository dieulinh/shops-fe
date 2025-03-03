
import {useSelector} from "react-redux";

export default function CartIcon() {
  const cartCount = useSelector(state => state.cart.count)

  return (
      <span>{cartCount}</span>
  )
}