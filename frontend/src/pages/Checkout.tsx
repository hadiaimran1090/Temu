import { Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../store";
import { clearCart } from "../store/slices/cartSlice";
import { showNotice } from "../store/slices/noticeSlice";
import { useTranslation } from "../hooks/useTranslation";
import { placeOrderApi } from "../services/api";
import { useNavigate } from "react-router-dom";

const textWithLetters = (message: string) =>
  Yup.string()
    .trim()
    .test(
      "contains-letters",
      message,
      (value) => !value || /[A-Za-z]/.test(value),
    );

const getCheckoutSchema = (t: any) =>
  Yup.object({
    name: textWithLetters(t("nameRequired"))
      .min(3, t("nameRequired"))
      .required(t("nameRequired")),
    email: Yup.string()
      .trim()
      .email(t("emailInvalid"))
      .required(t("emailRequired")),
    phone: Yup.string()
      .trim()
      .matches(
        /^(?:03\d{9}|\+923\d{9}|00923\d{9})$/,
        t("phoneRequired"),
      )
      .required(t("phoneRequired")),
    address: textWithLetters(t("addressRequired"))
      .min(8, t("addressRequired"))
      .required(t("addressRequired")),
    city: Yup.string()
      .trim()
      .matches(
        /^[A-Za-z]+(?:[ '\-][A-Za-z]+)*$/,
        t("cityRequired"),
      )
      .required(t("cityRequired")),
    postalCode: Yup.string()
      .trim()
      .matches(
        /^\d{5}$/,
        t("postalRequired"),
      )
      .required(t("postalRequired")),
  });

const getFields = (t: any) => [
  { name: "name", label: t("fullName"), autoComplete: "name" },
  {
    name: "email",
    label: t("emailAddress"),
    type: "email",
    autoComplete: "email",
  },
  {
    name: "phone",
    label: t("phoneNumber"),
    type: "tel",
    placeholder: "03XXXXXXXXX",
    autoComplete: "tel",
  },
  { name: "address", label: t("address"), autoComplete: "street-address" },
  { name: "city", label: t("city"), autoComplete: "address-level2" },
  {
    name: "postalCode",
    label: t("postalCode"),
    inputMode: "numeric",
    placeholder: "e.g. 54000",
    autoComplete: "postal-code",
  },
] as const;

const price = (value: string) => Number(value.replace(/[^\d]/g, ""));

export function Checkout() {
  const navigate = useNavigate();
  const cart = useAppSelector((state) => state.cart.items);
  const userEmail = useAppSelector((state) => state.auth.userEmail);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const total = cart.reduce(
    (sum, item) => sum + price(item.price) * item.quantity,
    0,
  );

  const fields = getFields(t);
  const schema = getCheckoutSchema(t);

  return (
    <section className="checkout-page">
      <div>
        <div className="checkout-banner">
          {t("freeShippingSpecial")} <span>{t("limitedTimeOffer")}</span>
        </div>
        <h1>{t("shippingAddress")}</h1>
        <Formik
          initialValues={{
            name: "",
            email: userEmail ?? "",
            phone: "",
            address: "",
            city: "",
            postalCode: "",
          }}
          validationSchema={schema}
          onSubmit={async (values, { setSubmitting }) => {
            if (!cart.length) {
              dispatch(showNotice(t("cartEmptyCheckout")));
              return;
            }
            try {
              await placeOrderApi({
                name: values.name,
                email: values.email,
                phone: values.phone,
                address: values.address,
                city: values.city,
                postalCode: values.postalCode,
              });
              dispatch(clearCart());
              window.setTimeout(() => navigate("/orders"), 1100);
              dispatch(showNotice(t("checkoutSuccess")));
            } catch (err: any) {
              console.error(err);
              const errMsg = err.response?.data?.message || "Failed to place order. Please try again.";
              dispatch(showNotice(errMsg));
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form className="checkout-form" onSubmit={handleSubmit} noValidate>
              {fields.map((field) => (
                <label key={field.name}>
                  {field.label}
                  <input
                    name={field.name}
                    type={"type" in field ? field.type : "text"}
                    value={values[field.name as "name" | "email" | "phone" | "address" | "city" | "postalCode"]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={
                      "placeholder" in field ? field.placeholder : undefined
                    }
                    autoComplete={field.autoComplete}
                    inputMode={
                      "inputMode" in field ? field.inputMode : undefined
                    }
                    aria-invalid={Boolean(
                      touched[field.name as "name" | "email" | "phone" | "address" | "city" | "postalCode"] &&
                        errors[field.name as "name" | "email" | "phone" | "address" | "city" | "postalCode"]
                    )}
                  />
                  {touched[field.name as "name" | "email" | "phone" | "address" | "city" | "postalCode"] &&
                    errors[field.name as "name" | "email" | "phone" | "address" | "city" | "postalCode"] && (
                      <small className="field-error">
                        {errors[field.name as "name" | "email" | "phone" | "address" | "city" | "postalCode"]}
                      </small>
                    )}
                </label>
              ))}
              <h2>
                {t("itemDetails")} ({cart.length})
              </h2>
              {cart.length ? (
                cart.map((item) => (
                  <article className="checkout-item" key={item.id}>
                    <img src={item.image} alt="" />
                    <span>
                      {item.title}
                      <b>
                        {item.price} × {item.quantity}
                      </b>
                    </span>
                  </article>
                ))
              ) : (
                <p className="checkout-empty">{t("cartEmptyCheckout")}</p>
              )}
              <button
                className="action-button action-button-primary"
                type="submit"
                disabled={!cart.length}
              >
                {t("submitOrder")} ({cart.length})
              </button>
            </form>
          )}
        </Formik>
      </div>
      <aside className="order-summary">
        <h2>{t("orderSummary")}</h2>
        <div>
          <span>{t("itemTotal")}</span>
          <b>Rs.{total}</b>
        </div>
        <div>
          <span>{t("shipping")}</span>
          <b className="green">{t("freeShippingCaps")}</b>
        </div>
        <hr />
        <div className="order-total">
          <span>{t("orderTotal")}</span>
          <b>Rs.{total}</b>
        </div>
        <p>{t("safePayments")}</p>
      </aside>
    </section>
  );
}
