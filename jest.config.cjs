module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/backend/tests/**/*.test.js'],
  collectCoverageFrom: ['backend/src/**/*.js', '!backend/src/server.js', '!backend/src/cli.js'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov']
};
