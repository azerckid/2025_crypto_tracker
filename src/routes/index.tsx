import { Routes, Route } from 'react-router-dom';
import Coins from '../pages/Coins.tsx';
import Coin from '../pages/Coin.tsx';
import Home from '../pages/Home.tsx';
import About from '../pages/About.tsx';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/coins" element={<Coins />} />
            <Route path="/coins/:coinId" element={<Coin />} />
        </Routes>
    );
};

export default AppRoutes; 