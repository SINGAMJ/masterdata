/* global QUnit */

sap.ui.define([
    "sap/ui/test/opaQunit",
    "sap/ui/test/Opa5",
    "com/apple/scp/masterdata/test/integration/pages/MasterData",
    "com/apple/scp/masterdata/test/integration/arrangements/Startup"
], function (opaTest, Opa5) {
    "use strict";

    QUnit.module("Filter and Search");

    opaTest("Should show correct item count after Material search", function (Given, When, Then) {
        // Arrangements
        Given.iStartMyAppInAFrame("../../index.html?responderOn=true").done(function () {
            Opa5.assert.ok(document.getElementById("OpaFrame"), "The frame to be loaded");
        });
        //Actions
        When.onTheMaterialPage.iEnterMaterialForSearchAndPressEnter("MA591G/C");

        // Assertions
        Then.onTheMaterialPage.iShouldSeeItemCount(1).and.iTeardownMyAppFrame();
    });

    opaTest("Should show correct item count after Material search (0)", function (Given, When, Then) {
        
        // Arrangements
        Given.iStartMyAppInAFrame("../../index.html?responderOn=true").done(function () {
            Opa5.assert.ok(document.getElementById("OpaFrame"), "The frame to be loaded");
        });
         //Actions
         When.onTheMaterialPage.iEnterMaterialForSearchAndPressEnter("MA591G/CA");
         // Assertions
         Then.onTheMaterialPage.iShouldSeeItemCount(0).and.iTeardownMyAppFrame();
    });

});