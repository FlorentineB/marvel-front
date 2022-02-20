import CharacterCard from "../pages/CharacterId/CharacterCard";
import "../pages/Favourites/Favourites.css";

const FavouriteColumn = ({ title, favorites, setUpdateFavorites, url }) => {
  return (
    <div className="favourite-column">
      <h1 className="favourite-title">{title}</h1>

      {favorites[url].map(({ thumbnail, apiid, name, description }, index) => {
        return (
          <div className="favorites-card">
            <CharacterCard
              key={url}
              thumbnail={thumbnail}
              name={name}
              description={description}
              url={url}
              _id={apiid}
              setUpdateFavorites={setUpdateFavorites}
              favorites={favorites}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FavouriteColumn;
