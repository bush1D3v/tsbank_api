module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: [ "ts", "js" ],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[tj]s$",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};
