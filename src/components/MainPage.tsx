import React from 'react';

import { AllTeamCardsList } from './AllTeamCardsList';
import { Button } from 'react-bootstrap';

const MainPage: React.FC = () => {
  return (
    <div>
      <header className='header'>
        <input />
        <div>ATHLETE TRACKER</div>
        <div>
          <Button variant='success'>Sign up</Button> or{' '}
          <Button variant='success'>Sign in</Button>
        </div>
      </header>
      <AllTeamCardsList />
      <footer className='footer'>Footer</footer>
    </div>
  );
};

export default MainPage;
