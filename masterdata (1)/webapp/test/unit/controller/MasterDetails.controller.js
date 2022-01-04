
sap.ui.define([
    "sap/ui/base/ManagedObject",
    "com/apple/scp/masterdata/controller/MasterDetails.controller",
    "sap/ui/core/mvc/Controller"
], function (ManagedObject, Controller, aController) {
    "use strict";
    QUnit.module("MasterDetails Controller", {
        beforeEach: function () {
            this.oMDetailsController = new Controller();
        },
        afterEach: function () {
            this.oMDetailsController.destroy();
        }
    });

    QUnit.test("MasterDetails controller Load", function (assert) {
        this.oMDetailsController = new Controller();
        assert.ok(this.oMDetailsController);

        //Check for onInit
        // Arrange
        var oViewStub = new ManagedObject({});

        var oRouterStub = new sap.m.routing.Router([
            {
                "name": "MasterData",
                "pattern": "",
                "target": [
                    "MasterData"
                ]
            },
            {
                "name": "MasterDetails",
                "pattern": "MasterDetails/{MPN}",
                "target": [
                    "MasterDetails"
                ]
            }
        ]);
        var oGetViewStub = sinon.stub(aController.prototype, "getView").returns(oViewStub);
        var oGetRouterStub = sinon.stub(this.oMDetailsController, "getRouter").returns(oRouterStub);

        // action
        this.oMDetailsController.onInit();

        // assertions
        assert.ok(this.oMDetailsController.oBusyDialog);

        //CleanUp
        oGetViewStub.restore();
        oGetRouterStub.restore();
    });

    QUnit.test("navigateToHome function test", function (assert) {
        var oRouter = new sap.m.routing.Router([
            {
                "name": "MasterData",
                "pattern": "",
                "target": [
                    "MasterData"
                ]
            },
            {
                "name": "MasterDetails",
                "pattern": "MasterDetails/{MPN}",
                "target": [
                    "MasterDetails"
                ]
            }
        ]);

        //System under test
        var oGetRouterStub = sinon.stub(this.oMDetailsController, "getRouter").returns(oRouter);
        var oRouterSpy = this.stub(sap.ui.core.routing.Router.prototype, "navTo");

        //Actions
        this.oMDetailsController.navigateToHome();

        assert.strictEqual(oRouterSpy.callCount, 1, "Router navigation method to be called");

        //CleanUp
        oGetRouterStub.restore();
        oRouterSpy.restore();
    });


});