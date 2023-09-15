import React, {useEffect, useState } from "react";

import "./Home.css";

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")
      .then((response) => response.json())
      .then((data) => {
        const orderedList = data.results.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        console.log(data)
        setPokemons(orderedList);
      });
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getImageUrl = (pokemonId) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;


  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div>
        <div className="header">
      <h1>¡ POKEMON FINDER !</h1>
      <input
        type="text"
        className="imputDesign"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Find your Pokemon..."
      />
      </div>
      <div className="homePageDesign">
        {filteredPokemons.map((value) => (
          <div className="pokemonCard" key={value.name}>
            <h3>{value.name}</h3>
            <img
              src={getImageUrl(value.url.split('/').reverse()[1])}
              alt={`Imagen de ${value.name}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
