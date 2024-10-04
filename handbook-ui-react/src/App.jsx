import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import React from 'react'
import './index.css'
import WelcomePage from './pages/WelcomePage';

const router = createBrowserRouter(
    createRoutesFromElements(<Route index element={<WelcomePage />} />)
);

const App = () => {
    return <RouterProvider router={router} />;
}

export default App