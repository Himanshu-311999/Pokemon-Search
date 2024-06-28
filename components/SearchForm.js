import React, { useState, useEffect } from 'react';

const SearchForm = ({ onSearch }) => {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTypes = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/type');
      const data = await response.json();
      setTypes(data.results);
    };
    fetchTypes();
  }, []);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      onSearch({ type: selectedType, term: '' }); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ type: selectedType, term: searchTerm });
  };

  return (
    <form className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-8" onSubmit={handleSubmit}>
      <select
        className="border p-2 rounded w-full md:w-auto"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
      <div className="relative w-full md:w-auto">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <span role="img" aria-label="Search" className="text-gray-400">🔍</span>
        </span>
        <input
          type="text"
          className="border p-2 rounded pl-10 w-full md:w-auto"
          placeholder="Search Pokémon"
          value={searchTerm}
          onChange={handleChange}
        />
         <button type="submit" className="absolute right-0 top-0 bg-blue-500 text-white p-2 rounded-r">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
