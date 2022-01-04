sap.ui.define([
    "sap/ui/test/Opa5",
    "./arrangements/Startup",
    "./NavigationJourney",
    "./SearchJourney"
], function (Opa5, Startup) {
    "use strict";

    Opa5.extendConfig({
        arrangements: new Startup(),
        viewNamespace: "com.apple.scp.masterdata.view.",
        autoWait: true,
        timeout: 90
    });
});
