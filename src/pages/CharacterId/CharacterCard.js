import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from "axios";
import { BACKEND_URL } from "../../static/constantes";
import Cookies from "js-cookie";

const CharacterCard = ({
  thumbnail,
  name,
  description,
  url,
  _id,
  setUpdateFavorites,
  favorites,
}) => {
  const token = Cookies.get("token") || null;

  const handleClick = (operation) => () => {
    async function createFavorite() {
      const response = await axios.post(
        `${BACKEND_URL}/favourite/${url}`,
        { _id, name, description, thumbnail },
        { headers: { authorization: "Bearer " + token } }
      );

      console.log(response.status);
      setUpdateFavorites(true);
    }

    async function deleteFavorite() {
      console.log("ere");
      const response = await axios.delete(
        `${BACKEND_URL}/favourite/${url}/delete`,
        {
          headers: { authorization: "Bearer " + token },
          data: { apiid: _id },
        }
      );
      console.log(response.status);
      setUpdateFavorites(true);
    }

    if (operation === "create") {
      createFavorite();
    }
    if (operation === "delete") {
      deleteFavorite();
    }
  };

  const favoriteHeart = () => {
    const fav = favorites ? favorites[url] : [];

    const isFavorites = !fav.reduce(
      (previousValue, currentValue) =>
        previousValue && _id !== currentValue.apiid,
      true
    );
    return (
      <>
        {isFavorites ? (
          <AiFillHeart
            onClick={() => handleClick("delete")()}
            className="character-img-favourite"
          />
        ) : (
          <AiOutlineHeart
            onClick={() => handleClick("create")()}
            className="character-img-favourite"
          />
        )}
      </>
    );
  };

  return (
    <div className="character-card-wrapper">
      <div className="character-card-background"></div>
      <div className="character-card">
        <div className="character-img-wrapper">
          {" "}
          <img
            className="character-img"
            src={`${thumbnail?.path || ""}.${thumbnail?.extension || ""}`}
            alt="character_picture"
          />
          {token && favoriteHeart()}
        </div>
        <h2 className="character-name">{name}</h2>
        <p className="character-description">{description}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
