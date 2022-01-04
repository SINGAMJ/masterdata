/*global QUnit*/

sap.ui.define([
    "com/apple/scp/masterdata/controller/MasterData.controller",
    "sap/ui/core/mvc/View",
    "sap/ui/core/mvc/Controller",
    "sap/ui/comp/smartfilterbar/SmartFilterBar",
    "sap/ui/comp/smarttable/SmartTable"
], function (Controller, ManagedObject, aController, sFB, sTable) {
    "use strict";

    QUnit.module("MasterData Controller", {
        beforeEach: function () {
            this.oController = new Controller();
        },
        afterEach: function () {
            this.oController.destroy();
        }
    });

    QUnit.test("MasterData controller Load", function (assert) {
        this.oController.onInit();
        assert.ok(this.oController);
    });

    QUnit.test("Smart Table search test", function (assert) {
        //Arrange
        var oSTable = new sTable("masterSmartTable");
        var oViewStub = new ManagedObject({});
        var oSTableSpy = this.stub(sap.ui.comp.smarttable.SmartTable.prototype, "rebindTable");
        var oGetViewStub = sinon.stub(aController.prototype, "getView").returns(oViewStub);
        var oSTableStub = sinon.stub(ManagedObject.prototype, "byId").returns(oSTable);

        //Act
        this.oController.onSearch();

        //Assert
        assert.strictEqual(oSTableSpy.callCount, 1, "Smart Table rebindTable event to be triggered");

        //CleanUp
        oSTableSpy.restore();
        oSTableStub.restore();
        oGetViewStub.restore();
    });

    QUnit.test("Smart Filter Bar clear test", function (assert) {
        //Arrange
        var oSFB = new sFB("smartFilterBar");
        var oViewStub = new ManagedObject({});
        var oSFBSpy = this.stub(sap.ui.comp.smartfilterbar.SmartFilterBar.prototype, "clear");
        var oGetViewStub = sinon.stub(aController.prototype, "getView").returns(oViewStub);
        var oSFBStub = sinon.stub(ManagedObject.prototype, "byId").returns(oSFB);

        //Act
        this.oController.onClear();

        //Assert
        assert.strictEqual(oSFBSpy.callCount, 1, "Smart Filter Bar clear to be triggered");

        //CleanUp
        oSFBSpy.restore();
        oSFBStub.restore();
        oGetViewStub.restore();
    });

});
