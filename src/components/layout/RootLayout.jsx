import { NavLink, Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <div className="p-5 text-2xl text-white flex flex-row justify-between items-center">
        <div>Pokefind</div>
        <div>
          <NavLink to="/" className="px-2 mx-2">
            Home
          </NavLink>
          <NavLink to="/gatcha" className="px-2 mx-2">
            Gatcha
          </NavLink>
          <p />
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default RootLayout;
