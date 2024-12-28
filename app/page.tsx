import PokemonGrid from './src/components/PokemonGrid';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="text-center py-8 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <h1 className="text-4xl font-bold text-gray-900">Pokédex</h1>
        <p className="text-gray-600 mt-2">Explore the world of Pokémon</p>
      </header>
      
      <main>
        <PokemonGrid />
      </main>
    </div>
  );
};

export default Index;