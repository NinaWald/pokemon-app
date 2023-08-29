import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #ffc0cb;
  padding: 16px;
  display: flex;
  height: 90px;
  width: 100%;
  justify-content: center;
  flex-direction: column;
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
const DateText = styled.p`
  color: white;
  font-size: 16px;
`;

const Header = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  return (
    <HeaderContainer>
      <Headerbox>
        <Title>Pokemon App</Title>
      </Headerbox>
      <DateText>{formattedDate}</DateText>
    </HeaderContainer>
  );
}

export default Header;
