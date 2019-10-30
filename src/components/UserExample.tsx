import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

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
        <div>Hi, {this.props.store.currentUser.toString()}</div>
        {this.props.store.allUsers.map((item: any) => (
          <div>{item.name}</div>
        ))}
      </div>
    );
  }
}
