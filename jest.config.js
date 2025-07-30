/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)$": ["@swc/jest"],
  },
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  moduleFileExtensions: ["ts", "js", "json"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
