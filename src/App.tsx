import React from 'react';

import './App.css';
import MainPage from './components/MainPage';
// import { RegistrationForm } from './components/RegistrationForm';
import { Example } from './components/ModalExample';

const App: React.FC = () => {
  return (
    <div>
      <MainPage />
      {/* <RegistrationForm /> */}
      <Example />
    </div>
  );
};

export default App;
