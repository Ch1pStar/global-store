import {Title, Timer, Leaderboard, Rewards} from './components/index';

export default class Tournament {

	constructor(state) {
		this.title = new Title(state);
		this.rewards = new Rewards(state.rewards);
		this.timer = new Timer(state.time);
		this.leaderboard = new Leaderboard(state.leaderboard);
	}

	update(state) {
		this.title.state = state;
		this.rewards.state = state.rewards;
		this.leaderboard.state = state.leaderboard;
		this.timer.state = state.time;
	}
}