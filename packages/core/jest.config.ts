/* eslint-disable */
export default {
  displayName: 'core',
  preset: '../../jest.preset.js',
  setupFiles: [
    'dotenv/config'
  ],
  globals: {
    fetch: global.fetch
  },
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/packages/core',
};
