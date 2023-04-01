import { BrowserRouter as Router ,Route,Routes } from "react-router-dom";
import Header from "./components/Header"
import Home from "./components/Home"
import Coin from "./components/Coin"
import CoinDetails from "./components/CoinDetails"
import Exchange from "./components/Exchange"
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/coin" element={<Coin/>}/>
        <Route path="/exchange" element={<Exchange />}/>
        <Route path="/coin/:id" element={<CoinDetails />}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
