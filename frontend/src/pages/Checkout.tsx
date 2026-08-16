import { Formik } from "formik";
import * as Yup from "yup";
import { useAppContext } from "../contexts/AppContext";
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

const schema = Yup.object({
  name: textWithLetters(
    "Full Name is required and must be at least 3 characters.",
  )
    .min(3, "Full Name is required and must be at least 3 characters.")
    .required("Full Name is required and must be at least 3 characters."),
  email: Yup.string()
    .trim()
    .email("Email is required and must have a valid email format.")
    .required("Email is required and must have a valid email format."),
  phone: Yup.string()
    .trim()
    .matches(
      /^(?:03\d{9}|\+923\d{9}|00923\d{9})$/,
      "Phone is required and must be a valid Pakistani phone number.",
    )
    .required("Phone is required and must be a valid Pakistani phone number."),
  address: textWithLetters("Address is required and must contain letters.")
    .min(8, "Address is required and must be at least 8 characters.")
    .required("Address is required."),
  city: Yup.string()
    .trim()
    .matches(
      /^[A-Za-z]+(?:[ '\-][A-Za-z]+)*$/,
      "City is required and must contain letters only.",
    )
    .required("City is required."),
  postalCode: Yup.string()
    .trim()
    .matches(
      /^\d{5}$/,
      "Postal Code is required and should contain a valid postal code format.",
    )
    .required(
      "Postal Code is required and should contain a valid postal code format.",
    ),
});

const fields = [
  { name: "name", label: "Full name", autoComplete: "name" },
  {
    name: "email",
    label: "Email address",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "phone",
    label: "Phone number",
    type: "tel",
    placeholder: "03XXXXXXXXX",
    autoComplete: "tel",
  },
  { name: "address", label: "Address", autoComplete: "street-address" },
  { name: "city", label: "City", autoComplete: "address-level2" },
  {
    name: "postalCode",
    label: "Postal code",
    inputMode: "numeric",
    placeholder: "e.g. 54000",
    autoComplete: "postal-code",
  },
] as const;

const price = (value: string) => Number(value.replace(/[^\d]/g, ""));

export function Checkout() {
  const navigate = useNavigate();
  const { cart, userEmail, clearCart, showNotice } = useAppContext();
  const total = cart.reduce(
    (sum, item) => sum + price(item.price) * item.quantity,
    0,
  );

  return (
    <section className="checkout-page">
      <div>
        <div className="checkout-banner">
          Free shipping special for you <span>Limited-time offer</span>
        </div>
        <h1>Shipping address</h1>
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
              showNotice(
                "Your cart is empty. Add an item before placing an order.",
              );
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
              clearCart();
              window.setTimeout(() => navigate("/orders"), 1100);
              showNotice("Checkout successful — your order has been placed.");
            } catch (err: any) {
              console.error(err);
              const errMsg = err.response?.data?.message || "Failed to place order. Please try again.";
              showNotice(errMsg);
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
                    value={values[field.name]}
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
                      touched[field.name] && errors[field.name],
                    )}
                  />
                  {touched[field.name] && errors[field.name] && (
                    <small className="field-error">{errors[field.name]}</small>
                  )}
                </label>
              ))}
              <h2>Item details ({cart.length})</h2>
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
                <p className="checkout-empty">
                  Your cart is empty. Add an item before placing an order.
                </p>
              )}
              <button
                className="action-button action-button-primary"
                type="submit"
                disabled={!cart.length}
              >
                Submit order ({cart.length})
              </button>
            </form>
          )}
        </Formik>
      </div>
      <aside className="order-summary">
        <h2>Order summary</h2>
        <div>
          <span>Items total</span>
          <b>Rs.{total}</b>
        </div>
        <div>
          <span>Shipping</span>
          <b className="green">FREE</b>
        </div>
        <hr />
        <div className="order-total">
          <span>Order total</span>
          <b>Rs.{total}</b>
        </div>
        <p>Safe payment options</p>
      </aside>
    </section>
  );
}
