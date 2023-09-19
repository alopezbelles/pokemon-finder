import React, { useEffect, useState } from "react";

//STYLES AND BOOTSTRAP:
import "./Home.css";
import { Container, Row } from "react-bootstrap";

//COMPONENTS:
import PokemonCard from "../../Components/PokemonCard/PokemonCard";

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemonExperiences, setPokemonExperiences] = useState({});

  //FUNCTION TO GET POKEMONS IN ALPHABETICAL ORDER
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=300&offset=0")
      .then((response) => response.json())
      .then((data) => {
        //I order the results alphabetically
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

  // FUNCTION TO GET VALUES FROM IMPUT. UPDATE SEARCHTERM.
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // FUNCTION TO GET URL IMAGE.
  const getImageUrl = (pokemonId) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  //FUNCTION TO GET BASE EXPERIENCE.
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

  //UPDATE POKEMON EXPERIENCES.
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
          //First, I filter the pokemon by search criteria
          .filter((pokemon) =>
            pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
          )
          .map((value) => {
            //Then, I map the results
            const pokemonId = value.url.split("/").reverse()[1];
            const imageUrl = getImageUrl(pokemonId);
            const experience = pokemonExperiences[value.name];
            return (
              <PokemonCard
                key={value.name}
                name={value.name}
                imageUrl={imageUrl}
                experience={experience}
              />
            );
          })}
      </Row>
    </Container>
  );
}

export default Home;
