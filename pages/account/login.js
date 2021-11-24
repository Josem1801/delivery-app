import HeaderBack from "@components/HeaderBack";
import Layout from "@components/Layout";
import Input from "@components/Input";
import { FiUser } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import Link from "next/link";
import Button from "@components/Button";
import { FcGoogle } from "react-icons/fc";
import styles from "@stylesComponents/Login.module.css";
import {
  withAuthUserTokenSSR,
  AuthAction,
  withAuthUser,
} from "next-firebase-auth";
import {
  loginWithEmailAndPassword,
  auth,
  loginWithGoogle,
} from "../../firebase";
import Spinner from "@components/Spinner";
export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(() => {
  return { props: {} };
});

function Login() {
  const handleLoginWithEmailAndPassword = () => {
    loginWithEmailAndPassword(auth, "josem@gmail.com", "JoseRg");
  };
  const handleLoginWithGoogle = async () => {
    await loginWithGoogle();
  };

  return (
    <Layout header={<HeaderBack />}>
      <section className={styles.login}>
        <h1 style={{ textAlign: "center" }}>Inicia Sesion</h1>

        <Input
          icon={<FiUser fontSize={18} />}
          placeholder="Correo electrónico"
          width="70%"
          center
        />
        <Input
          icon={<RiLockPasswordLine fontSize={18} />}
          placeholder="Contraseña"
          width="70%"
          center
        />
        <p style={{ margin: "0 auto", width: "70%", fontSize: 12 }}>
          ¿No tienes una cuenta?{" "}
          <Link href="/account/register">
            <a style={{ color: "#C8161D" }}>Registrate</a>
          </Link>
        </p>
        <Button
          padding="7px 80px"
          margin="10px auto"
          onClick={handleLoginWithEmailAndPassword}
        >
          Entrar
        </Button>
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
