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
    <section className="grid grid-cols-[1.15fr_0.85fr] gap-[28px] max-w-[1200px] mx-auto items-start max-[900px]:grid-cols-1">
      <div>
        <div className="p-[10px_14px] rounded-lg bg-red-100 border border-red-200 text-red-800 text-[0.86rem] font-bold flex items-center justify-between">
          {t("freeShippingSpecial")} <span className="text-[#ef4444] text-[0.76rem] uppercase font-bold">{t("limitedTimeOffer")}</span>
        </div>
        <h1 className="m-[0_0_18px] text-[2.15rem] text-[#10233b] font-bold">{t("shippingAddress")}</h1>
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
            <form className="flex flex-col gap-4 mt-[18px]" onSubmit={handleSubmit} noValidate>
              {fields.map((field) => (
                <label className="flex flex-col gap-2 text-[0.88rem] font-bold text-[#475569]" key={field.name}>
                  {field.label}
                  <input
                    className="border border-[#cfd4dc] rounded-lg p-3 text-[0.94rem] text-[#1e293b] bg-white focus:outline-none focus:border-[#4ea5e6]"
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
                      <small className="text-[#b91c1c] text-xs font-semibold mt-1">
                        {errors[field.name as "name" | "email" | "phone" | "address" | "city" | "postalCode"]}
                      </small>
                    )}
                </label>
              ))}
              <h2 className="mt-3 mb-0 text-[1.25rem] text-[#10233b] font-bold">
                {t("itemDetails")} ({cart.length})
              </h2>
              {cart.length ? (
                cart.map((item) => (
                  <article className="grid grid-cols-[48px_1fr] gap-3 items-center border-b border-[#e2e8f0] pb-3" key={item.id}>
                    <img className="w-12 h-12 rounded-lg object-cover" src={item.image} alt="" />
                    <span className="text-[0.88rem] text-[#334155] flex justify-between items-center">
                      {item.title}
                      <b className="text-[#0f172a] font-bold">
                        {item.price} × {item.quantity}
                      </b>
                    </span>
                  </article>
                ))
              ) : (
                <p className="text-[0.88rem] text-[#64748b]">{t("cartEmptyCheckout")}</p>
              )}
              <button
                className="inline-block no-underline border-0 rounded-full py-[13px] px-[20px] font-bold cursor-pointer transition-all duration-180 hover:-translate-y-[1px] text-white bg-gradient-to-br from-[#ff8c1a] to-[#ff6b2f] shadow-[0_12px_24px_rgba(255,111,31,0.3)] disabled:opacity-50 disabled:cursor-not-allowed text-center"
                type="submit"
                disabled={!cart.length}
              >
                {t("submitOrder")} ({cart.length})
              </button>
            </form>
          )}
        </Formik>
      </div>
      <aside className="p-6 rounded-2xl border border-[rgba(82,143,191,0.15)] bg-white shadow-[0_12px_32px_rgba(15,23,42,0.06)] flex flex-col gap-3.5">
        <h2 className="m-[0_0_4px] text-[1.25rem] text-[#10233b] font-bold">{t("orderSummary")}</h2>
        <div className="flex justify-between text-[0.88rem] text-[#475569]">
          <span>{t("itemTotal")}</span>
          <b className="text-[#0f172a] font-bold">Rs.{total}</b>
        </div>
        <div className="flex justify-between text-[0.88rem] text-[#475569]">
          <span>{t("shipping")}</span>
          <b className="text-[#15803d] font-bold">{t("freeShippingCaps")}</b>
        </div>
        <hr className="border-0 border-t border-[#e2e8f0] my-1" />
        <div className="flex justify-between text-[1.15rem] text-[#10233b] font-black">
          <span>{t("orderTotal")}</span>
          <b>Rs.{total}</b>
        </div>
        <p className="text-[#15803d] font-bold mt-0.5 text-center text-[0.78rem]">{t("safePayments")}</p>
      </aside>
    </section>
  );
}
