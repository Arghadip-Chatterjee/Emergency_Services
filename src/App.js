import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './Mainpage';
import Login from './login';
import BookNow from './BookNow';
import ThankYouPage from './thanks';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/" element={<MainPage/>}/>
          <Route exact path="/book-now" element={<BookNow/>}/>
          <Route exact path="/thanks" element={<ThankYouPage/>}/>
        </Routes>
        </div>
      </Router>

  );
};

export default App;
