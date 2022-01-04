module.exports = function (config) {
    config.set({
        async: true,
        frameworks: ["ui5"],

        ui5: {
            failOnEmptyTestPage: true,
            configPath: "ui5-test.yaml"
        },

        browsers: ["ChromeHeadless"],

        reporters: ['progress', 'coverage'],
        preprocessors: {
            'webapp/!(test)/*.js': ['coverage'] 
        },
        coverageReporter: { type: 'lcov', dir: 'coverage', subdir: 'reports' },
        browserNoActivityTimeout: 900000,
        pingTimeout: 900000
    });

    require("karma-ui5/helper").configureIframeCoverage(config);
};