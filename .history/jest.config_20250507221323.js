/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "jsdom",
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
  
  moduleNameMapper: {

    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};