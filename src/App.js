import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PokemonDetails from 'components/PokemonDetails';
import Header from './components/Header';
import PokemonStart from './components/PokemonStart';

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <PokemonStart />
      <Routes>
        <Route path="/" element={<PokemonStart />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

