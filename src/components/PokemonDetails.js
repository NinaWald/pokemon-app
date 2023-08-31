import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../details.css';

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [habitat, setHabitat] = useState(null);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((resp) => resp.json())
      .then((json) => setPokemon(json))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      .then((resp) => resp.json())
      .then((json) => setHabitat(json.habitat.name))
      .catch((error) => console.log(error));
  }, [id]);

  const renderImage = () => {
    const imgUrl = pokemon?.sprites?.other['official-artwork']?.front_default;
    return <img src={imgUrl} alt="pokemon" />;
  };

  const goBack = () => {
    navigate(-1); // Use navigate(-1) to go back to the previous page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pokemon) {
    return <div>Nothing here</div>;
  }

  return (
    <div className="DetailsContainer">
      <div className="Container">
        <h1 className="Title">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
        {renderImage()}
        <div className="TypeContainer">
          <h2>Type: {pokemon.types[0]?.type.name}</h2>
        </div>
        <div className="StrengthsContainer">
          <h1 className="Title">Strengths:</h1>
          <div className="Strengths">
            {pokemon.types.map((type) => (
              <div className="Strength" key={type.type.name}>
                {type.type.name}
              </div>
            ))}
          </div>
        </div>
        <div className="AbilitiesContainer">
          <h1 className="Title">Abilities:</h1>
          <div className="Abilities">
            {pokemon.abilities.map((ability) => (
              <div className="Ability" key={ability.ability.name}>
                {ability.ability.name}
              </div>
            ))}
          </div>
        </div>
        <div className="HabitatContainer">
          <h1 className="Title">Habitat:</h1>
          <div className="Habitats">
            <div className="Habitat">{habitat}</div>
          </div>
        </div>
        <div className="BackButtonContainer">
          <button type="button" className="BackButton" onClick={goBack}> Go Back</button>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetails;

/*

  How to capitalize first letter:
  <Title>{pokemon.name}</Title>

  To capitalize the first letter of the Pokémon name, you can use JavaScript's
   string manipulation functions.
  One common way to capitalize the first letter of a string is to use the charAt
   and toUpperCase functions.

  <Title>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Title>

  In this code, pokemon.name.charAt(0) retrieves the first character of the name,
   .toUpperCase() capitalizes it,
  and pokemon.name.slice(1) gets the rest of the name starting
   from the second character.
  This combination ensures that the first letter is capitalized
   while the rest of the name remains as is.
*/