import React from 'react';

import { AllTeamCardsList } from './mainPage/AllTeamCardsList';
import { Button } from 'react-bootstrap';
import { RegistrationForm } from './mainPage/RegistrationForm';
import { LoginForm } from './mainPage/LoginForm';

export function MainPage() {
  return (
    <div className='mainpage-container'>
      <div className='content-wrap'>
        <header className='header'>
          <input />
          <div>ATHLETE TRACKER</div>
          <div>
            <RegistrationForm /> or <LoginForm />
          </div>
        </header>
        <AllTeamCardsList />
      </div>
      <footer className='footer'>Footer</footer>
    </div>
  );
}

export default MainPage;
