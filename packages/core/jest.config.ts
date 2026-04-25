/* eslint-disable */
export default {
  displayName: 'core',
  preset: '../../jest.preset.js',
  setupFiles: [
    'dotenv/config'
  ],
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json'
      }
    ]
  },
  // Add https-proxy-agent|agent-base for test with jest
  transformIgnorePatterns: ['node_modules/(?!(https-proxy-agent|agent-base)/)'],
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/packages/core',
  testEnvironment: 'node'
};
