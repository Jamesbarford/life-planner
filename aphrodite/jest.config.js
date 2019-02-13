module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.(tsx|ts)?$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      tsConfig: "<rootDir>/tsconfig.test.json",
      isolatedModules: true,
      diagnostics: {
        pathRegex: ".*\\.jest.test\\.tsx?$",
        warnOnly: true
      }
    }
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec|unit))\\.(tsx|ts)?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupTestFrameworkScriptFile: "<rootDir>/src/setupEnzyme.ts"
};
