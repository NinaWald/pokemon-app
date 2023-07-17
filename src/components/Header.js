import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #ffc0cb;
  padding: 16px;
  display: flex;
  height: 50px;
  width: 100%;
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
