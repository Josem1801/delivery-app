import HeaderBack from "@components/HeaderBack";
import Layout from "@components/Layout";
import Input from "@components/Input";
import { FiUser } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import Link from "next/link";
import Button from "@components/Button";
import { FcGoogle } from "react-icons/fc";
import styles from "@stylesComponents/Login.module.css";
import { signIn, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/router";
export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
function Login({ providers }) {
  console.log(providers);
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    router.push("/account");
  }
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
        <Button padding="2px 80px" margin="10px auto">
          Entrar
        </Button>
        <div style={{ display: "flex", alignItems: "center" }}>
          <hr style={{ width: "45%", height: 1 }} />o{" "}
          <hr style={{ width: "45%", height: 1 }} />
        </div>
        <Button
          background="transparent"
          color="black"
          padding="4px 10px"
          margin="10px auto"
          borderColor="black"
          onClick={() => signIn(providers.google.id)}
        >
          <FcGoogle /> &nbsp; Inicia sesión con Google
        </Button>
      </section>
    </Layout>
  );
}

export default Login;
