import { useState } from 'react';

function Card({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAbilityOpen, setIsAbilityOpen] = useState(false);
  const [selectedAbility, setSelectedAbility] = useState(null);

  function handleModal(data) {
    setSelectedItem(data);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleAbility(url) {
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setSelectedAbility(response);
        setIsAbilityOpen(true);
      });
  }

  function closeAbilityModal() {
    setIsAbilityOpen(false);
  }

  return (
    <>
      {data &&
        data.map((item) => (
          <div
            className="bg-slate-100/10 p-12 rounded text-center text-white shadow min-w-[100px] max-w-[200px] cursor-pointer hover:bg-slate-100/50 hover:text-black hover:scale-110 duration-300 ease-in"
            key={item.id}
            onClick={() => {
              handleModal(item);
            }}
          >
            <p className="uppercase">{item.name}</p>
          </div>
        ))}
      {isOpen && (
        <div className="fixed top-[-5%] w-full h-full bg-black/50 flex justify-center items-center" onClick={closeModal}>
          <div className="bg-gray-900/75 rounded p-4 max-w-md relative w-dvh" onClick={(e) => e.preventDefault()}>
            <button className="bg-red-500/50 hover:bg-red-700 text-white font-bold py-2 px-4 rounded absolute right-5" onClick={closeModal}>
              X
            </button>
            <div className="flex flex-row items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-white uppercase text-center">{selectedItem.species.name}</h2>
                <img className="h-[200px] w-auto mx-auto" src={selectedItem.sprites.front_default} />
                <hr className="text-white" />
                <div className="flex flex-wrap items-center text-white gap-3 justify-center">
                  <div className="flex flex-row gap-2 items-center">
                    Abilites <div className="h-[10px] w-[10px] rounded-full bg-cyan-600 cursor-pointer hover:bg-cyan-400 duration-300 ease-in"></div>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    Forms <div className="h-[10px] w-[10px] rounded-full bg-green-600"></div>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    Types <div className="h-[10px] w-[10px] rounded-full bg-orange-300"></div>
                  </div>
                </div>
              </div>

              <div className="w-60 bg-gray-700 p-5 rounded">
                <h2 className="text-lg font-bold text-white uppercase text-center">Stats</h2>
                {selectedItem.stats.map((item) => (
                  <div className="flex flex-row justify-between items-center gap-2">
                    <div className="text-white">{item.stat.name}</div>
                    <div className="text-white font-bold">{item.base_stat}</div>
                  </div>
                ))}
              </div>
            </div>

            <hr className="my-2 text-white/25" />
            <div className="mt-2 flex flex-wrap gap-5 justify-center">
              {selectedItem.abilities.map((item) => (
                <a
                  className="bg-cyan-600 py-2 px-4 rounded"
                  onClick={(e) => {
                    handleAbility(item.ability.url);
                  }}
                >
                  {item.ability.name}
                </a>
              ))}

              {selectedItem.forms.map((item) => (
                <div className="bg-green-600 py-2 px-4 rounded">{item.name}</div>
              ))}
              {selectedItem.types.map((item) => (
                <div className="bg-orange-300 py-2 px-4 rounded">{item.type.name}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isAbilityOpen && (
        <div className="fixed top-[-5%] w-full h-full bg-black/50 flex justify-center items-center cursor-pointer" onClick={closeAbilityModal}>
          <div className="bg-gray-900/75 rounded p-4 max-w-md relative w-dvh" onClick={(e) => e.preventDefault()}>
            <button className="bg-red-500/50 hover:bg-red-700 text-white font-bold py-2 px-4 rounded absolute right-0 " onClick={closeAbilityModal}>
              X
            </button>
            <p className="mt-12 text-white relative">
              Info :{' '}
              {selectedAbility.effect_entries
                .filter((entry) => entry.language.name === 'en')
                .map((entry) => (
                  <span key={entry.effect}>{entry.effect}</span>
                ))}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
