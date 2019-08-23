import React from 'react';
import { Provider } from 'mobx-react';

import './App.css';
import { UserStore } from './stores/UserStore';
import MainPage from './pages/mainPage/MainPage';
import { UserProfile } from './components/UserProfile/UserProfile';
import { UserExample } from './components/UserExample';
import { BaseService } from './services/BaseService';

const userStore = new UserStore(BaseService);

const App: React.FC = () => {
  return (
    <Provider store={userStore}>
      <div>
        <MainPage />
        <UserProfile />
        <UserExample />
      </div>
    </Provider>
  );
};

export default App;
