import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';


import { Query } from './Query.js'


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    {/* <Layout> */}
      <Routes>
        <Route exact path="/" element={<Query/>}/>
      </Routes>
    {/* </Layout>/ */}
  </Router>
);
reportWebVitals();
