/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
    "use strict";

    sap.ui.require([
        "com/apple/scp/masterdata/test/integration/AllJourneys"
    ], function () {
        QUnit.config.testTimeout = 120000;
        QUnit.start();
    });
});
