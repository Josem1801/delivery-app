import FoodCategory from "@components/FoodCategory";
import Layout from "@components/Layout";
import Photo from "../public/photo.jpg";
import Hamburger from "../public/hamburger.svg";
import Pizza from "../public/pizza.svg";
import Cakes from "../public/cakes.svg";
import Input from "@components/Input";
import PopularFood from "@components/PopularFood";
import { AiOutlineSearch } from "react-icons/ai";
import { useSession } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout user={{ photo: session?.user.image, name: session?.user.name }}>
      <h1>Hey!</h1>
      <span style={{ color: "gray", fontWeight: 400, fontSize: 14 }}>
        Lets get your order
      </span>
      <Input
        icon={<AiOutlineSearch fontSize={18} />}
        placeholder="Search our delicius brugers"
      />
      <FoodCategory data={categoryFood} />
      <PopularFood foodName="burgers" />
    </Layout>
  );
}

const categoryFood = [
  {
    image: Hamburger,
    name: "Burgers",
  },
  {
    image: Pizza,
    name: "Pizza",
  },
  {
    image: Cakes,
    name: "Cakes",
  },
  {
    image: Hamburger,
    name: "Burgers",
  },
  {
    image: Pizza,
    name: "Pizza",
  },
  {
    image: Cakes,
    name: "Cakes",
  },
];
