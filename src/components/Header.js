import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #ff69b4;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Headerbox = styled.div`
 display: flex;
 justify-content: center;
`

const Title = styled.h1`
  color: white;
  text-align: center;
`;

const Header = () => (
  <HeaderContainer>
    <Headerbox>
      <Title>Pokemon App</Title>
    </Headerbox>
  </HeaderContainer>
);

export default Header;
