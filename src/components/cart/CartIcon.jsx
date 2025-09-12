
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { ShoppingCart,ShoppingBag } from "lucide-react";
import styles from "./CartIcon.module.css";

export default function CartIcon({ size = 35 }) {
  const cartCount = useSelector((state) => state.cart.count);
  const prev = useRef(cartCount);
  const badgeRef = useRef(null);

  useEffect(() => {
    if (cartCount !== prev.current && badgeRef.current) {
      badgeRef.current.classList.remove(styles.pop);
      // force reflow to restart animation
      // eslint-disable-next-line no-unused-expressions
      badgeRef.current.offsetWidth;
      badgeRef.current.classList.add(styles.pop);
      prev.current = cartCount;
    }
  }, [cartCount]);

  return (
    <span className={styles.wrapper} aria-label={`Cart with ${cartCount} items`}>
      <ShoppingBag className={styles.icon} size={size} aria-hidden="true" />
      {cartCount > 0 && (
        <span ref={badgeRef} className={styles.badge} role="status">
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      )}
    </span>
  );
}