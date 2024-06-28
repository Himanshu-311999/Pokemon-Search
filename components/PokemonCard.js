import Link from 'next/link';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="bg-blue-200 border p-4 rounded flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
      <img src={pokemon.image} alt={pokemon.name} className="w-24 h-24"/>
      <h2 className="text-lg font-bold capitalize mt-2">{pokemon.name}</h2>
      <Link href={`/pokemon/${pokemon.name}`} passHref>
        <span className="text-blue-500 mt-2">Details →</span>
      </Link>
    </div>
  );
};

export default PokemonCard;
