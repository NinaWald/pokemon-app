import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import PokemonDetails from './components/PokemonDetails';
import PokemonStart from './components/PokemonStart';
import Header from './components/Header';
import NotFound from './components/NotFound';

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<PokemonStart />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
};

