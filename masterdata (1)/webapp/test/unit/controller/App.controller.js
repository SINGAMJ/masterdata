/*global QUnit*/

sap.ui.define([
    "com/apple/scp/masterdata/controller/App.controller"
], function (Controller) {
    "use strict";

    QUnit.module("App Controller");

    QUnit.test("App controller Load", function (assert) {
        var oAppController = new Controller();
        oAppController.onInit();
        assert.ok(oAppController);
        
        oAppController.destroy();
    });

});
