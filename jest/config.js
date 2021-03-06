module.exports = {
  rootDir: process.cwd(),
  transform: {
    '^.+\\.jsx?$': `<rootDir>/jest/preprocess.js`
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/jest/__mocks__/file_mock.js`
  },
  testPathIgnorePatterns: [`node_modules`, `.cache`, `public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: { __PATH_PREFIX__: `` },
  setupFiles: [`<rootDir>/jest/loadershim.js`],
  setupFilesAfterEnv: [`<rootDir>/jest/setup.js`]
}
