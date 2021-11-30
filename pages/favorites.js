import Layout from "@components/Layout";
import PopularFoodCard from "@components/PopularFoodCard";
import { getFoodCart } from "@firebaseFunctions";
import React, { useContext, useEffect, useState } from "react";
import { KEY_FAVORITES } from "context/utils/types";
import GlobalContext from "context/GlobalContext";

function Favorites() {
  const [loading, setLoading] = useState(false);
  const { favorites } = useContext(GlobalContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    const getCart = async () => {
      const onlyNames = favorites.map(({ name }) => name);
      const food = await getFoodCart(onlyNames);
      const newFood = food.map((newFood, idx) => ({
        ...newFood,
        category: favorites[idx].category,
      }));

      setData(newFood);
      setLoading(false);
    };
    getCart();
  }, [favorites]);
  return (
    <Layout>
      {data.length > 0 ? (
        data?.map(({ price, type, name, image, category }, idx) => (
          <PopularFoodCard
            key={idx}
            price={price}
            name={name}
            type={type}
            image={image}
            category={category}
          />
        ))
      ) : (
        <p style={{ textAlign: "center" }}>Aun no tienes favoritos :c</p>
      )}
    </Layout>
  );
}

export default Favorites;
