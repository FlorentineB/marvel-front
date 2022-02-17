const CharacterCard = ({ thumbnail, name, description }) => {
  return (
    <div className="character-card-wrapper">
      <div className="character-card-background"></div>
      <div className="character-card">
        <div className="character-img-wrapper">
          <img
            className="character-img"
            src={`${thumbnail?.path || ""}.${thumbnail?.extension || ""}`}
            alt="character_picture"
          />
        </div>
        <h2 className="character-name">{name}</h2>
        <p className="character-description">{description}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
