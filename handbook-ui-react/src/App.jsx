import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/courseplanner" element={<MainPage />} />
          <Route path="/searchsubject" element={<SearchPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
