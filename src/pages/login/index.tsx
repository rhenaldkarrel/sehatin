import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import SignInForm from "components/SignIn";
import useAuth from "hooks/useAuth";

function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          const { accessToken } = data;
          const { id, name, email, role } = data.user;
          setAuth({accessToken, id, name, email, role});
          localStorage.setItem('user', JSON.stringify({accessToken, id, name, email, role}));
          navigate('/', { replace: true });
        })
        .catch(() => alert('Login gagal, mohon periksa kembali email dan kata sandi Anda!'));
    }
  });

  return (
    <SignInForm
      onChange={formik.handleChange}
      emailValue={formik.values.email}
      passwordValue={formik.values.password}
      onSubmit={formik.handleSubmit}
    />
  );
}

export default Login;
