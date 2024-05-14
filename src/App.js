import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Converter from './pages/Converter';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} /> 
          <Route path="/Converter" component={Converter}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

// npm install react-router-dom required 

/*
IF it dosent work then (npm uninstall react-router-dom)
else (npm install react-router-dom@5.2.0)
 */