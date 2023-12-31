import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PokemonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ccffe2;
  padding: 8px;
  max-width: 400px;
  margin: 0 auto;
  text-align: center; 
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  background-color: #ccffe2;
  padding: 8px;

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
  width: 300px;
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
  display: flex;
  align-items: center;
  width: 320px;
  border-color: gray;
  border-width: 1px;
  border-radius: 10px;
`;

const SearchContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #ccffe2;
  padding: 8px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
const LoadMoreContainer = styled.div`
  text-align: center;
  padding: 20px;
  margin-bottom: 50px;
`
const LoadMoreButton = styled.button`
  background-color: pink;
  color: black;
  border: solid 1px;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const PokemonStart = () => {
  const [pokemon, setPokemon] = useState([]);
  const [, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(false);

  const handleLoadMoreClick = () => {
    // Increment the offset to load the next set of 20 Pokémon
    setOffset((prevOffset) => prevOffset + 20);
  };

  useEffect(() => {
    setLoading(true);
    try {
      fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
        .then((resp) => resp.json())
        .then((json) => {
          setPokemon((prevPokemon) => [...prevPokemon, ...json.results]);
          // setOffset((prevOffset) => prevOffset + 20);
          setLoading(false);
          setShowLoadMoreButton(true);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } catch (error) {
      console.log('Error fetching data:', error);
      setLoading(false);
    }
  }, [offset]);

  const filteredPokemon = pokemon.filter((p) => p.name.includes(searchText.toLowerCase()));

  return (
    <PokemonContainer>
      <SearchContainer>
        <SearchInput
          placeholder="Search Pokemon"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)} />
      </SearchContainer>
      <Container>
        <PokemonList>
          {filteredPokemon.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <PokemonListItem key={`${item.name}-${item.id}`}>
              <Item>
                <StyledLink to={`/pokemon/${item.id}/${item.name}`}>
                  <Title>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Title>
                </StyledLink>
              </Item>
              {/* Add a line break after every 20th item */}
              {index % 20 === 19 && <hr />}
            </PokemonListItem>
          ))}
        </PokemonList>
      </Container>
      {/* Render the "Load More Pokemons" button */}
      {showLoadMoreButton && (
        <LoadMoreContainer>
          <LoadMoreButton type="button" onClick={handleLoadMoreClick}>
            Load More Pokemons!
          </LoadMoreButton>
        </LoadMoreContainer>
      )}
    </PokemonContainer>
  );
}
export default PokemonStart;