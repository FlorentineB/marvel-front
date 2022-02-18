import CharacterCard from "../pages/CharacterId/CharacterCard";
import "../pages/Favourites/Favourites.css";

const FavouriteColumn = ({ title, favorites, setUpdateFavorites, url }) => {
  // Titre
  // On fait un map pour les CharacterCard, avec comme variable descendue si c'est comics ou characters

  return (
    <div className="favourite-column">
      <h1 className="favourite-title">{title}</h1>
      {favorites[url].map(
        ({ thumbnail, _id, name, description, favorites }, index) => {
          return (
            <div className="favorites-card">
              <CharacterCard
                thumbnail={thumbnail}
                name={name}
                description={description}
                url={url}
                _id={_id}
                setUpdateFavorites={setUpdateFavorites}
                favorites={favorites}
              />
            </div>
          );
        }
      )}
    </div>
  );
};

export default FavouriteColumn;
