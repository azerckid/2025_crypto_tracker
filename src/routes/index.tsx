import { createBrowserRouter } from 'react-router-dom';
import Coins from '../pages/Coins';
import Coin from '../pages/Coin';
import CoinPrice from '../pages/CoinPrice';
import CoinChart from '../pages/CoinChart';
import Home from '../pages/Home';
import About from '../pages/About';
import NotFound from '../pages/NotFound';
import App from '../App';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'about',
                element: <About />,
            },
            {
                path: 'coins',
                element: <Coins />,
            },
            {
                path: 'coins/:coinId',
                element: <Coin />,
                children: [
                    {
                        index: true,
                        element: <CoinPrice />,
                    },
                    {
                        path: 'chart',
                        element: <CoinChart />,
                    },
                ],
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
]); 