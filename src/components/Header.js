import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #ff69b4;
  padding: 16px;
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  color: white;
  text-align: center;
`;

const Header = () => (
  <HeaderContainer>
    <Title>Pokemon App</Title>
  </HeaderContainer>
);

export default Header;
