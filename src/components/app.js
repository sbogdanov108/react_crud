import React from 'react';
import {Component} from 'react';

export default class App extends Component {
  // { this.props.children } - вложенные роуты
  render()
  {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}
