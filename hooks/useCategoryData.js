import { collection, getDocs, limit } from "@firebase/firestore";
import React, { useEffect } from "react";

function useCategoryData(limite) {
  const [data, setData] = useState();
  const [lastData, setLastData] = useState();
  useEffect(() => {
    async function getData() {
      const foodCol = query(
        collection(db, `categorys/${category}/products`),
        limit(limite)
      );
      const foodDocs = await getDocs(foodCol);
      const foodCategory = foodDocs.docs.map((category) => category.data());

      const lastVisible = foodDocs.docs[foodDocs.docs.length - 1];
      setLastData(lastVisible);
      return { data: foodCategory, lastVisible };
    }
  }, [limite]);
}

export default useCategoryData;
