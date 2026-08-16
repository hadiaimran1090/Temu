import { Formik } from "formik";
import * as Yup from "yup";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { loginUser, registerUser } from "../services/api";

const validation = Yup.object({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Use at least one capital letter")
    .matches(/[0-9]/, "Use at least one number")
    .required("Password is required"),
});

export function Auth({ register = false }: { register?: boolean }) {
  const { token, login } = useAppContext();
  const navigate = useNavigate();

  if (token) return <Navigate to="/cart" replace />;

  const complete = (email: string, tokenVal: string) => {
    login(email, tokenVal);
    navigate("/");
  };

  return (
    <section className="auth-page">
      <div className="auth-promo">
        <strong>TEMU</strong>
        <h1>Find your next favorite thing.</h1>
        <p>
          Sign in to save your personal cart, track orders and unlock more
          deals.
        </p>
        <div>
          ✓ Free shipping
          <br />✓ Secure checkout
          <br />✓ Easy returns
        </div>
      </div>
      <div className="content-card form-card">
        <p className="eyebrow">WELCOME TO TEMU</p>
        <h1>{register ? "Create your account" : "Welcome back"}</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validation}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            try {
              if (register) {
                const data = await registerUser({
                  email: values.email,
                  password: values.password,
                });
                complete(data.email, data.token);
              } else {
                const data = await loginUser({
                  email: values.email,
                  password: values.password,
                });
                complete(data.email, data.token);
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
                Email address
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
                Password
                <input
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="At least 8 characters"
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
                {register ? "Create account" : "Login"}
              </button>
            </form>
          )}
        </Formik>
        <p>
          {register ? "Already have an account?" : "New to Temu?"}{" "}
          <Link to={register ? "/login" : "/register"}>
            {register ? "Login" : "Create an account"}
          </Link>
        </p>
      </div>
    </section>
  );
}
