import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../static/constantes";
import CharacterCard from "./CharacterCard";
import "./CharacterId.css";

const CharacterId = () => {
  const [character, setCharacter] = useState({});
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { _id } = useParams();
  console.log("params", _id);

  useEffect(() => {
    if (character !== {} && comics !== {}) {
      setIsLoading(false);
    }
  }, [character, comics]);

  useEffect(() => {
    async function fetchData() {
      const characterRequest = await axios.get(
        `${BACKEND_URL}/character/${_id}`
      );
      setCharacter(characterRequest.data);
    }
    fetchData();
  }, [_id, setCharacter]);

  const { thumbnail, name, description } = character;

  useEffect(() => {
    async function fetchData() {
      const comicsRequest = await axios.get(`${BACKEND_URL}/comics/${_id}`);
      setComics(comicsRequest.data);
    }
    fetchData();
  }, [_id, setComics]);

  return isLoading ? (
    <div className="loading">En cours de chargement...</div>
  ) : (
    <div className="character-presentation">
      <div className="character-card-id">
        <CharacterCard
          thumbnail={thumbnail}
          name={name}
          description={description}
        />
      </div>
      <div className="comics-display">
        {comics.map(({ thumbnail, title }, index) => {
          return (
            <div className="comic-presentation" key={index}>
              <img
                className="comic-picture"
                src={`${thumbnail?.path || ""}.${thumbnail?.extension || ""}`}
                alt="comics_picture"
              />
              <div className="comic-text">{title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterId;
