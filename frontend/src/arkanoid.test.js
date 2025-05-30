import 'jest-canvas-mock';
import { Ball, Game, Plank } from './arkanoid.js';

global.Audio = jest.fn().mockImplementation(() => ({
	load: jest.fn(),
	play: jest.fn(),
	pause: jest.fn()
}));

document.body.innerHTML = `
  <div id="score"></div>
  <canvas id="arkanoid" width="500" height="700"></canvas>
  <div id="scoreValue"></div>
  <div id="highScoreValue"></div>
  <div id="levelValue"></div>
`;

const canvas = document.getElementById('arkanoid');

describe('Arkanoid', () => {
	describe('collision()', () => {
		const positions = [
			{
				description: 'should not detect collision when ball is far from plank',
				ballRadius: 10,
				plankWidth: 150,
				plankHeight: 20,
				ballX: 200,
				ballY: 300,
				plankX: 180,
				plankY: 350,
				expectedResult: false
			},
			{
				description: 'should not detect collision when ball is below plank',
				ballRadius: 10,
				plankWidth: 150,
				plankHeight: 20,
				ballX: 170,
				ballY: 670,
				plankX: 180,
				plankY: 350,
				expectedResult: false
			},
			{
				description: 'should not detect collision when ball is at different position',
				ballRadius: 10,
				plankWidth: 150,
				plankHeight: 20,
				ballX: 190,
				ballY: 672,
				plankX: 10,
				plankY: 100,
				expectedResult: false
			},
			{
				description: 'should not detect collision when ball is above plank',
				ballRadius: 10,
				plankWidth: 150,
				plankHeight: 20,
				ballX: 190,
				ballY: 320,
				plankX: 10,
				plankY: 300,
				expectedResult: false
			},
			{
				description: 'should detect collision when ball intersects with plank',
				ballRadius: 10,
				plankWidth: 150,
				plankHeight: 20,
				ballX: 130,
				ballY: 310,
				plankX: 10,
				plankY: 300,
				expectedResult: true
			}
		];

		test.each(positions)(
			'$description',
			({ ballRadius, plankWidth, plankHeight, ballX, ballY, plankX, plankY, expectedResult }) => {
				const game = new Game(canvas);
				const ball = new Ball(ballRadius, ballX, ballY, 0, 0);
				const plank = new Plank(plankWidth, plankHeight, plankX, plankY);

				const result = game.collision(plank, ball);

				expect(result).toBe(expectedResult);
			}
		);
	});
});
