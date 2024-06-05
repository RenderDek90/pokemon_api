import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Gatcha() {
  const location = useLocation();
  const [pokemonData, setPokemonData] = useState([]);
  const [pokeLocation, setPokeLocation] = useState([]);
  const [pokemonInnerData, setPokemonInnerData] = useState([]);
  const data = location.state.data;

  async function getPokemonData(data) {
    const fullData = Object.values(data);
    console.log(fullData);

    const promises = fullData[3].map((item) => {
      return fetch(item.url).then((response) => response.json());
    });
    const responses = await Promise.all(promises);
    console.log(responses);
    setPokemonData(responses);
    // return responses;/
  }

  async function getLocations() {
    const promises = pokemonData.map((item, id) => {
      return fetch(item.location_area_encounters).then((response) => response.json());
    });

    const responses = await Promise.all(promises);

    const newData = pokemonData.map((pokemon, index) => ({
      id: pokemon.id,
      name: pokemon.name,
      species: pokemon.species,
      location: responses[index],
    }));

    setPokeLocation(newData);
  }

  useEffect(() => {
    if (data) {
      async function fetchData() {
        const pokemonData = await getPokemonData(data);
        getLocations();
      }
      fetchData();
    }
  }, [data]);

  return (
    <>
      <div className="bg-[url('/public/image/pokemon_background.jpg')] bg-cover w-full h-full middle mb-5">
        <div className="bg-gray-900/75 h-full p-12 flex flex-wrap gap-5 items-center">
          {pokeLocation &&
            pokeLocation.map((item) => (
              <div
                className="bg-slate-100/10 p-12 rounded text-center text-white shadow min-w-[100px] max-w-[200px] cursor-pointer hover:bg-slate-100/50 hover:text-black hover:scale-110 duration-300 ease-in"
                key={`${item.location_area.name}-${item.location_area.url}`}
              >
                <p className="uppercase">{item.location_area.name}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Gatcha;
