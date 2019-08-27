import React from 'react';
import { Provider } from 'mobx-react';
import { Container } from 'typedi';

import './App.css';
import { RootStore } from './stores/RootStore';
import MainPage from './pages/mainPage/MainPage';
import { UserProfile } from './components/UserProfile/UserProfile';
import { UserService } from './services/UserService';
import { TeamProfile } from './pages/teamProfile/TeamProfile';

const rootStore = new RootStore(Container.get(UserService));

const App: React.FC = () => {
  return (
    <Provider store={rootStore}>
      <div>
        <MainPage />
        <UserProfile />
        <TeamProfile id='1' />
      </div>
    </Provider>
  );
};

export default App;
