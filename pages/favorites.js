import Layout from "@components/Layout";
import PopularFoodCard from "@components/PopularFoodCard";
import { getFoodCart, getUserData } from "@firebaseFunctions";
import { AuthAction, useAuthUser, withAuthUserSSR } from "next-firebase-auth";
export const getServerSideProps = withAuthUserSSR({
  whenAuthed: AuthAction.RENDER,
})(async (user) => {
  const userData = await getUserData(user.AuthUser.email);
  if (!userData) {
    return {
      props: {
        fav: [],
      },
    };
  }
  const fav = await getFoodCart(userData.favorites);

  return {
    props: {
      fav,
    },
  };
});
function Favorites({ fav }) {
  const authUser = useAuthUser();
  if (!authUser.id) {
    return (
      <Layout>
        <div>Inicia sesion para agregar cosas a favoritos</div>
      </Layout>
    );
  }
  return (
    <Layout>
      {fav.length > 0 ? (
        fav?.map(({ price, type, name, image, category }, idx) => (
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
