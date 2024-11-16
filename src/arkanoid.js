import { clamp } from './helpers.js';
import levels from './assets/json/levels.json' with { type: 'json' };
import blocksTypes from './assets/json/blocksTypes.json' with {type: 'json'};
class Level {
	constructor ({ levelNumber, ballSpeed, paddleWidthRation, paddleHeightRation, map }) {
		this.levelNumber = levelNumber;
		this.ballSpeed = ballSpeed;
		this.paddleWidthRation = paddleWidthRation;
		this.paddleHeightRation = paddleHeightRation;
		this.map = map;
	}
}

class Ball {
	constructor (radius, x, y, dx, dy) {
		this.radius = radius;
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;

		this.ballImg = new Image();
		this.ballImg.src = './assets/images/ball.png';

		this.plankImpactSound = new Audio('./assets/sonds/plankImpact.wav');
		this.blockImpactSound = new Audio('./assets/sonds/blockImpact.wav');
		this.plankImpactSound.load();
		this.blockImpactSound.load();
	}

	draw (ctx) {
		ctx.drawImage(this.ballImg, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);

		// Shadow
		ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
		ctx.shadowBlur = 10;
		ctx.shadowOffsetX = -this.dx / 30;
		ctx.shadowOffsetY = -this.dy / 30;
		ctx.fill();
		ctx.shadowColor = 'transparent'; // Reset shadow
	}

	playPlankImpactSound () {
		this.plankImpactSound.play();
		this.plankImpactSound.currentTime = 0;
	}

	playBlockImpactSound () {
		this.blockImpactSound.play();
		this.blockImpactSound.currentTime = 0;
	}
}

class Plank {
	constructor (width, height, x, y) {
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
		this.vx = 0;
		this.moving = false;
		this.color = 'black';

		this.plankImg = new Image();
		this.plankImg.src = './assets/images/plank.png';
		this.plankImg.onload = () => {
			this.plankLoaded = true;
		};
	}

	draw (ctx, canvasHeight) {
		ctx.drawImage(this.plankImg, this.x, this.y, this.width, this.height);
	}

	move (elapsed, canvasWidth, sideMaring) {
		this.x = clamp(this.x + elapsed * this.vx * 0.9, sideMaring - 10, canvasWidth - this.width - sideMaring + 10);
	}

	startMotion (direction) {
		this.moving = true;
		this.vx = direction === 'right' ? 1 : -1;
	}

	stopMotion () {
		this.moving = false;
		this.vx = 0;
	}
}

class Block {
	constructor (x, y, width, height, color, hardness, point) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
		this.hardness = hardness;
		this.point = point;
	}

	draw (ctx) {
		ctx.beginPath();
		ctx.fillStyle = 'black';
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fill();
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.rect(this.x + 2, this.y + 2, this.width - 4, this.height - 4);
		ctx.fill();
	}
}

class Map {
	constructor (canvasWidth, canvasHeight, sideMaring, topMaring, mapTemplate) {
		this.blocks = [];
		this.mapTemplate = mapTemplate;

		for (let lineNumber = 0; lineNumber < this.mapTemplate.length; lineNumber++) {
			const width = (canvasWidth - 2 * sideMaring) / this.mapTemplate[lineNumber].length;
			const height = (canvasHeight - topMaring) / 20;

			for (let columnNumber = 0; columnNumber < this.mapTemplate[lineNumber].length; columnNumber++) {
				if (this.mapTemplate[lineNumber][columnNumber] !== 0) {
					const blockType = blocksTypes[this.mapTemplate[lineNumber][columnNumber]];

					this.blocks.push(new Block(sideMaring + columnNumber * width, topMaring + lineNumber * height, width, height, blockType.color, blockType.hardness, blockType.points));
				}
			}
		}
	}

	draw (ctx) {
		for (const block of this.blocks) {
			block.draw(ctx);
		}
	}
}

