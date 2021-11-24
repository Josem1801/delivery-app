import Head from "next/head";
import styles from "@stylesComponents/Layout.module.css";
import Image from "next/image";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { BsThreeDots, BsBagDashFill } from "react-icons/bs";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { useRouter } from "next/dist/client/router";
import { useAuthUser } from "next-firebase-auth";
import { AiOutlineUser } from "react-icons/ai";
import { memo, useEffect, useState } from "react";
import MaleProfile from "../public/male.svg";
import FemaleProfile from "../public/female.svg";
function Layout({
  content,
  children,
  location,
  className,
  header = true,
  navbar = true,
}) {
  const { pathname } = useRouter();
  const authUser = useAuthUser();
  const [female, setFemale] = useState();

  useEffect(() => {
    window.localStorage.getItem("gender") || false;
  }, []);

  return (
    <div className={styles.layout}>
      <Head>
        <title>Food delivery</title>
        <meta name="description" content={content} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {header ? (
        <header className={styles.layout__header}>
          <span className={styles.layout__headerPhoto}>
            {authUser.id ? (
              authUser.photoURL ? (
                <Image
                  src={authUser.photoURL}
                  layout="fill"
                  alt={authUser.displayName}
                />
              ) : (
                <Image
                  src={female ? FemaleProfile : MaleProfile}
                  alt={authUser?.displayName}
                  layout="fill"
                />
              )
            ) : (
              <AiOutlineUser fontSize={25} />
            )}
          </span>
          <span>Chicago, IL</span>
          <FiShoppingCart fontSize={20} cursor="pointer" />
        </header>
      ) : (
        header
      )}
      <main className={`${styles.layout__main} ${className}`}>{children}</main>
      {navbar && (
        <nav className={styles.layout__nav}>
          <ul>
            {navbarData.map((section, id) => (
              <li key={id}>
                <Link href={section.rute} passHref>
                  <a
                    className={`
                    ${styles.layout__navSection} 
                    ${
                      pathname === section.rute &&
                      styles.layout__navSectionSelected
                    }
                    `}
                  >
                    {section.icon}
                    <span>{section.name}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

export default memo(Layout);

const navbarData = [
  {
    name: "Home",
    icon: <MdDashboard />,
    rute: "/",
  },
  {
    name: "Favorites",
    icon: <FiHeart />,
    rute: "/favorites",
  },
  {
    name: "Account",
    icon: <FaRegUser />,
    rute: "/account",
  },
  {
    name: "More",
    icon: <BsThreeDots />,
    rute: "/more",
  },
];
