import { clamp } from './helpers.js';
import levels from './assets/json/levels.json' with { type: 'json' };
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
	}

	draw (ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
		ctx.fillStyle = 'black';
		ctx.fill();
		ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
		ctx.shadowBlur = 10;
		ctx.shadowOffsetX = -this.dx / 30;
		ctx.shadowOffsetY = -this.dy / 30;
		ctx.fill();
		ctx.shadowColor = 'transparent'; // Reset shadow
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
	}

	draw (ctx, canvasHeight) {
		ctx.fillRect(this.x, canvasHeight - this.height, this.width, this.height);
	}

	move (elapsed, canvasWidth) {
		this.x = clamp(this.x + elapsed * this.vx * 0.9, 0, canvasWidth - this.width);
	}

	startMotion (direction) {
		this.moving = true;
		this.vx = direction === 'right' ? 1 : -1;
	}

	stopMotion () {
		this.moving = false;
		this.vx = 0;
	}

	// Getters
	getX () { return this.x; }
	getY () { return this.y; }
	getWidth () { return this.width; }
	getHeight () { return this.height; }
	isMoving () { return this.moving; }
}

class Block {
	constructor (x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	draw (ctx) {
		ctx.strokeRect(this.x, this.y, this.width, this.height);
	}
}

class Map {
	constructor (canvasWidth, canvasHeight, mapTemplate) {
		this.blocks = [];
		this.mapTemplate = mapTemplate;

		for (let lineNumber = 0; lineNumber < this.mapTemplate.length; lineNumber++) {
			const width = canvasWidth / this.mapTemplate[lineNumber].length;
			const height = Math.round(canvasHeight / 20);
			for (let columnNumber = 0; columnNumber < this.mapTemplate[lineNumber].length; columnNumber++) {
				if (this.mapTemplate[lineNumber][columnNumber] === 1) { this.blocks.push(new Block(columnNumber * width, lineNumber * height, width, height)); }
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

		this.map = null;
		this.plank = null;
		this.ball = null;

		this.level = { levelNumber: 0 };

		this.initGame();
	}

	initGame () {
		this.initNextLevel(this.level.levelNumber);

		this.map = new Map(this.canvas.width, this.canvas.height, this.level.map);

		const plankWidth = this.canvas.width * this.level.paddleWidthRation;
		const plankHeight = this.canvas.height * this.level.paddleHeightRation;
		const plankX = this.canvas.width / 2 - plankWidth / 2;
		const plankY = this.canvas.height - plankHeight;
		this.plank = new Plank(plankWidth, plankHeight, plankX, plankY);

		const ballRadius = plankHeight;
		const ballX = this.canvas.width / 2;
		const ballY = this.canvas.height - plankHeight - ballRadius;
		const ballDx = 0;
		const ballDy = 0;
		this.ball = new Ball(ballRadius, ballX, ballY, ballDx, ballDy);

		this.gameInProgress = false;
	}

	initNextLevel (currentLevelNumber) {
		const nextLevelName = 'lv' + (currentLevelNumber + 1);
		this.level = new Level(levels[nextLevelName]);
	}

	start () {
		if (!this.gameInProgress) {
			this.ball.dx = Math.random() * 3;
			this.ball.dy = -Math.sqrt(this.level.ballSpeed - this.ball.dx ** 2);
			this.gameInProgress = true;
		}
	}

	render () {
		if (this.ball.y + this.ball.radius <= this.plank.y) {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

			this.motion(this.map, this.plank);

			this.map.draw(this.ctx);
			this.ball.draw(this.ctx);
			this.plank.draw(this.ctx, this.canvas.height);
		} else {
			this.gameInProgress = false;
		}
	}

	motion () {
		// Top wall collision
		if (this.ball.y + this.ball.dy - this.ball.radius < 0) {
			this.ball.dy = -this.ball.dy;
		}

		// Block collision
		for (let blockNumber = 0; blockNumber < this.map.blocks.length; blockNumber++) {
			const dyChanged = false;
			if (this.collision(this.map.blocks[blockNumber], this.ball)) {
				if (!dyChanged) { this.ball.dy = -this.ball.dy; }

				this.map.blocks.splice(blockNumber, 1);
			}
		}

		// Plank
		if (this.collision(this.plank, this.ball) && this.ball.dy > 0) {
			this.ball.dy = -this.ball.dy;
			this.ball.dx = (this.ball.x - (this.plank.x + this.plank.width / 2)) * 0.04;
		}

		// Sides walls
		if (this.ball.x + this.ball.dx + this.ball.radius > this.canvas.width || this.ball.x + this.ball.dx - this.ball.radius < 0) {
			this.ball.dx = -this.ball.dx;
		}

		this.ball.x += this.ball.dx;
		this.ball.y += this.ball.dy;
	}

	collision (rectangle, circle) {
		// Distance between center of circle and center of rectangle
		const xDist = Math.abs((rectangle.x + rectangle.width / 2) - circle.x);
		const yDist = Math.abs((rectangle.y + rectangle.height / 2) - circle.y);

		// Check xDist and yDist compare to crircle radius and rectangle dimensions
		if (xDist <= circle.radius + rectangle.width / 2 && yDist <= circle.radius + rectangle.height / 2) { return true; } else { return false; }
	}

	updatePlank (timestamp) {
		if (this.plank.isMoving()) {
			if (!this.lastTimestamp) {
				this.lastTimestamp = timestamp;
			}
			const elapsed = timestamp - this.lastTimestamp;
			this.plank.move(elapsed, this.canvas.width);

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

	// Plank mouvements
	addEventListener('keydown', game.handleKeyDown.bind(game));
	addEventListener('keyup', game.handleKeyUp.bind(game));
});

// // Export for test
export { Game, Plank, Ball };
