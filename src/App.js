import React from 'react';
import { Route, Switch } from 'react-router';
import Feedback from './pages/Feedback';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Game from './pages/Game';

export default function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/feedback" component={ Feedback } />
        <Route exact path="*" component={ NotFound } />
      </Switch>
    </main>
  );
}
