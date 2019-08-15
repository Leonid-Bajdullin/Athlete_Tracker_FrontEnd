import React from 'react';

import './App.css';
import { RegistrationForm } from './components/RegistrationForm';

const App: React.FC = () => {
  return (
    <div>
      <header>My App</header>
      <RegistrationForm />
      <footer>Footer</footer>
    </div>
  );
};

export default App;
