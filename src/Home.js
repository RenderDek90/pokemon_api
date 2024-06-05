import Pokemons from './Components/Pokemons';

function Home() {
  return (
    <div className="bg-[url('/public/image/pokemon_background.jpg')] bg-cover w-full h-full middle mb-5">
      <div className="bg-gray-900/75 h-full p-12">
        <div>
          <Pokemons />
        </div>
      </div>
    </div>
  );
}

export default Home;
