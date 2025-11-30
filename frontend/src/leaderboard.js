import './arkanoid.css';

let config = null;

async function loadConfig () {
	config = await fetch('/config.json').then(r => r.json());
}

function getUrl (endpoint) {
	return config.API_BASE_URL + endpoint;
}

function getRank (ordrer) {
	switch (ordrer) {
		case 0:
			return '1ST';
		case 1:
			return '2ND';
		case 2:
			return '3RD';
		default:
			return ordrer + 'TH';
	}
}

function addLeadersToLeaderBoard (leaders) {
	const tbody = document.querySelector('tbody');
	const template = document.querySelector('#leader-row');

	for (let i = 0; i < leaders.length; i++) {
		const leader = leaders[i];
		const clone = template.content.cloneNode(true);

		clone.querySelector('#rank').textContent = getRank(i);
		clone.querySelector('#best-score').textContent = leader.bestScore;
		clone.querySelector('#user-name').textContent = leader.userName;

		tbody.appendChild(clone);
	}
}

async function loadLeaderboard (params) {
	const leaderboardUrl = getUrl('/users/leaderBoard'); // How to manage properly my base API url ?

	try {
		const response = await fetch(leaderboardUrl);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		// Response is a promise because the body of http response is a stream of data (ReadableStream)
		const leaders = await response.json();

		// Add new rows to DOM
		addLeadersToLeaderBoard(leaders);
	} catch (error) {
		console.error(error.message);
	}
}

document.addEventListener('DOMContentLoaded', async () => {
	await loadConfig();
	loadLeaderboard();
});