class Game {
	constructor (canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.ctx.imageSmoothingEnabled = false;

		this.gameOverSound = new Audio('./assets/sonds/gameOver.mp3');
		this.gameOverSound.load();

		this.winSound = new Audio('./assets/sonds/win.mp3');
		this.winSound.load();

		this.newLevelSound = new Audio('./assets/sonds/newLevel.mp3');
		this.newLevelSound.load();

		this.topMaring = 37;
		this.sideMaring = 37;

		this.map = null;
		this.plank = null;
		this.ball = null;

		this.gameEnded = false;
		this.remaningLifes = 2;
		this.resetScore();
		this.initLevel(1);
	}

	initLevel (levelNumber) {
		const levelName = 'lv' + (levelNumber);
		this.level = new Level(levels[levelName]);

		// Init background
		this.backgroundImg = new Image();
		this.backgroundImg.src = './assets/images/backgrounds/background' + this.level.levelNumber + '.png';
		this.backgroundImg.onload = () => {
			this.backgroundLoaded = true;
		};

		// Init map
		this.map = new Map(this.canvas.width, this.canvas.height, this.sideMaring, this.topMaring, this.level.map);

		// Init ball and plank
		this.initPlankAndBall();
		this.gameInProgress = false;
		this.displayLevelNumber();
		if (levelName !== 'lv1') this.newLevelSound.play();
	}

	initPlankAndBall () {
		const plankWidth = this.canvas.width * this.level.paddleWidthRation;
		const plankHeight = this.canvas.height * this.level.paddleHeightRation;
		const plankOffset = 50;
		const plankX = this.canvas.width / 2 - plankWidth / 2;
		const plankY = this.canvas.height - plankOffset - plankHeight;
		this.plank = new Plank(plankWidth, plankHeight, plankX, plankY);

		const ballRadius = plankHeight / 4;
		const ballX = this.canvas.width / 2;
		const ballY = this.canvas.height - plankOffset - plankHeight - ballRadius;
		const ballDx = 0;
		const ballDy = 0;
		this.ball = new Ball(ballRadius, ballX, ballY, ballDx, ballDy);
	}

	start () {
		if (!this.gameInProgress) {
			this.ball.dx = Math.random() * 5;
			this.ball.dy = -Math.sqrt(this.level.ballSpeed - this.ball.dx ** 2);
			this.gameInProgress = true;
		}
	}

	displayScore () {
		document.getElementById('scoreValue').textContent = this.score;
	}

	displayLevelNumber () {
		document.getElementById('levelValue').textContent = this.level.levelNumber;
	}

	resetScore () {
		this.score = 0;
		document.getElementById('scoreValue').textContent = this.score;
	}

	newLife () {
		this.remaningLifes -= 1;

		this.gameInProgress = false;
		this.initPlankAndBall();
	}

	drawLifes () {
		const width = 100;
		const height = 30;
		let x = this.sideMaring;
		const y = this.canvas.height - height;

		for (let i = 0; i < this.remaningLifes; i++) {
			this.ctx.drawImage(this.plank.plankImg, x, y, width, height);
			x += width;
		}
	}

	displayEndGame (text) {
		this.ctx.font = '58px MyWebFont';
		this.ctx.textAlign = 'center';
		this.ctx.fillStyle = 'black';
		this.ctx.fillText(text, this.canvas.width / 2, this.canvas.height / 2);
	}

	render () {
		if (this.gameEnded) return;

		const breakableBlocks = this.map.blocks.filter((block) => block.hardness !== -1);

		if (breakableBlocks.length === 0) {
			this.level.levelNumber++;

			if (levels['lv' + this.level.levelNumber] === undefined) { // Win
				this.gameEnded = true;

				this.displayEndGame('YOU WIN');
				this.winSound.play();
				return;
			} else { // Next level
				this.initLevel(this.level.levelNumber);
			}
		}

		if (this.ball.y + this.ball.radius <= this.plank.y) { // Pourquoi besoin de cette marge en fonction des valeur de ball.y et paddleHeightRatio?
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

			if (this.backgroundLoaded) {
				this.ctx.drawImage(this.backgroundImg, 0, 0, this.canvas.width, this.canvas.height);
			}

			this.motion(this.map, this.plank);

			this.map.draw(this.ctx);
			this.ball.draw(this.ctx);
			this.plank.draw(this.ctx, this.canvas.height);

			this.drawLifes();
		} else { // Loose
			if (this.remaningLifes > 0) {
				this.newLife();
			} else {
				this.gameEnded = true;
				this.displayEndGame('GAME OVER');
				this.gameOverSound.play();
			}
		}
	}

