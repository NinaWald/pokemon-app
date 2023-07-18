import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

const PokemonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const PokemonStart = () => {
  const [pokemon, setPokemon] = useState([]);
  const [, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [searchText, setSearchText] = useState('');

  const infiniteScrollRef = useRef(null); // Create a reference for the InfiniteScroll component

  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
      .then((resp) => resp.json())
      .then((json) => {
        setPokemon((prevPokemon) => [...prevPokemon, ...json.results]);
        setOffset((prevOffset) => prevOffset + 20); // Move this inside the callback function
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [offset]);

  useEffect(() => {
    setOffset(0); // Reset offset when the search text changes
  }, [searchText]);

  const handleLoadMore = useCallback(() => {
    setOffset((prevOffset) => prevOffset + 20);
  }, []);

  const filteredPokemon = pokemon.filter((p) => p.name.includes(searchText.toLowerCase()));

  useEffect(() => {
    const storedScrollTop = sessionStorage.getItem('pokemonScrollTop');
    if (storedScrollTop) {
      console.log('Restoring Scroll Position:', storedScrollTop);
      window.scrollTo(0, parseInt(storedScrollTop, 10));
    }

    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        handleLoadMore();
      }
      // Store the scroll position in session storage
      sessionStorage.setItem('pokemonScrollTop', window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleLoadMore]);

  return (
    <PokemonContainer>
      <SearchContainer>
        <SearchInput
          placeholder="Search Pokemon"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)} />
      </SearchContainer>
      <Container>
        <InfiniteScroll
          dataLength={filteredPokemon.length}
          next={handleLoadMore}
          hasMore
          loader={<div>Loading...</div>}
          scrollThreshold="95%"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          ref={infiniteScrollRef}>
          <PokemonList>
            {filteredPokemon.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <PokemonListItem key={`${item.name}-${index}`}>
                <Item>
                  <StyledLink to={`/pokemon/${item.id}/${item.name}`}>
                    <Title>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Title>
                  </StyledLink>
                </Item>
              </PokemonListItem>
            ))}
          </PokemonList>
        </InfiniteScroll>
      </Container>
    </PokemonContainer>
  );
}
export default PokemonStart;