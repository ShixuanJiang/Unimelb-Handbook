import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import React from 'react'
import './index.css'
import WelcomePage from './pages/WelcomePage';
import MainPage from './pages/MainPage';
import Test from './pages/Test';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<WelcomePage />} />,
            <Route path='mainpage' element={<MainPage />} />
            <Route path='test' element={<Test />} />
        </Route>
    )
);

const App = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default App