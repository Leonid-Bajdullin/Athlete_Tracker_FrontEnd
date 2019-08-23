import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { UserStore } from '../stores/UserStore';

@inject('store')
@observer
export class UserExample extends Component<{ store?: any }, {}> {
  constructor(props: any) {
    super(props);

    this.state = {
      teams: ['alex', 'leo']
    };
  }
  async componentDidMount() {
    this.props.store.getAllTeams();
  }

  render() {
    return (
      <div>
        <div>Hi, {this.props.store.currentUser}</div>
        {this.props.store.allTeams.map((item: any) => (
          <div>{item.name}</div>
        ))}
      </div>
    );
  }
}
