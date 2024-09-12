import { clamp } from "./helpers.js";

var canvas = document.getElementById("arkanoid");
var ctx = canvas.getContext('2d');

class Ball {
    constructor() {
        this.radius = 5,
            this.x = canvas.width / 2,
            this.y = canvas.height / 2,
            this.dx = 0,
            this.dy = 7
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        ctx.fill();
    }

    motion() {
        // Top wall collision
        if (this.y + this.dy - this.radius < 0) { 
            this.dy = -this.dy;
        }

        // Block collision
        for (let blockNumber = 0; blockNumber < map.blocks.length; blockNumber++) {
            let dyChanged = false;
            if (game.collision(map.blocks[blockNumber], this) && this.dy < 0) {
                if (!dyChanged)
                    this.dy = -this.dy;

                map.blocks.splice(blockNumber,1);
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
    constructor() {
        this.width = 100,
            this.height = 20,
            this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height;
        this.vx = 0;
        this.moving = false;
        this.start;

    }

    draw() {
        ctx.fillRect(this.x, canvas.height - this.height, this.width, this.height);
    }

    motion(timestamp) {
        if (plank?.start == undefined) {
            plank.start = timestamp;
        }

        const elapsed = timestamp - plank.start;
        plank.x = clamp(plank.x + elapsed*plank.vx*0.08, 0, canvas.width-plank.width);

        ctx.clearRect(0, canvas.height - plank.height, canvas.width, plank.height);
        plank.draw();
        
        if (plank.moving) {
            requestAnimationFrame(plank.motion);
        }
    }

    startMotion(key) {
        if (!this.moving) {
            if (key == "ArrowRight") {
                this.vx = 1;
            } else {
                this.vx = -1;
            }
            this.moving = true;
            this.start = null;
            requestAnimationFrame(this.motion);
        }
    }

    stopMotion() {
        this.moving = false;
    }
}

class Block {
    constructor(x, y, width, height) {
        this.x = x,
            this.y = y,
            this.width = width,
            this.height = height
    }

    draw() {
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}


class Map {    
    constructor() {
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
            let width = canvas.width / this.map[lineNumber].length;
            let height = 20;
            for (let columnNumber = 0; columnNumber < this.map[lineNumber].length; columnNumber++) {
                if (this.map[lineNumber][columnNumber] == 1)
                    this.blocks.push(new Block(columnNumber * width, lineNumber * height, width, height));
            }
        }
    }

    draw() {
        for (let block of this.blocks) {
            block.draw();
        }
    }
}

class Game {
    render() {
        if (ball.y + ball.radius < plank.y + Math.abs(ball.dy)) {
            ctx.clearRect(0, 0, canvas.width, canvas.height - plank.height);

            ball.motion();

            map.draw();
            ball.draw();
        }
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
}

var plank = new Plank();
var ball = new Ball();
var map = new Map();

var game = new Game();

setInterval(game.render, 17)

addEventListener("keydown", handleKeyDown);
addEventListener("keyup", handleKeyUp)

function handleKeyDown(event) {
    if (event.key === "ArrowRight" || event.key == "ArrowLeft") {
        plank.startMotion(event.key);
    }
}

function handleKeyUp(event) {
    if (event.key === "ArrowRight" || event.key == "ArrowLeft") {
        plank.stopMotion();
    }  
}