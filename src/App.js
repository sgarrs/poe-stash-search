import React, { Component } from 'react';
import data from './data.json';

import StashCollector from './StashCollector';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <StashCollector stashes={data[1].filter((stash) => stash.public)} />
    );
  }
}

export default App;