	motion () {
		// Top wall collision
		if (this.ball.y + this.ball.dy - this.ball.radius - this.topMaring < 0) {
			this.ball.dy = -this.ball.dy;
		}

		// Block collision
		for (let blockNumber = 0; blockNumber < this.map.blocks.length; blockNumber++) {
			const dyChanged = false;
			if (this.collision(this.map.blocks[blockNumber], this.ball)) {
				if (!dyChanged) { this.ball.dy = -this.ball.dy; }

				// Break block
				if (this.map.blocks[blockNumber].hardness !== -1) { // Breakable blocks
					this.map.blocks[blockNumber].hardness -= 1;
				}

				if (this.map.blocks[blockNumber].hardness === 0) {
					this.score += this.map.blocks[blockNumber].point;
					this.map.blocks.splice(blockNumber, 1);
					this.ball.playBlockImpactSound();
				}

				break;
			}
		}

		// Plank
		if (this.collision(this.plank, this.ball) && this.ball.dy > 0) {
			this.ball.dy = -this.ball.dy;
			this.ball.dx = (this.ball.x - (this.plank.x + this.plank.width / 2)) * 0.06;

			this.ball.playPlankImpactSound();
		}

		// Sides walls
		if (this.ball.x + this.ball.dx + this.ball.radius + this.sideMaring > this.canvas.width || this.ball.x + this.ball.dx - this.ball.radius - this.sideMaring < 0) {
			this.ball.dx = -this.ball.dx;
		}

		this.ball.x += this.ball.dx;
		this.ball.y += this.ball.dy;
	}

	collision (rectangle, circle) {
		// Distance between center of circle and center of rectangle
		const xDist = Math.abs((rectangle.x + rectangle.width / 2) - circle.x);
		const yDist = Math.abs((rectangle.y + rectangle.height / 2) - circle.y);

		// Check xDist and yDist compare to circle radius and rectangle dimensions
		if (xDist <= circle.radius + rectangle.width / 2 && yDist <= circle.radius + rectangle.height / 2) {
			return true;
		} else {
			return false;
		}
	}

	updatePlank (timestamp) {
		if (this.plank.moving) {
			if (!this.lastTimestamp) {
				this.lastTimestamp = timestamp;
			}
			const elapsed = timestamp - this.lastTimestamp;
			this.plank.move(elapsed, this.canvas.width, this.sideMaring);

			// Stick ball to plank before game start
			if (!this.gameInProgress) {
				this.ball.x = this.plank.x + this.plank.width / 2;
			}

			this.lastTimestamp = timestamp;

			requestAnimationFrame(this.updatePlank.bind(this));
		} else {
			this.lastTimestamp = null;
		}
	}

	handleKeyDown (event) {
		if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
			this.plank.startMotion(event.key === 'ArrowRight' ? 'right' : 'left');
			requestAnimationFrame(this.updatePlank.bind(this));
		}

		if (event.key === 'ArrowUp') {
			this.start();
		}
	}

	handleKeyUp (event) {
		if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
			this.plank.stopMotion();
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	// Boucle principale
	const canvas = document.getElementById('arkanoid');
	const game = new Game(canvas);

	setInterval(game.render.bind(game), (1000 / 60)); // 60 FPS

	setInterval(() => {
		if (game.gameInProgress) {
			game.displayScore();
		}
	}, 1000 / 30);

	// Plank mouvements
	addEventListener('keydown', game.handleKeyDown.bind(game));
	addEventListener('keyup', game.handleKeyUp.bind(game));
});

// Export for test
export { Game, Plank, Ball };
