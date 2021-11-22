import { useRouter } from "next/router";
import React from "react";
import Layout from "@components/Layout";
import HeaderBack from "@components/HeaderBack";
import Image from "next/image";
import { getProviders, useSession, signOut } from "next-auth/react";
import Login from "@components/Login";
import styles from "@stylesPages/account.module.css";
import Button from "@components/Button";

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
function Account({ providers }) {
  const { data: session } = useSession();
  if (!session) {
    return <Login providers={providers} />;
  }
  return (
    <Layout header={<HeaderBack />}>
      <section className={styles.account}>
        <div className={styles.account__profile}>
          <div className={styles.image}>
            <Image
              src={session.user.image}
              alt={session.user.name}
              layout="fill"
            />
          </div>
          <span>{session.user.name}</span>
          <div>{session.user.email}</div>
        </div>
        <Button onClick={() => signOut()} padding="5px 15px" margin="0 auto">
          Cerrar sesión
        </Button>
      </section>
    </Layout>
  );
}

export default Account;
