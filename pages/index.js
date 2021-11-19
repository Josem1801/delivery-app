import FoodCategory from "@components/FoodCategory";
import Layout from "@components/Layout";
import Photo from "../public/photo.jpg";
import Hamburger from "../public/hamburger.svg";
import Pizza from "../public/pizza.svg";
import Cakes from "../public/cakes.svg";
import Input from "@components/Input";
import PopularFood from "@components/PopularFood";
import { AiOutlineSearch } from "react-icons/ai";

export default function Home() {
  return (
    <Layout user={{ photo: Photo, name: "Jose Manuel Rosales" }}>
      <h1>Hey!</h1>
      <span style={{ color: "gray", fontWeight: 400, fontSize: 14 }}>
        Lets get your order
      </span>
      <Input
        icon={<AiOutlineSearch fontSize={18} />}
        placeholder="Search our delicius brugers"
      />
      <FoodCategory data={categoryFood} />
      <PopularFood />
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
