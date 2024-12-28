"use client"
import { useEffect, useState } from 'react';
import { Pokemon } from '../lib/types';
import { getPokemonList, getPokemonDetails } from '../lib/pokemon';
import PokemonCard from './PokemonCard';
import PokemonModal from './PokemonModal';
import LoadingSpinner from './LoadingSpinner';
import SearchBar from './SearchBar';
import TypeFilter from './TypeFilter';
import { Button } from './ui/button';

const PokemonGrid = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const fetchPokemon = async () => {
    try {
      setLoading(true);
      const list = await getPokemonList(offset);
      const details = await Promise.all(
        list.results.map((p) => getPokemonDetails(p.name))
      );
      setPokemon((prev) => [...prev, ...details]);
      setFilteredPokemon((prev) => [...prev, ...details]);
    } catch (err) {
      setError('Failed to load Pokémon');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, [offset]);

  useEffect(() => {
    let filtered = pokemon;

    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedTypes.length > 0) {
      filtered = filtered.filter((p) =>
        p.types.some((t) => selectedTypes.includes(t.type.name))
      );
    }

    setFilteredPokemon(filtered);
  }, [searchQuery, selectedTypes, pokemon]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTypeSelect = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const loadMore = () => {
    setOffset((prev) => prev + 20);
  };

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar onSearch={handleSearch} />
      <TypeFilter
        selectedTypes={selectedTypes}
        onTypeSelect={handleTypeSelect}
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredPokemon.map((p) => (
          <PokemonCard
            key={p.id}
            pokemon={p}
            onClick={() => setSelectedPokemon(p)}
          />
        ))}
      </div>
      
      {loading && <LoadingSpinner />}
      
      {!loading && filteredPokemon.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No Pokémon found
        </div>
      )}
      
      {!loading && filteredPokemon.length > 0 && (
        <div className="text-center mt-8">
          <Button
            onClick={loadMore}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Load More
          </Button>
        </div>
      )}
      
      <PokemonModal
        pokemon={selectedPokemon}
        isOpen={!!selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
      />
    </div>
  );
};

export default PokemonGrid;