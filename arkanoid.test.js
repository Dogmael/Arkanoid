import { Game, Plank, Ball } from './arkanoid.js'

import { Game, Plank, Ball } from './path/to/arkanoid.js';

// Tableau de positions [ballX, ballY, plankX, plankY, expectedResult]
const positions = [
    [100, 200, 90, 250, true],
    [150, 300, 140, 350, true], 
    [200, 400, 180, 450, false], 
    [250, 500, 230, 550, false], 
    [300, 600, 290, 650, true], 
    [350, 700, 340, 750, true], 
    [400, 800, 390, 850, false], 
    [450, 900, 440, 950, false], 
    [500, 1000, 490, 1050, true], 
    [550, 1100, 540, 1150, true]
];

test.each(positions)(
    'Test collision with Ball at (%i, %i) and Plank at (%i, %i)',
    (ballX, ballY, plankX, plankY, expected) => {
        const game = new Game();
        const ball = new Ball();
        const plank = new Plank();

        // Set custom positions for ball and plank
        ball.x = ballX;
        ball.y = ballY;
        plank.x = plankX;
        plank.y = plankY;

        // Test collision
        const result = game.collision(plank, ball);
        
        // Assertion
        expect(result).toBe(expected);
    }
);