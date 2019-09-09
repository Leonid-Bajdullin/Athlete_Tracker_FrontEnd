import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { UserProfile } from '../UserProfile/UserProfile';
import { RegistrationForm } from '../RegistrationForm/RegistrationForm';
import { LoginForm } from '../LoginForm/LoginForm';
import { inject, observer } from 'mobx-react';
import './Header.css';

@inject('store')
@observer
export class Header extends Component<{ store?: any }, {}> {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  render() {
    const currentUser = this.props.store.currentUser;

    let authorisationSection;
    if (this.props.store.isLoggedIn) {
      authorisationSection = (
        <div className="profile-tab">
          <Button variant="danger" onClick={this.props.store.signOut}>
            Sign out
          </Button>
          <div className="greeting-tab">Hello, {currentUser.firstName}</div>
          <UserProfile />
        </div>
      );
    } else {
      authorisationSection = (
        <div className="profile-tab">
          <RegistrationForm />
          <div className="greeting-tab">
            If you already
            <br /> registered >>>
          </div>
          <LoginForm />
        </div>
      );
    }

    return (
      <header className="header">
        <nav className="search-input">
          <input
            onChange={() => {
              alert('Not yet implemented');
            }}
          />
        </nav>
        <div className="app-title">
          <Link to="/">ATHLETE TRACKER</Link>
        </div>
        {authorisationSection}
      </header>
    );
  }
}
