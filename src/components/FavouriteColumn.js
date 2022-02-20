import CharacterCard from "../pages/CharacterId/CharacterCard";
import "../pages/Favourites/Favourites.css";

const FavouriteColumn = ({ title, favorites, setUpdateFavorites, url }) => {
  return (
    <div className="favourite-column">
      <h1 className="favourite-title">{title}</h1>

      {favorites[url].map(({ thumbnail, apiid, name, description }, index) => {
        return (
          <div key={url} className="favorites-card">
            <CharacterCard
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
