import React from "react";

const PokemonCard = ({ name, imageUrl, experience }) => {
  return (
    <div className="pokemonCard">
      <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      <img src={imageUrl} alt={`Imagen de ${name}`} />
      <h5>Exp:{experience}</h5>
    </div>
  );
};

export default PokemonCard;
