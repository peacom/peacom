/* eslint-disable */
export default {
  displayName: 'model',
  preset: '../../jest.preset.js',
  setupFiles: [
    'dotenv/config'
  ],
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }]
  },
  transformIgnorePatterns: ['node_modules/(?!(https-proxy-agent|agent-base|uuid)/)'],
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/packages/model'
};
