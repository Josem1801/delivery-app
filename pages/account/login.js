import HeaderBack from "@components/HeaderBack";
import Layout from "@components/Layout";
import Input from "@components/Input";
import { FiUser } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import Link from "next/link";
import Button from "@components/Button";
import { FcGoogle } from "react-icons/fc";
import styles from "@stylesComponents/Login.module.css";
import * as Yup from "yup";
import {
  withAuthUserTokenSSR,
  AuthAction,
  withAuthUser,
} from "next-firebase-auth";
import { loginWithEmailAndPassword, loginWithGoogle } from "@firebaseFunctions";

import { useState } from "react";
import Spinner from "@components/Spinner";
import { useFormik } from "formik";
export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(() => {
  return { props: {} };
});
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { getFieldProps, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("El email es requerido")
        .email("Email invalido"),
      password: Yup.string().required("La contraseña es requerida"),
    }),

    onSubmit: ({ email, password }) => {
      setLoading(true);
      loginWithEmailAndPassword(email, password)
        .then((data) => {
          if (data.code === "auth/invalid-email" || "auth/wrong-password") {
            setErrorMessage("Correo y/o contraseña invalidos");
            setLoading(false);
            setTimeout(() => {
              setErrorMessage(false);
            }, 5000);
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          throw err;
        });
    },
  });

  const handleLoginWithGoogle = async () => {
    await loginWithGoogle();
  };

  return (
    <Layout header={<HeaderBack />}>
      <section className={styles.login}>
        <h1>Inicia Sesion</h1>

        <form onSubmit={handleSubmit}>
          <Input
            icon={<FiUser fontSize={18} />}
            placeholder="Correo electrónico"
            width="70%"
            {...getFieldProps("email")}
            error={errorMessage || (errors.email && touched.email)}
            errorMessage={errors.email}
            center
          />
          <Input
            icon={<RiLockPasswordLine fontSize={18} />}
            placeholder="Contraseña"
            type="password"
            width="70%"
            {...getFieldProps("password")}
            error={errorMessage}
            errorMessage={errorMessage}
            center
          />
          <p style={{ margin: "0 auto", width: "70%", fontSize: 12 }}>
            ¿No tienes una cuenta?{" "}
            <Link href="/account/register">
              <a style={{ color: "#C8161D" }}>Registrate</a>
            </Link>
          </p>
          <Button
            disabled={loading}
            width="200px"
            margin="10px auto"
            height="28px"
          >
            {loading ? (
              <Spinner
                size="small"
                color="white"
                margin="0px"
                strokeWidth={2}
              />
            ) : (
              "Entrar"
            )}
          </Button>
        </form>
        <div style={{ display: "flex", alignItems: "center" }}>
          <hr style={{ width: "45%", height: 1 }} />o{" "}
          <hr style={{ width: "45%", height: 1 }} />
        </div>
        <Button
          background="transparent"
          color="black"
          padding="7px 10px"
          margin="10px auto"
          borderColor="black"
          onClick={handleLoginWithGoogle}
        >
          <FcGoogle /> &nbsp; Inicia sesión con Google
        </Button>
      </section>
    </Layout>
  );
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(Login);
