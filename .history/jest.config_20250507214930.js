/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "jsdom",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
  moduleNameMapper: {
    // 👇 Tells Jest to mock CSS/SCSS/LESS/SASS files
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};