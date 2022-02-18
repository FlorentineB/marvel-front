import FavouriteColumn from "../../components/FavouriteColumn";
import "../Favourites/Favourites.css";

const Favourites = ({ favorites, setUpdateFavorites }) => {
  return (
    <div className="favourites-display">
      <FavouriteColumn
        title="Characters"
        favorites={favorites}
        setUpdateFavorites={setUpdateFavorites}
        url="character"
      />
      <FavouriteColumn
        title="Comics"
        favorites={favorites}
        setUpdateFavorites={setUpdateFavorites}
        url="comic"
      />
    </div>
  );
};

export default Favourites;
