import { useAppDispatch, useAppSelector } from "../store";
import { clearAuth } from "../store/slices/authSlice";
import { syncCart } from "../store/slices/cartSlice";
import { useTranslation } from "../hooks/useTranslation";

export function Dashboard() {
  const cart = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleLogout = () => {
    dispatch(clearAuth());
    dispatch(syncCart());
  };

  return (
    <section className="content-card">
      <h1>{t("yourAccount")}</h1>
      <p>{t("myCart")} items: {cart.length}</p>
      <button
        className="action-button action-button-secondary"
        onClick={handleLogout}
      >
        {t("logout")}
      </button>
    </section>
  );
}
