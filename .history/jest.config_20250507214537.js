/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "jsdom",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["scr/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    // Ignore CSS files
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};