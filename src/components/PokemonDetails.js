import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  display: flex;
  width: auto;
  height: 500px;
  flex-direction: column;
  align-items: center;
  background-color: lightblue;
  padding: 8px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const Image = styled.img`
  width: 350px;
  height: auto;
  aspect-ratio: 1;
  object-fit: contain;
  margin-bottom: 12px;
  margin-top: 10px;
`;

const TypeContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  margin: 20px;
`;

const BackButton = styled.button`

  background-color: #ff69b4;
  border-radius: 50px;
  padding: 20px;
  margin-top: 20px;
  margin-left: 150px;
  border: none;
  width: 100px;
  cursor: pointer;
`;

const Type = styled.span`
  flex: 1;
  font-size: 18px;
  font-weight: bold;
`;

const StrengthsContainer = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  margin-top: 16px;
  width: 200px;
`;

const Strengths = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Strength = styled.span`
  background-color: pink;
  padding: 8px;
  border-radius: 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  color: white;
`;

const AbilitiesContainer = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  margin-top: 16px;
  width: 200px;
`;

const Abilities = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Ability = styled.span`
  background-color: purple;
  padding: 8px;
  border-radius: 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  color: white;
`;

const HabitatContainer = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  margin-top: 16px;
  width: 200px;
`;

const Habitats = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Habitat = styled.span`
  background-color: green;
  padding: 8px;
  border-radius: 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  color: white;
`;

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
    // eslint-disable-next-line
    const imgUrl = pokemon?.sprites?.other['official-artwork']?.front_default;
    return <Image src={imgUrl} alt="image" />;
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
    <DetailsContainer>
      <Container>
        <Title>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Title>
        {renderImage()}
        <TypeContainer>
          <Type>Type: {pokemon.types[0]?.type.name}</Type>
        </TypeContainer>
        <StrengthsContainer>
          <Title>Strengths:</Title>
          <Strengths>
            {pokemon.types.map((type) => (
              <Strength key={type.type.name}>{type.type.name}</Strength>
            ))}
          </Strengths>
        </StrengthsContainer>
        <AbilitiesContainer>
          <Title>Abilities:</Title>
          <Abilities>
            {pokemon.abilities.map((ability) => (
              <Ability key={ability.ability.name}>{ability.ability.name}</Ability>
            ))}
          </Abilities>
        </AbilitiesContainer>
        <HabitatContainer>
          <Title>Habitat:</Title>
          <Habitats>
            <Habitat>{habitat}</Habitat>
          </Habitats>
        </HabitatContainer>
        <BackButton onClick={goBack}>Go Back</BackButton>
      </Container>
    </DetailsContainer>
  );
};

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