import FoodCategory from "@components/FoodCategory";
import Layout from "@components/Layout";
import Hamburger from "../public/hamburger.svg";
import Pizza from "../public/pizza.png";
import Cakes from "../public/cakes.svg";
import Input from "@components/Input";
import Papas from "../public/papas.svg";
import PopularFood from "@components/PopularFood";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";
import { db, getCategoryFood } from "../firebase";
import { withAuthUser } from "next-firebase-auth";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("burgers");
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  function handleCategory(category) {
    setSelectedCategory(category.toLowerCase());
  }
  useEffect(() => {
    setLoading(true);
    getCategoryFood(db, selectedCategory)
      .then((data) => {
        setCategoryData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [selectedCategory]);
  return (
    <Layout>
      <h1>Hey!</h1>
      <span style={{ color: "gray", fontWeight: 400, fontSize: 14 }}>
        Lets get your order
      </span>
      <Input
        icon={<AiOutlineSearch fontSize={18} />}
        placeholder="Search our delicius brugers"
      />
      <FoodCategory
        data={categoryFood}
        handleCategory={handleCategory}
        currentCategory={selectedCategory}
      />
      <PopularFood
        foodName="burgers"
        foodData={categoryData}
        category={selectedCategory}
        loading={loading}
      />
    </Layout>
  );
}

export default withAuthUser()(Home);
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
    image: Papas,
    name: "Chips",
  },
];
