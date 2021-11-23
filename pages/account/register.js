import Layout from "@components/Layout";
import React from "react";
import Input from "@components/Input";
import Button from "@components/Button";
import { FiUser } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import Link from "next/link";
import styles from "@stylesPages/Register.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
function Register() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    router.push("/account");
  }
  return (
    <Layout>
      <section className={styles.register}>
        <form>
          <h1>Registrate</h1>
          <div className={styles.name}>
            <Input icon={<FiUser fontSize={18} />} placeholder="Nombre" />
            <Input icon={<FiUser fontSize={18} />} placeholder="Apellidos" />
          </div>
          <Input
            icon={<FiUser fontSize={18} />}
            placeholder="Email"
            width="75%"
            center
          />
          <Input
            icon={<RiLockPasswordLine fontSize={18} />}
            type="password"
            placeholder="Password"
            width="75%"
            center
          />
          <Input
            icon={<RiLockPasswordLine fontSize={18} />}
            type="password"
            placeholder="Repeat password"
            width="75%"
            center
          />
          <div className={styles.text}>
            <span>¿Ya tienes una cuenta? </span>
            <Link href="/account/login">
              <a style={{ color: "#C8161D" }}>Inicia sessión</a>
            </Link>
          </div>
          <Button padding="0 40px" margin="20px auto">
            Entrar
          </Button>
        </form>
      </section>
    </Layout>
  );
}

export default Register;
