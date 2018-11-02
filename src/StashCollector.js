import React, { Component } from 'react';

class StashCollector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leagueOptions: [],
      selectedLeague: '',
      selectedStashes: [],
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

  findLeagueStashes(league) {
    // filter stashes by league
    return this.props.stashes.filter((stash) => stash.league === league);
  }

  leagueUpdate(league) {
    this.setState((state) => ({
      selectedLeague: league
    }));
  }

  componentDidMount() {
    this.setState((state) => ({
      leagueOptions: this.findLeagueOptions(),
      selectedStashes: this.findLeagueStashes(this.state.selectedLeague),
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedLeague !== prevState.selectedLeague) {
      this.setState((state) => ({
        selectedStashes: this.findLeagueStashes(this.state.selectedLeague),
      }));
    }
  }

  render() {
    const leagueKey = "league-";
    const leagueButtons = this.state.leagueOptions.map((option, i) => (
      <button key={leagueKey + i} league={option} onClick={() => this.leagueUpdate(option)}>{option}</button>));

    return (
      <div>
        {leagueButtons}
      </div>
    )
  }
}

export default StashCollector;
