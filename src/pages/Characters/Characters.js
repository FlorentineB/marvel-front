import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../static/constantes";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Characters.css";
import CharacterCard from "../CharacterId/CharacterCard";
import Loading from "../../components/Loading";

const Characters = ({ searchCharacters, setUpdateFavorites, favorites }) => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await axios.get(
        `${BACKEND_URL}/characters?name=${searchCharacters}`
      );
      setCharacters(response.data);
      setIsLoading(false);
    }
    fetchData();
  }, [searchCharacters]);

  if (isLoading) {
    return <Loading />;
  }

  if (characters.length === 0) {
    return "Il n'y a pas de héros correspondant";
  }

  return (
    <div className="presentation">
      {characters.map(({ thumbnail, _id, name, description }, index) => {
        return (
          <Link
            className="character-link"
            key={`characters_${index}`}
            to={`character/${_id}`}
          >
            <CharacterCard
              thumbnail={thumbnail}
              name={name}
              description={description}
              url={"character"}
              _id={_id}
              setUpdateFavorites={setUpdateFavorites}
              favorites={favorites}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default Characters;
