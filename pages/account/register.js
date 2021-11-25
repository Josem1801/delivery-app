import Layout from "@components/Layout";
import React, { useState } from "react";
import Input from "@components/Input";
import Button from "@components/Button";
import { FiUser } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import * as Yup from "yup";
import Link from "next/link";
import {
  withAuthUserTokenSSR,
  AuthAction,
  withAuthUser,
} from "next-firebase-auth";
import styles from "@stylesPages/Register.module.css";
import { useFormik } from "formik";
import { createUser } from "../../firebase";
import Spinner from "@components/Spinner";

export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(() => {
  return { props: {} };
});

function Register() {
  const [emailAlreadyUsed, setEmailAlreadyUsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { handleSubmit, getFieldProps, touched, errors } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeatPassword: "",
    },

    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("Nombre es requerido")
        .min(2, "Nombre demasiado corto"),
      lastName: Yup.string().min(2, "apellido demasiado corto"),
      email: Yup.string()
        .required("Email es requerido")
        .email("Email invalido"),
      password: Yup.string()
        .required("Password es requido")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&.]{8,}$/,
          "Contraseña debil - (8 caracteres o más)"
        ),
      repeatPassword: Yup.string()
        .required("Repetir contraseña es requerido")
        .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden"),
    }),
    onSubmit: ({ email, password, lastName, firstName }) => {
      setLoading(true);
      createUser(email, password, firstName, lastName).then((data) => {
        if (data.code === "auth/email-already-in-use")
          setEmailAlreadyUsed(true);
        setLoading(false);
        setTimeout(() => {
          setEmailAlreadyUsed(false);
        }, 5000);
      });
    },
  });

  return (
    <Layout>
      <section className={styles.register}>
        <form onSubmit={handleSubmit}>
          <h1>Registrate</h1>
          <div className={styles.name}>
            <Input
              icon={<FiUser fontSize={18} />}
              placeholder="Nombre"
              id="firstName"
              error={errors.firstName && touched.firstName}
              errorMessage={errors.firstName}
              {...getFieldProps("firstName")}
            />
            <Input
              icon={<FiUser fontSize={18} />}
              placeholder="Apellidos"
              id="lastName"
              error={errors.lastName && touched.lastName}
              errorMessage={errors.lastName}
              {...getFieldProps("lastName")}
            />
          </div>
          <Input
            icon={<FiUser fontSize={18} />}
            placeholder="Email"
            id="email"
            error={(errors.email && touched.email) || emailAlreadyUsed}
            errorMessage={
              emailAlreadyUsed
                ? "Este email ya tiene una cuenta existente. Inicia sesión"
                : errors.email
            }
            {...getFieldProps("email")}
          />

          <Input
            icon={<RiLockPasswordLine fontSize={18} />}
            type="password"
            id="password"
            placeholder="Password"
            error={errors.password && touched.password}
            errorMessage={errors.password}
            {...getFieldProps("password")}
          />

          <Input
            icon={<RiLockPasswordLine fontSize={18} />}
            type="password"
            id="repeatPassword"
            placeholder="Repeat password"
            error={errors.repeatPassword && touched.repeatPassword}
            errorMessage={errors.repeatPassword}
            {...getFieldProps("repeatPassword")}
          />
          <div className={styles.text}>
            <span>¿Ya tienes una cuenta? </span>
            <Link href="/account/login">
              <a style={{ color: "#C8161D" }}>Inicia sessión</a>
            </Link>
          </div>
          <Button padding="7px 40px" margin="20px auto">
            {loading ? (
              <Spinner
                size="small"
                strokeWidth={3}
                color="white"
                margin="0px"
              />
            ) : (
              "Entrar"
            )}
          </Button>
        </form>
      </section>
    </Layout>
  );
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(Register);
