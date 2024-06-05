import { useEffect, useState } from 'react';
import Card from './Card';
import { Link, useNavigate } from 'react-router-dom';
import Gatcha from '../Gatcha';

function Pokemons() {
  const [pokemon, setPokemon] = useState('');
  const [isPending, setIsPending] = useState(true);
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [pokemonData, setPokemonData] = useState([]);
  const [isGatcha, setIsGatcha] = useState(false);

  const api = 'https://pokeapi.co/api/v2/pokemon';

  function handleChange(value) {
    setPokemon(value);
  }

  async function getPokemonData(data) {
    await data.map((item) => {
      fetch(item.url)
        .then((response) => response.json())
        .then((response) => {
          setPokemonData((state) => {
            state = [...state, response];
            return state;
          });
        });
    });
  }

  async function searchPokemonData(data, value) {
    console.log(data);

    const filteredData = data.filter((item) => item.name === value.toLowerCase());
    console.log(filteredData);

    if (filteredData.length > 0) {
      setPokemonData(filteredData);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        await fetch(api)
          .then((resp) => {
            if (resp.ok) {
              return resp.json();
            } else {
              alert('failed catch api');
            }
          })
          .then((data) => {
            setIsPending(true);
            setData(data);
            setPokemonData([]);
            getPokemonData(data.results);
            setIsPending(false);
          })
          .catch((err) => {
            alert(err.message);
          });
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [url]);

  const navigate = useNavigate();

  function handleClick(data) {
    setIsGatcha(true);

    navigate('/gatcha', {
      state: {
        data,
      },
    });
  }

  return (
    <div className=" bg-gray-900/50 w-full py-6 px-2 rounded">
      <div className="flex flex-row items-center justify-center gap-2">
        <input
          type="text"
          name="pokemon"
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          value={pokemon}
          className="rounded p-2 w-96"
        />

        <input
          type="button"
          className="rounded bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-3 cursor-pointer"
          onClick={async () => {
            await searchPokemonData(data.results, pokemon);
          }}
          value="Search"
        />
        <button onClick={() => handleClick(data)} className="rounded bg-green-500 text-white py-2 px-3">
          Gatcha Page
        </button>
      </div>

      <div className="mt-5">
        {isPending && <div className="text-white text-center">loading..</div>}
        <div className="flex flex-wrap justify-center items-center gap-5">{pokemonData && <Card data={pokemonData} />}</div>
        {/* <div className="flex flex-wrap justify-center items-center gap-5">{pokemonData && isGatcha && <Gatcha data={pokemonData} />}</div> */}
      </div>
    </div>
  );
}

export default Pokemons;
