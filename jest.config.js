module.exports = {
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    moduleNameMapper: {
      '^src(.*)$': '<rootDir>/src$1',
      '\\.(eot|otf|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
      '\\.(css|less|scss|sass|po)$': 'identity-obj-proxy',
    },
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
      '^.+\\.js$': 'babel-jest',
      '\\.(jpg|jpeg|png|gif|webp|svg)$': 'jest-transform-file',
    },
    globals: {
      'ts-jest': {
        tsConfig: 'tsconfig.json',
      },
    },
    setupFiles: ['<rootDir>/src/test/setup-jest.ts'],
    testMatch: ['**/__tests__/*.+(ts|tsx|js)'],
  };
