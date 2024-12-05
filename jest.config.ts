import { getJestProjects } from '@nx/jest';

export default {
  projects: getJestProjects(),
  testEnvironment: 'jest-fixed-jsdom'
};
