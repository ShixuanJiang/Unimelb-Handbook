import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import React from 'react'
import './index.css'
import './App.css'
import WelcomePage from './pages/WelcomePage';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';



const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<WelcomePage />} />,
            <Route path='courseplanner' element={<MainPage />} />,
            <Route path='searchsubject' element={<SearchPage />} />
        </Route>
    )
);

const App = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default App