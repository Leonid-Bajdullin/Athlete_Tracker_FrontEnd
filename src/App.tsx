import React from 'react';
import { Provider } from 'mobx-react';
import { Container } from 'typedi';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import { RootStore } from './stores/RootStore';
import MainPage from './pages/mainPage/MainPage';
import { UserService } from './services/UserService';
import { TeamProfile } from './pages/teamProfile/TeamProfile';

const rootStore = new RootStore(Container.get(UserService));

const App: React.FC = () => {
  return (
    <Provider store={rootStore}>
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/teamprofile/:teamId" component={TeamProfile} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
