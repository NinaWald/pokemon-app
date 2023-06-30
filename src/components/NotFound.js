import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  margin-top: 150px;
  margin-left: 50px;

`;

const NotFound = () => {
  const navigate = useNavigate();
  const onHomeButtonClick = () => {
    navigate('/');
  };

  return (
    <NotFoundContainer>
      <p>Sorry, no such page</p>
      <button type="button" onClick={onHomeButtonClick}>
        Return to home page
      </button>
    </NotFoundContainer>
  );
};

export default NotFound;