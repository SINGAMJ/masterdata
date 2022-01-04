/*global QUnit*/

sap.ui.define([
    "sap/ui/test/opaQunit",
    "sap/ui/test/Opa5",
    "./pages/App",
    "./pages/MasterData",
    "./pages/MasterDetails"
], function (opaTest,Opa5) {
    "use strict";

    QUnit.module("Navigation Journey");

    function jsonOk(body) {
        var mockResponse = new window.Response(JSON.stringify(body), { //the fetch API returns a resolved window Response object
            status: 200,
            headers: {
                'Content-type': 'application/json'
            }
        });

        return Promise.resolve(mockResponse);
    };

    opaTest("Should see the initial page of the app", function (Given, When, Then) {
        // Arrangements
        let stub = sinon.stub(window, 'fetch'); //add stub
        stub.onCall(0).returns(jsonOk({ "AppID": '123' }));
        Given.iStartMyApp();

        // Assertions
        Then.onTheAppPage.iShouldSeeTheApp();
        // Then.onTheMaterialPage.iShouldSeeMaterialPage();

        //Cleanup
        Then.iTeardownMyApp();
    });

    opaTest("Should navigate to Material Details page and back to Material page", function (Given, When, Then) {
        // Arrangements
        Given.iStartMyAppInAFrame("../../index.html?responderOn=true").done(function () {
            Opa5.assert.ok(document.getElementById("OpaFrame"), "The frame to be loaded");
        });

        //Actions & Assertions
        When.onTheMaterialPage.iClickOnSearchAndTableItemByFieldValue("MA591G/C");
        Then.onTheMaterialDetailsPage.iShouldSeeTheMaterialDetails();
        When.onTheMaterialDetailsPage.iClickOnBack();
        Then.onTheMaterialPage.iShouldSeeMaterialPage();

        Then.iTeardownMyAppFrame();
    });

});
