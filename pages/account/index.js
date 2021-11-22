import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Layout from "@components/Layout";
import HeaderBack from "@components/HeaderBack";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import styles from "@stylesPages/account.module.css";
import Button from "@components/Button";
import Spinner from "@components/Spinner";

function Account() {
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (!session) {
      router.push("/account/login");
    }
  }, [session, router]);
  return (
    <Layout header={<HeaderBack />}>
      <section className={styles.account}>
        {!session ? (
          <Spinner />
        ) : (
          <>
            <div className={styles.account__profile}>
              <div className={styles.image}>
                <Image
                  src={session?.user?.image}
                  alt={session?.user?.name}
                  layout="fill"
                />
              </div>
              <span>{session?.user?.name}</span>
              <div>{session?.user?.email}</div>
            </div>
            <Button
              onClick={() => signOut()}
              padding="5px 15px"
              margin="0 auto"
            >
              Cerrar sesión
            </Button>
          </>
        )}
      </section>
    </Layout>
  );
}

export default Account;
