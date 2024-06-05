import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import Gatcha from './Gatcha';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="gatcha" element={<Gatcha />} />
        </Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
