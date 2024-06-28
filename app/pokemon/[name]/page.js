'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Spinner from '../../../components/Spinner';

export default function PokemonDetails({ params }) {
  const { name } = params;
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      setPokemon({
        name: data.name,
        image: data.sprites.front_default,
        types: data.types.map(t => t.type.name),
        stats: data.stats.map(stat => stat.stat.name),
        abilities: data.abilities.map(a => a.ability.name),
        moves: data.moves.slice(0, 5).map(m => m.move.name),
      });
      setLoading(false);
    };
    fetchPokemon();
  }, [name]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col items-center">
        <div className="w-full mb-4">
            <nav className="bg-gray-100 p-3 rounded">
            <Link href="/" passHref>
                <span className="text-blue-500 cursor-pointer">Home</span>
            </Link>
            {' '}→{' '}
            <span className="capitalize">{name}</span>
            </nav>
      </div>
      <Link href="/" passHref>
        <span className="text-blue-500 cursor-pointer mb-4 inline-block px-4 py-2 border rounded hover:bg-blue-500 hover:text-white transition">
          Back
        </span>
      </Link>
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full md:w-2/3 lg:w-1/2">
        <div className="bg-blue-100 flex justify-center items-center p-4">
          <img src={pokemon.image} alt={pokemon.name} className="w-32 h-32" />
        </div>
        <div className="p-4 bg-orange-400">
          <h1 className="text-4xl font-bold text-center mb-4 capitalize">{pokemon.name}</h1>
          <div className="text-left">
            <p className="text-2xl font-bold">Type:</p>
            <p>{pokemon.types.join(', ')}</p>
            <p className="text-2xl font-bold mt-4">Stats:</p>
            <p>{pokemon.stats.join(', ')}</p>
            <p className="text-2xl font-bold mt-4">Abilities:</p>
            <p>{pokemon.abilities.join(', ')}</p>
            <p className="text-2xl font-bold mt-4">Moves:</p>
            <p>{pokemon.moves.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
