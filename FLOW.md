Bridge:
	load panel source
	load tournaments source
	new Panel
	addAssets(tournament assets)
	preload

	-------------------------------------
	on server data - panel.setState(data)

Panel:
	-> start app -> queue assets -> queue content -> start preload -> content is added and initialized when loading is done(done internally)
	-> request settings -> wait for app content to load and init -> pass settings(initial state) to app content
	-> receive new state
		this.tournaments.setState(data.tournaments)
		this.jackpots.setState(data.jackpots)
		...etc
	-> on content event(jackpot win) - if(activeTab.status != 'busy') panel.switchTo(jackpot)

Tournament:
	-> receive initial state -> start global timer -> create visual components -> render

	-> receive state update -> render

	-> internal time tick -> integrate time passed with the current state -> render
		-> tournament starts in 10 seconds - flag countdown animation -> render(plays animation)
						-> dispatch animation over action -> update state -> render

	-> enter tournament action(entry is requested to the server) -> set intermediate state -> render
		-> request response arrived -> update state -> render

	-> receive tournament is over state -> flag appropriate animation for playing in tournament state -> render(plays animation)
