/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "jsdom",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
};