import { Formik } from "formik";
import * as Yup from "yup";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { setAuth } from "../store/slices/authSlice";
import { mergeGuestCart, syncCart } from "../store/slices/cartSlice";
import { useTranslation } from "../hooks/useTranslation";
import { loginUser, registerUser } from "../services/api";

export function Auth({ register = false }: { register?: boolean }) {
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (token) return <Navigate to="/" replace />;

  const complete = async (email: string, tokenVal: string) => {
    dispatch(setAuth({ email, token: tokenVal }));
    await dispatch(mergeGuestCart());
    await dispatch(syncCart());
    navigate("/");
  };

  const getValidationSchema = () =>
    Yup.object({
      email: Yup.string()
        .email(t("emailInvalid"))
        .required(t("emailRequired")),
      password: Yup.string()
        .min(8, t("passwordTooShort"))
        .matches(/[A-Z]/, t("passwordCapital"))
        .matches(/[0-9]/, t("passwordNumber"))
        .required(t("passwordRequired")),
    });

  return (
    <section className="auth-page">
      <div className="auth-promo">
        <strong>{t("brand")}</strong>
        <h1>{t("findNextFavorite")}</h1>
        <p>{t("authPromoSub")}</p>
        <div>
          ✓ {t("freeShipping")}
          <br />✓ {t("secureCheckout")}
          <br />✓ {t("easyReturns")}
        </div>
      </div>
      <div className="content-card form-card">
        <p className="eyebrow">{t("welcomeToTemu")}</p>
        <h1>{register ? t("createAccount") : t("welcomeBack")}</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={getValidationSchema()}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            try {
              if (register) {
                const data = await registerUser({
                  email: values.email,
                  password: values.password,
                });
                await complete(data.email, data.token);
              } else {
                const data = await loginUser({
                  email: values.email,
                  password: values.password,
                });
                await complete(data.email, data.token);
              }
            } catch (err: any) {
              console.error(err);
              const message =
                err.response?.data?.message ||
                "Authentication failed. Please check your credentials.";
              setFieldError("email", message);
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
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} noValidate>
              <label>
                {t("emailAddress")}
                <input
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="you@example.com"
                />
                {touched.email && errors.email && (
                  <small className="field-error">{errors.email}</small>
                )}
              </label>
              <label>
                {t("password")}
                <input
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={t("passwordTooShort")}
                />
                {touched.password && errors.password && (
                  <small className="field-error">{errors.password}</small>
                )}
              </label>
              <button
                className="action-button action-button-primary"
                type="submit"
                disabled={isSubmitting}
              >
                {register ? t("createAccountBtn") : t("loginBtn")}
              </button>
            </form>
          )}
        </Formik>
        <p>
          {register ? t("alreadyHaveAccount") : t("newToTemu")}{" "}
          <Link to={register ? "/login" : "/register"}>
            {register ? t("loginBtn") : t("createAnAccount")}
          </Link>
        </p>
      </div>
    </section>
  );
}
