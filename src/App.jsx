import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { GlobalContext } from "./components/content";

function App() {
  const name = {
    username: "Darren"
  };

  return (
    <div className="bg-[#252525] h-full w-full">
      <GlobalContext.Provider value={name}>
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
