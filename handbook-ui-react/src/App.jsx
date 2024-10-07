import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import React from 'react'
import './index.css'
import './App.css'
import WelcomePage from './pages/WelcomePage';
import MainPage from './pages/MainPage';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<WelcomePage />} />,
            <Route path='mainpage' element={<MainPage />} />
        </Route>
    )
);

const App = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default App