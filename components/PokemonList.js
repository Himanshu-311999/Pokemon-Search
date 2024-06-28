import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemons }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pokemons.length > 0 ? (
        pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))
      ) : (
        <p className="text-center text-gray-600">No results found</p>
      )}
    </div>
  );
};

export default PokemonList;
