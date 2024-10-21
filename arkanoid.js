import { clamp } from "./helpers.js";

class Ball {
    constructor(radius, x, y, dx, dy) {
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        ctx.fill();
    }

    motion(map, plank) {
        // Top wall collision
        if (this.y + this.dy - this.radius < 0) { 
            this.dy = -this.dy;
        }

        // Block collision
        for (let blockNumber = 0; blockNumber < map.blocks.length; blockNumber++) {
            let dyChanged = false;
            if (game.collision(map.blocks[blockNumber], this)) {
                if (!dyChanged)
                    this.dy = -this.dy;

                map.blocks.splice(blockNumber,1);
                game.score += 1;
            }
        }

        // Plank
        if (game.collision(plank, this) && this.dy > 0) {
            this.dy = -this.dy
            this.dx = (this.x - (plank.x + plank.width/2))* 0.04;
        }

        // Sides walls
        if (this.x + this.dx + this.radius > canvas.width || this.x + this.dx - this.radius < 0) {
            this.dx = -this.dx;
        }

        this.x += this.dx;
        this.y += this.dy;
    }
}

class Plank {
    constructor(width, height, x, y) {
        this.width = width, //100,
        this.height = height,// 20,
        this.x = x, //canvas.width / 2 - this.width / 2;
        this.y = y, //canvas.height - this.height;
        this.vx = 0;
        this.moving = false;
        this.start;

    }

    draw(ctx, canvasHeight) {
        ctx.fillRect(this.x, canvasHeight - this.height, this.width, this.height);
    }

    move(elapsed) {
        this.x = clamp(this.x + elapsed * this.vx * 0.7, 0, canvas.width - this.width);
    }

    startMotion(direction) {
        this.moving = true;
        this.vx = direction === "right" ? 1 : -1;
    }

    stopMotion() {
        this.moving = false;
        this.vx = 0;
    }

    // Getters
    getX() { return this.x; }
    getY() { return this.y; }
    getWidth() { return this.width; }
    getHeight() { return this.height; }
    isMoving() { return this.moving; }
}

class Block {
    constructor(x, y, width, height) {
        this.x = x,
        this.y = y,
        this.width = width,
        this.height = height
    }

    draw(ctx) {
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}


class Map {    
    constructor(canvasWidth) {
        this.blocks = [];
        this.map = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1]
        ]

        for (let lineNumber = 0; lineNumber < this.map.length; lineNumber++) {
            let width = canvasWidth / this.map[lineNumber].length;
            let height = 20;
            for (let columnNumber = 0; columnNumber < this.map[lineNumber].length; columnNumber++) {
                if (this.map[lineNumber][columnNumber] == 1)
                    this.blocks.push(new Block(columnNumber * width, lineNumber * height, width, height));
            }
        }
    }

    draw(ctx) {
        for (let block of this.blocks) {
            block.draw(ctx);
        }
    }
}

class Game {
    constructor(canvas) { 
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.plank = new Plank(150, 20, canvas.width / 2 - 150 / 2, canvas.height - 20);
        this.ball = new Ball(5, canvas.width / 2, canvas.height / 2, 0, 9);
        this.map = new Map(canvas.width);
        
        this.score = 0;
        this.gameOver = false;
    }
    
    render = () => { // Arrow function pour utilsé l'object englobant en tant que "this"
        if (this.ball.y + this.ball.radius < this.plank.y + Math.abs(this.ball.dy)) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.ball.motion(this.map, this.plank);

            this.map.draw(this.ctx);
            this.ball.draw(this.ctx);
            this.plank.draw(this.ctx, this.canvas.height);

        } else {
            game.gameOver = true;
        }

        const score = document.getElementById("score");
        score.innerText = game.score;
    }

    collision(rectangle, circle) {
        // Distance between center of circle and center of rectangle
        let xDist = Math.abs((rectangle.x + rectangle.width / 2) - circle.x);
        let yDist = Math.abs((rectangle.y + rectangle.height / 2) - circle.y);

        // Check xDist and yDist compare to crircle radius and rectangle dimensions
        if (xDist <= circle.radius + rectangle.width / 2 && yDist <= circle.radius + rectangle.height / 2)
            return true;
        else
            return false;
    }

    updatePlank(timestamp) {
        if (this.plank.isMoving()) {
            if (!this.lastTimestamp) {
                this.lastTimestamp = timestamp;
            }
            const elapsed = timestamp - this.lastTimestamp;
            this.plank.move(elapsed);
            this.lastTimestamp = timestamp;

            requestAnimationFrame(this.updatePlank.bind(this));
        } else {
            this.lastTimestamp = null;
        }
    }

    handleKeyDown(event) {
        if (event.key === "ArrowRight" || event.key == "ArrowLeft") {
            this.plank.startMotion(event.key === "ArrowRight" ? "right" : "left");
            requestAnimationFrame(this.updatePlank.bind(this));
        }
    }
    
    handleKeyUp(event) {
        if (event.key === "ArrowRight" || event.key == "ArrowLeft") {
            this.plank.stopMotion();
        }  
    }

}

// Boucle principale
var canvas = document.getElementById("arkanoid");
var game = new Game(canvas);

setInterval(game.render, 17)

//Plank mouvements
addEventListener("keydown", game.handleKeyDown.bind(game));
addEventListener("keyup", game.handleKeyUp.bind(game));

// Export for test
export { Game, Plank, Ball };