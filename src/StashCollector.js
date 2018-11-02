import React, { Component } from 'react';

class StashCollector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leagueOptions: [],
      selectedLeague: '',
    };
  }

  findLeagueOptions() {
    // find available leagues from stash data instead of prescribing them
    let leagueOptions = [];
    this.props.stashes.forEach((stash) => {
      if (!leagueOptions.includes(stash.league) && stash.league !== null) {
        leagueOptions.push(stash.league);
      }
    });
    return leagueOptions;
  }

  leagueUpdate(league) {
    this.setState((state) => ({
      selectedLeague: league
    }));
  }

  componentDidMount() {
    this.setState((state) => ({
      leagueOptions: this.findLeagueOptions()
    }));
  }

  render() {
    const publicStashes = this.props.stashes.filter((stash) => stash.public);
    const leagueButtons = this.state.leagueOptions.map((option, i) => (
      <button key={i} league={option} onClick={() => this.leagueUpdate(option)}>{option}</button>));

    return (
      <div>
        {leagueButtons}
      </div>
    )
  }
}

export default StashCollector;
