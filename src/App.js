import { BrowserRouter as Router , Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Exchanges from "./components/Exchanges";
import CoinDetail from "./components/CoinDetail";
import Coins from "./components/Coins";
import Footer from "./components/Footer";
function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path={'/'} element={<Home/>} />
        <Route path={'/coins'} element={<Coins/>} />
        <Route path={'/coin/:id'} element={<CoinDetail/>} />
        <Route path={'/exchanges'} element={<Exchanges/>} />
      </Routes>
      <Footer/>
    </Router>
    
  );
}

export default App;
