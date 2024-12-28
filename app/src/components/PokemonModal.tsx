"use client"
import { Dialog, DialogContent } from "./ui/dialog";
import { Pokemon } from '../lib/pokemon';
import { getTypeColor } from '../lib/pokemon';
import FavoriteButton from './FavoriteButton';

interface PokemonModalProps {
  pokemon: Pokemon | null;
  isOpen: boolean;
  onClose: () => void;
}

const PokemonModal = ({ pokemon, isOpen, onClose }: PokemonModalProps) => {
  if (!pokemon) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white/95 backdrop-blur-sm">
        <div className="relative">
          <div className="absolute top-2 right-2">
            <FavoriteButton pokemonId={pokemon.id} />
          </div>
          
          <div className="aspect-square w-full max-w-[200px] mx-auto mb-4">
            <img
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              className="w-full h-full object-contain"
            />
          </div>
          
          <h2 className="text-2xl font-bold capitalize mb-4 text-center">
            {pokemon.name}
          </h2>
          
          <div className="flex justify-center gap-2 mb-6">
            {pokemon.types.map(({ type }) => (
              <span
                key={type.name}
                className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getTypeColor(
                  type.name
                )}`}
              >
                {type.name}
              </span>
            ))}
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Stats</h3>
              <div className="space-y-2">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="flex items-center">
                    <span className="w-32 text-sm capitalize">{stat.stat.name}</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                      />
                    </div>
                    <span className="w-12 text-right text-sm">{stat.base_stat}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Abilities</h3>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map(({ ability }) => (
                  <span
                    key={ability.name}
                    className="px-3 py-1 rounded-full text-sm bg-gray-100"
                  >
                    {ability.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PokemonModal;