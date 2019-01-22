module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.(tsx|ts)?$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      tsConfig: "<rootDir>/tsconfig.test.json",
      // This is so ts-jest doesn't try and run the component in the context of the whole app
      isolatedModules: true,
      diagnostics: {
        // Only run diagnostics on our jest test files
        pathRegex: ".*\\.jest.test\\.tsx?$",
        warnOnly: true
      },
      window: true
    }
  },
  testEnvironment: "node",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec|unit))\\.(tsx|ts)?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupTestFrameworkScriptFile: "<rootDir>/src/setupEnzyme.ts"
};
