import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';

export default function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="*" component={ NotFound } />
      </Switch>
    </main>
  );
}
