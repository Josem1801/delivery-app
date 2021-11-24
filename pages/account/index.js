import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "@components/Layout";
import HeaderBack from "@components/HeaderBack";
import Image from "next/image";
import styles from "@stylesPages/account.module.css";
import Button from "@components/Button";
import MaleProfile from "../../public/male.svg";
import FemaleProfile from "../../public/female.svg";
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import { auth } from "../../firebase";
import Spinner from "@components/Spinner";
export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(() => {
  return { props: {} };
});

function Account() {
  const authUser = useAuthUser();
  const [female, setFemale] = useState();
  function handleGener() {
    setFemale(!female);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("gender", female);
    }
  }
  useEffect(() => {
    console.log(window.localStorage.getItem("gender") || false);
  }, []);
  return (
    <Layout header={<HeaderBack />}>
      <section className={styles.account}>
        <div className={styles.account__profile}>
          <div className={styles.image}>
            {authUser.photoURL ? (
              <Image
                src={authUser?.photoURL}
                alt={authUser?.displayName}
                layout="fill"
              />
            ) : (
              <Image
                onClick={handleGener}
                src={female ? FemaleProfile : MaleProfile}
                alt={authUser?.displayName}
                layout="fill"
              />
            )}
          </div>
          <span>{authUser?.displayName}</span>
          <div>{authUser?.email}</div>
        </div>
        <Button
          onClick={() => auth.signOut()}
          padding="5px 15px"
          margin="0 auto"
        >
          Cerrar sesión
        </Button>
      </section>
    </Layout>
  );
}

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenAuthed: AuthAction.SHOW_LOADER,
  LoaderComponent: Spinner,
})(Account);
