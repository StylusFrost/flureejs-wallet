module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'karma-typescript'],
    files: ['src/**/*.ts', 'test/**/*.ts'],
    preprocessors: {
      '**/*.ts': ['karma-typescript'],
    },
    plugins: ['karma-mocha', 'karma-typescript', 'karma-chrome-launcher', 'karma-firefox-launcher'],
    karmaTypescriptConfig: {
      bundlerOptions: {
        entrypoints: /\.spec\.ts$/,
      },
      compilerOptions:{
        esModuleInterop: true
      }
    },
    colors: true,
    reporters: ['progress', 'karma-typescript'],
    browsers: [ 'ChromeHeadless','FirefoxHeadless'],
    singleRun: true,
    concurrency: Infinity,
    // Extend timeouts for long tests
    browserDisconnectTimeout: 1000000,
    browserNoActivityTimeout: 1000000,
  })
}
