import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
// eslint-disable-next-line
import PokemonDetails from './components/PokemonDetails';
import PokemonStart from './components/PokemonStart';
// import Header from './components/Header';
import NotFound from './components/NotFound';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonStart />} />
        <Route path="/pokemon/:name/:id" element={<PokemonDetails />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
};

