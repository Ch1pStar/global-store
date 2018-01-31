import {Title, Rewards, Timer, Leaderboard} from './index';

export default class Tournament {

	constructor(state) {
		this.visible = true;

		this.title = new Title(state);
		this.rewards = new Rewards(state.rewards);
		this.timer = new Timer(state.time);
		this.leaderboard = new Leaderboard(state.leaderboard);

		this.render();
	}

	update(state) {
		this.title.state = state;
		this.title.dirty = true;

		this.rewards.state = state.rewards;
		this.rewards.dirty = true;

		this.leaderboard.state = state.leaderboard;
		this.leaderboard.dirty = true;

		this.timer.state = state.time;
		this.timer.dirty = true;

		this.render();
	}


	render() {
		if(this.title.dirty) this.title.render();
		if(this.rewards.dirty) this.rewards.render();
		if(this.timer.dirty) this.timer.render();
		if(this.leaderboard.dirty) this.leaderboard.render();
	}
}