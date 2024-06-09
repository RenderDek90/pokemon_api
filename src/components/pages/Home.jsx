import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { fetchSingleData } from "../../api/loaders";

export const Home = () => {
  const pokemon = useLoaderData();
  const [isPending, setPending] = useState(true);

  const [pokemonData, setPokemonData] = useState(pokemon.results);
  const [singlePoke, setSinglePoke] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isPendingSinglePoke, setIsPendingSinglePoke] = useState(false);
  const [pokeSearch, setPokeSearch] = useState("");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (pokemon) {
      setPending(false);
    }

    if (!isOpen) setSinglePoke([]);
  }, [pokemon, isOpen]);

  const handleClick = (item) => {
    setIsOpen(true);
    console.log(item);

    setIsPendingSinglePoke(true);
    fetchSingleData({
      params: {
        idOrName: item,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setSinglePoke([res]);
        setIsPendingSinglePoke(false);
      });
  };

  const handleInput = (e) => {
    if (e.target.value != "") {
      setPokeSearch(e.target.value);
    }
    setPokemonData(pokemon.results);
    setCounter(pokemon.results.length);
  };

  const handleSearch = () => {
    const filteredData = pokemonData.filter((item) => {
      let searchData = pokeSearch.toLowerCase();
      return item.name.includes(searchData);
    });

    setPokemonData(filteredData);
    setCounter(filteredData.length);
  };

  const handleKeydown = () => {
    handleSearch();
  };

  return (
    <div className="text-white ">
      <div className="relative">
        <div className="px-5">
          <h1 className="text-4xl font-bold text-center mb-5">Home Page</h1>
          <div className="w-full text-center">
            <input
              type="text"
              className="py-2 px-3 rounded text-black"
              onChange={handleInput}
              onKeyDown={handleKeydown}
            />
            <button
              className="mx-3 py-2 px-3 rounded text-white bg-green-500 hover:bg-green-700 duration-200 ease-in-out"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          {counter != 0 ? (
            <div className="text-center mt-5 w-full flex flex-row justify-center items-center">
              <p className="py-2 px-3 rounded bg-red-500 font-bold">
                Found {counter}
              </p>
            </div>
          ) : (
            ""
          )}
          {isPending && "loading.."}
          <div className="flex flex-wrap w-full gap-5 py-12 items-center justify-center">
            {!isPending &&
              pokemonData &&
              pokemonData.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white/25 p-12 rounded-lg shadow min-w-60 text-center uppercase hover:font-bold hover:bg-cyan-600 hover:scale-110 duration-200 ease-in"
                  >
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        handleClick(item?.name);
                      }}
                    >
                      {item?.name}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        {isPendingSinglePoke && (
          <div className="absolute top-0 bg-black/75 h-full w-full">
            <div className="w-full h-full flex flex-col justify-center items-center">
              Loading ...
            </div>
          </div>
        )}

        {singlePoke &&
          singlePoke.map((item, index) => {
            return (
              <div
                key={index}
                className="absolute top-0 bg-black/75 h-full w-full "
              >
                <div
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="cursor-pointer bg-red-500 p-5 rounded-lg px-5 py-3 font-bold absolute right-5 top-5"
                >
                  x
                </div>
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <div className="uppercase font-bold text-3xl pb-6">
                    {item?.species.name}
                  </div>
                  <div className="flex md:flex-row gap-6 flex-col justify-between items-center">
                    <img
                      src={item?.sprites.front_default}
                      className="w-80 h-80"
                    />
                    <div>
                      <p className="text-2xl">Stats</p>
                      <hr />
                      <ul>
                        {item?.stats.map((statItem, statIndex) => {
                          return (
                            <li key={statIndex}>
                              <div>
                                {statItem.stat.name} : {statItem.base_stat}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div>
                      <p className="text-2xl">Abilities</p>
                      <hr />
                      <ul>
                        {item?.abilities.map((abilityItem, abilityIndex) => {
                          return (
                            <li key={abilityIndex}>
                              <div>{abilityItem.ability.name}</div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
