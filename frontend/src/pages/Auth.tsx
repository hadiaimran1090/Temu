import { Formik } from "formik";
import * as Yup from "yup";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { setAuth } from "../store/slices/authSlice";
import { mergeGuestCart, syncCart } from "../store/slices/cartSlice";
import { useTranslation } from "../hooks/useTranslation";
import { loginUser, registerUser, checkEmailApi } from "../services/api";

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

  const getValidationSchema = () => {
    if (register) {
      return Yup.object({
        email: Yup.string()
          .email(t("emailInvalid"))
          .required(t("emailRequired")),
        password: Yup.string()
          .min(8, t("passwordTooShort"))
          .matches(/[A-Z]/, t("passwordCapital"))
          .matches(/[0-9]/, t("passwordNumber"))
          .required(t("passwordRequired")),
      });
    } else {
      return Yup.object({
        email: Yup.string()
          .email(t("emailInvalid"))
          .required(t("emailRequired")),
        password: Yup.string()
          .required(t("passwordRequired")),
      });
    }
  };

  return (
    <section className="min-h-[620px] grid grid-cols-2 max-w-[1050px] mx-auto my-[30px] overflow-hidden rounded-[22px] shadow-[0_16px_44px_rgba(15,23,42,0.16)] max-[900px]:grid-cols-1 max-[900px]:my-2.5 max-[900px]:min-h-[540px]">
      <div className="p-[58px] text-white bg-gradient-to-br from-[#ff562b] to-[#ff9417] max-[900px]:p-[34px] flex flex-col gap-4">
        <strong className="inline-block p-2 rounded-lg bg-white text-[#ff5b2e] self-start text-sm">{t("brand")}</strong>
        <h1 className="m-0 text-[3.1rem] leading-[1.05] font-black max-[900px]:text-[2.3rem]">{t("findNextFavorite")}</h1>
        <p className="m-0 text-sm opacity-90">{t("authPromoSub")}</p>
        <div className="mt-[50px] leading-[2] font-bold max-[900px]:hidden">
          ✓ {t("freeShipping")}
          <br />✓ {t("secureCheckout")}
          <br />✓ {t("easyReturns")}
        </div>
      </div>
      <div className="m-0 rounded-none grid align-content-center shadow-none p-[36px_32px] bg-white max-[720px]:p-5 flex flex-col gap-3">
        <p className="m-0 mb-2 text-[#ff7a00] font-extrabold uppercase tracking-[0.12em] text-[0.82rem]">{t("welcomeToTemu")}</p>
        <h1 className="m-[0_0_12px] text-[1.6rem] text-[#10233b] font-bold">{register ? t("createAccount") : t("welcomeBack")}</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={getValidationSchema()}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            try {
              if (register) {
                const data = await registerUser({
                  email: values.email,
                  password: values.password,
                  name: values.email.split("@")[0], // Include dummy name as backend requires name
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
            setFieldError,
            isSubmitting,
          }) => (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
              <label className="flex flex-col gap-2 text-[0.88rem] font-bold text-[#475569]">
                {t("emailAddress")}
                <input
                  className="border border-[#cfd4dc] rounded-lg p-3 text-[0.94rem] text-[#1e293b] bg-white focus:outline-none focus:border-[#4ea5e6]"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={async (e) => {
                    handleBlur(e);
                    const emailVal = e.target.value.trim();
                    if (register && emailVal && !errors.email) {
                      try {
                        const res = await checkEmailApi(emailVal);
                        if (res.exists) {
                          setFieldError("email", t("emailExists"));
                        }
                      } catch (err) {
                        console.error("Check email failed:", err);
                      }
                    }
                  }}
                  placeholder={t("enterEmail")}
                />
                {touched.email && errors.email && (
                  <small className="text-[#b91c1c] text-xs font-semibold mt-1">{errors.email}</small>
                )}
              </label>
              <label className="flex flex-col gap-2 text-[0.88rem] font-bold text-[#475569]">
                {t("password")}
                <input
                  className="border border-[#cfd4dc] rounded-lg p-3 text-[0.94rem] text-[#1e293b] bg-white focus:outline-none focus:border-[#4ea5e6]"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={t("enterPassword")}
                />
                {touched.password && errors.password && (
                  <small className="text-[#b91c1c] text-xs font-semibold mt-1">{errors.password}</small>
                )}
              </label>
              <button
                className="w-full inline-block no-underline border-0 rounded-full py-[13px] px-[20px] font-bold cursor-pointer transition-all duration-180 hover:-translate-y-[1px] text-white bg-gradient-to-br from-[#ff8c1a] to-[#ff6b2f] shadow-[0_12px_24px_rgba(255,111,31,0.3)] text-center disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isSubmitting}
              >
                {register ? t("createAccountBtn") : t("loginBtn")}
              </button>
            </form>
          )}
        </Formik>
        <p className="mt-3 mb-0 text-[0.88rem] text-center text-[#64748b]">
          {register ? t("alreadyHaveAccount") : t("newToTemu")}{" "}
          <Link className="text-[#4ea5e6] no-underline font-semibold hover:underline" to={register ? "/login" : "/register"}>
            {register ? t("loginBtn") : t("createAnAccount")}
          </Link>
        </p>
      </div>
    </section>
  );
}
