interface TypeFilterProps {
  selectedTypes: string[];
  onTypeSelect: (type: string) => void;
}

const TypeFilter = ({ selectedTypes, onTypeSelect }: TypeFilterProps) => {
  const types = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-8 justify-center">
      {types.map((type) => (
        <button
          key={type}
          onClick={() => onTypeSelect(type)}
          className={`px-3 py-1 rounded-full text-sm font-medium capitalize transition-all duration-200 ${
            selectedTypes.includes(type)
              ? `${getTypeColor(type)} text-white`
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default TypeFilter;