"use client"
import { Pokemon } from '../lib/types';
import { getTypeColor } from '../lib/pokemon';
import FavoriteButton from './FavoriteButton';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
}

const PokemonCard = ({ pokemon, onClick }: PokemonCardProps) => {
  return (
    <div
      onClick={onClick}
      className="relative group cursor-pointer rounded-xl bg-white/80 backdrop-blur-sm p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
    >
      <div className="absolute top-2 right-2 z-10">
        <FavoriteButton pokemonId={pokemon.id} />
      </div>
      
      <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-50">
        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      
      <h3 className="text-lg font-medium capitalize mb-2 text-gray-900">
        {pokemon.name}
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {pokemon.types.map(({ type }) => (
          <span
            key={type.name}
            className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getTypeColor(type.name)}`}
          >
            {type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;