export const fetchData = () => {
  return fetch("https://pokeapi.co/api/v2/pokemon");
};

export const fetchSingleData = ({ params }) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${params.idOrName}`);
};

export const fetchLocationData = () => {
  return fetch("https://pokeapi.co/api/v2/location-area");
};
