import { useEffect, useState } from "react";
import { fetchLocationData } from "../../api/loaders";
import { useLoaderData } from "react-router-dom";

export const GatchaPage = () => {
  const locationFetch = useLoaderData();
  const [isPending, setIsPending] = useState(false);
  const [location, setLocation] = useState(locationFetch.results);
  const [locationSearch, setLocationSearch] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isPendingSingleData, setIsPendingSingleData] = useState(false);

  useEffect(() => {
    if (!isOpen) setPokemonData([]);
  }, [isOpen]);

  const handleGatcha = async (url) => {
    setIsOpen(true);
    setIsPendingSingleData(true);

    const response = await fetch(url)
      .then((response) => response.json())
      .then((res) => {
        setIsPendingSingleData(false);
        return res;
      });

    setPokemonData(response.pokemon_encounters);
  };

  return (
    <div className="text-white overflow-hidden">
      <div className="relative">
        <div className="px-5">
          <h1 className="text-4xl font-bold text-center mb-5">Gatcha Page</h1>
          {isPending && <div>Loading ...</div>}
          <div className="flex flex-wrap w-full gap-5 py-12 items-center justify-center">
            {!isPending &&
              location &&
              location.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white/25 p-12 rounded-lg shadow min-w-60 text-center uppercase hover:bg-cyan-600 hover:scale-110 duration-200 ease-in"
                  >
                    <div>{item?.name}</div>
                    <div
                      className="cursor-pointer mt-3 bg-green-600 rounded px-4 py-2 hover:bg-green-700 hover:shadow-lg duration-300 ease-in-out w-fit mx-auto"
                      onClick={() => {
                        handleGatcha(item?.url);
                      }}
                    >
                      Gatcha
                    </div>
                  </div>
                );
              })}
          </div>

          {pokemonData.length > 0 && (
            <div className="fixed top-20 bg-black/75 px-5 pb-5 rounded w-full">
              <div
                onClick={() => {
                  setIsOpen(false);
                }}
                className="cursor-pointer bg-red-500 p-5 rounded-lg px-5 py-3 font-bold absolute right-10 top-5"
              >
                x
              </div>

              <div className="mt-12">
                <p className="font-bold text-2xl my-3 mx-5">
                  Pokemon Encounters
                </p>
                <div className="flex flex-wrap">
                  {pokemonData.map((item, index) => {
                    // console.log(item);
                    return (
                      <div className="p-2 h-100" key={index}>
                        <div className="bg-orange-500 rounded px-2 py-1">
                          {item?.pokemon.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {isPendingSingleData && (
            <div className="fixed top-20 bg-black/75 px-5 py-5 rounded w-full">
              <div className="w-full h-full flex flex-col justify-center items-center font-bold text-3xl">
                Loading ...
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
