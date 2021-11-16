import React from "react";
import Head from "next/head";
import styles from "@styles/Layout.module.css";
import Image from "next/image";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { BsThreeDots, BsBagDashFill } from "react-icons/bs";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { useRouter } from "next/dist/client/router";
import PropTypes from "prop-types";
function Layout({ content, children, location, user, clean }) {
  const { pathname } = useRouter();
  console.log(pathname);
  return (
    <div className={styles.layout}>
      <Head>
        <title>Delivery App</title>
        <meta name="description" content={content} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.layout__header}>
        <span className={styles.layout__headerPhoto}>
          <Image src={user.photo} layout="fill" alt={user.name} />
        </span>
        <span>Chicago, IL</span>
        <FiShoppingCart fontSize={20} cursor="pointer" />
      </header>
      <main className={styles.layout__main}>{children}</main>
      <nav className={styles.layout__nav}>
        <ul>
          {navbar.map((section, id) => (
            <li key={id}>
              <Link href={section.rute} passHref>
                <a className={styles.layout__navSection}>
                  {section.icon}
                  <span>{section.name}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Layout;

const navbar = [
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
