export default {
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  // extensionsToTreatAsEsm: ['.js'],
  testEnvironment: 'jest-environment-jsdom',
};