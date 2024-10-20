import { Game, Plank, Ball, CANVAS_WIDTH, CANVAS_HEIGHT } from './arkanoid.js';

// Simulation du DOM pour Jest
document.body.innerHTML = `
  <div id="score"></div>
  <canvas id="arkanoid" width="${CANVAS_WIDTH}" height="${CANVAS_HEIGHT}"></canvas>
`;

const canvas = document.getElementById("arkanoid");
const ctx = canvas.getContext('2d');

const positions = [
    { ballRadius: 10, plankWidth: 150, plankHeight: 20,  ballX: 200, ballY: 300, plankX: 180, plankY: 350, expectedResult: false },
    { ballRadius: 10, plankWidth: 150, plankHeight: 20,  ballX: 200, ballY: 680, plankX: 180, plankY: 350, expectedResult: true },
    { ballRadius: 10, plankWidth: 150, plankHeight: 20,  ballX: 170, ballY: 670, plankX: 180, plankY: 350, expectedResult: false },
    { ballRadius: 10, plankWidth: 150, plankHeight: 20,  ballX: 190, ballY: 672, plankX: 180, plankY: 350, expectedResult: true },
    { ballRadius: 10, plankWidth: 150, plankHeight: 20,  ballX: 190, ballY: 672, plankX: 10, plankY: 100, expectedResult: false },
    { ballRadius: 10, plankWidth: 150, plankHeight: 20,  ballX: 190, ballY: 320, plankX: 10, plankY: 300, expectedResult: false },
    { ballRadius: 10, plankWidth: 150, plankHeight: 20,  ballX: 130, ballY: 310, plankX: 10, plankY: 300, expectedResult: true },
];

test.each(positions)(
    'Test collision between ball and plank',
    ({ ballRadius, plankWidth, ballX, ballY, plankX, plankY, expectedResult }) => {
        const game = new Game(ctx);
        const ball = new Ball(ballRadius, CANVAS_WIDTH, CANVAS_HEIGHT);
        const plank = new Plank(plankWidth, plankHeight);

        // Set custom positions for ball and plank
        ball.x = ballX;
        ball.y = ballY;
        plank.x = plankX;
        plank.y = plankY;

        // Test collision
        const result = game.collision(plank, ball);

        // Assertion
        expect(result).toBe(expectedResult);
    }
);
