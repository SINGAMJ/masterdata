
sap.ui.define([
    "com/apple/scp/masterdata/controller/BaseController",
    "sap/ui/core/UIComponent",
    "sap/ui/thirdparty/sinon",
    "sap/ui/thirdparty/sinon-qunit"
], function (Controller, UIComponent) {
    "use strict";
    QUnit.module("Base Controller", {
        beforeEach: function () {
            this.oBaseController = new Controller();
        },
        afterEach: function () {
            this.oBaseController.destroy();
        }
    }
    );

    QUnit.test("Base controller Load", function (assert) {
        assert.ok(this.oBaseController);
    });

    QUnit.test("Should return the router", function(assert){
         // Arrange
         var olocalRouter = new sap.m.routing.Router([
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
         
         var oCompStub = sinon.stub(UIComponent, "getRouterFor").returns(olocalRouter);
         var aRouter = this.oBaseController.getRouter();
         assert.strictEqual(aRouter, olocalRouter, "Router bound to be returned" );
         oCompStub.restore();

    });

});
