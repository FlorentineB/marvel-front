import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../static/constantes";
import axios from "axios";
import "./Comics.css";
import CharacterCard from "../CharacterId/CharacterCard";
import Loading from "../../components/Loading";

const Comics = ({ searchComics, setUpdateFavorites, favorites }) => {
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await axios.get(
        `${BACKEND_URL}/comics?title=${searchComics}`
      );
      setComics(response.data);
      setIsLoading(false);
    }
    fetchData();
  }, [searchComics]);

  if (isLoading) {
    return <Loading />;
  }

  if (comics.length === 0) {
    return "Il n'y a pas de comics correspondant";
  }

  return (
    <div className="presentation">
      {comics.map(({ thumbnail, _id, title, description }, index) => {
        return (
          <div key={`comics_${_id}`} className="comics-card">
            <CharacterCard
              thumbnail={thumbnail}
              name={title}
              description={description}
              url={"comic"}
              _id={_id}
              setUpdateFavorites={setUpdateFavorites}
              favorites={favorites}
            />
          </div>
        );
      })}
    </div>
  );
};
export default Comics;
