import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-[#252525] py-5 px-12 flex flex-row justify-between items-center text-white relative w-full">
      <p className="font-bold">POKEFIND</p>
      <div className="Sections">
        <ul className="flex flex-row gap-5">
          <Link to="/">Home</Link>
          <Link to="/gatcha">Gatcha</Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
