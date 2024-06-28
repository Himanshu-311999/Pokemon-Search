 "use client";
import { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import PokemonList from '../components/PokemonList';
import Spinner from '@/components/Spinner';

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      setLoading(true);

      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await response.json();
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return { name: pokemon.name, image: details.sprites.front_default, types: details.types.map(t => t.type.name) };
        })
      );
      setPokemons(pokemonDetails);
      setFilteredPokemons(pokemonDetails);
      setLoading(false)
    };
    fetchPokemons();
  }, []);

  const handleSearch = ({ type, term }) => {
    let filtered = pokemons;
    if (type) {
      filtered = filtered.filter((pokemon) => pokemon.types.includes(type));
    }
    if (term) {
      filtered = filtered.filter((pokemon) => pokemon.name.includes(term.toLowerCase()));
    }
    setFilteredPokemons(filtered);
  };

  // if(loading) return <Spinner />;

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-8">Pokemon Search</h1>
      <SearchForm onSearch={handleSearch} />
      <PokemonList pokemons={filteredPokemons} />
    </div>
  );
}
