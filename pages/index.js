import FoodCategory from "@components/FoodCategory";
import Layout from "@components/Layout";
import Hamburger from "../public/hamburger.svg";
import Pizza from "../public/pizza.png";
import Cakes from "../public/cakes.svg";
import Input from "@components/Input";
import Papas from "../public/papas.svg";
import PopularFood from "@components/PopularFood";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState, memo, useRef } from "react";
import { getCategoryFood } from "@firebaseFunctions";
import { withAuthUser } from "next-firebase-auth";
import useLazyFood from "hooks/useLazyFood";
import styles from "@stylesPages/Home.module.css";
function Home() {
  const [selectedCategory, setSelectedCategory] = useState("burgers");
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const elementRef = useRef();
  const { show } = useLazyFood(elementRef.current);
  function handleCategory(category) {
    setSelectedCategory(category.toLowerCase());
  }

  useEffect(() => {
    setLoading(true);
    getCategoryFood(selectedCategory, 3)
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
      <span className={styles.subtitle}>Lets get your order</span>
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
      <div className={styles.observer} ref={elementRef}>
        {" "}
      </div>
    </Layout>
  );
}

export default withAuthUser()(memo(Home));
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
