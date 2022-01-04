sap.ui.define([
    "./BaseController"
],
    function (BaseController) {
        "use strict";

        return BaseController.extend("com.apple.scp.masterdata.controller.MasterData", {
            onInit: function () {
            },
            onSearch: function () {
                this.getView().byId("masterSmartTable").rebindTable(true);
            },
            onClear: function () {
                this.getView().byId('smartFilterBar').clear();
            },
            navigateToMasterDetails: function (oEvent) {
                var bindingPath = oEvent.getSource().getBindingContextPath();
                var dataRef = oEvent.getSource().getModel().getProperty(bindingPath);
                this.getRouter().navTo("MasterDetails", {
                    MPN: encodeURIComponent(dataRef.Material)
                });
            },
        });
    });
