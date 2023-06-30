import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PokemonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  background-color: #ccffe2;
  padding: 8px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  background-color: #ccffe2;
  padding: 8px;
  width: 500px;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  justify-content: center;
  text-align: center;
`;

const Item = styled.div`
  padding: 10px;
  background-color: white;
  border-radius: 20px;
  width: 400px;
  margin: 10px;
`;

const PokemonList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const PokemonListItem = styled.li`
  margin-bottom: 10px;
`;

const SearchInput = styled.input`
  height: 40px;
  width: 400px;
  border-color: gray;
  border-width: 1px;
  border-radius: 10px;
`;

const PokemonStart = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
      .then((resp) => resp.json())
      .then((json) => setPokemon((prevPokemon) => [...prevPokemon, ...json.results]))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [offset]);

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + 20);
  };

  const listItem = ({ item }) => (
    <PokemonListItem key={item.name}>
      <Item>
        <Link to={`/pokemon/${item.name}`}>
          <Title>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Title>
          <p>{item.description}</p>
        </Link>
      </Item>
    </PokemonListItem>
  );

  const filteredPokemon = pokemon.filter((p) => p.name.includes(searchText.toLowerCase()));

  return (
    <PokemonContainer>
      <SearchInput
        placeholder="Search Pokemon"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)} />
      <Container>
        {loading && offset === 0 ? (
          <div>Loading...</div>
        ) : (
          <PokemonList>
            {filteredPokemon.map((item) => (
              <PokemonListItem key={item.name}>{listItem({ item })}</PokemonListItem>
            ))}
          </PokemonList>
        )}
        {!loading && offset > 0 && filteredPokemon.length > 0 && (
          <button type="button" onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </Container>
    </PokemonContainer>
  );
};

export default PokemonStart;

