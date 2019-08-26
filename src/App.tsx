import React from 'react';
import { Provider } from 'mobx-react';
import { Container } from 'typedi';

import './App.css';
import { RootStore } from './stores/RootStore';
import MainPage from './pages/mainPage/MainPage';
import { UserProfile } from './components/UserProfile/UserProfile';
import { UserExample } from './components/UserExample';
import { UserService } from './services/UserService';
import { ItemCard } from './components/ItemCard/ItemCard';

const rootStore = new RootStore(Container.get(UserService));

const App: React.FC = () => {
  return (
    <Provider store={rootStore}>
      <div>
        <MainPage />
        <UserProfile />
        <UserExample />
        <ItemCard
          title="mark ruffalo"
          photoUrl=""
          id="2"
          info="description"
          position="headcoach"
        />
        <ItemCard
          title="mark ruffalo"
          photoUrl=""
          id="2"
          info="description"
          position="athlete"
        />
        <ItemCard
          title="mark ruffalo"
          photoUrl=""
          id="2"
          info="description"
          position="coach"
        />
      </div>
    </Provider>
  );
};

export default App;
