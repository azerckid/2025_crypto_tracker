import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.tsx';
import About from '../pages/About.tsx';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
        </Routes>
    );
};

export default AppRoutes; 