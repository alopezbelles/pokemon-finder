import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

import "./Home.css";

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemonExperiences, setPokemonExperiences] = useState({});

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=300&offset=0")
      .then((response) => response.json())
      .then((data) => {
        const orderedList = data.results.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
        // console.log(data);
        setPokemons(orderedList);
      });
  }, []);

  // Function to get values from input
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to get url image
  const getImageUrl = (pokemonId) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  //Function2 to get base_experience.
  function getExperience(name) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error");
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        return data.base_experience;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }

  useEffect(() => {
    const experiences = {};
    pokemons.forEach((pokemon) => {
      getExperience(pokemon.name).then((experience) => {
        experiences[pokemon.name] = experience;
        setPokemonExperiences({ ...experiences });
      });
    });
  }, [pokemons]);

  return (
    <Container>
      <Row className="header">
        <h1>¡ POKEMON FINDER !</h1>
        <input
          type="text"
          className="imputDesign"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Find your Pokemon..."
        />
      </Row>
      <Row className="homePageDesign">
        {pokemons
          .filter((pokemon) =>
            pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
          )
          .map((value) => {
            const pokemonId = value.url.split("/").reverse()[1];
            const imageUrl = getImageUrl(pokemonId);
            const experience = pokemonExperiences[value.name];
            return (
              <div className="pokemonCard" key={value.name}>
                <h3>
                  {value.name.charAt(0).toUpperCase() + value.name.slice(1)}
                </h3>
                <img src={imageUrl} alt={`Imagen de ${value.name}`} />
                <h5>Exp:{experience}</h5>
              </div>
            );
          })}
      </Row>
    </Container>
  );
}

export default Home;
