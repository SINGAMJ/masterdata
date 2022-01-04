sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "com/apple/scp/masterdata/formatter/formatter",
], function (BaseController, JSONModel, formatter) {
    "use strict";

    return BaseController.extend("com.apple.scp.masterdata.controller.MasterDetails", {
        formatter: formatter,
        onInit: function () {
            this.oBusyDialog = new sap.m.BusyDialog();
            var oRouter = this.getRouter();
            oRouter.getRoute("MasterDetails").attachMatched(this.onRouteMatched, this);
        },
        onRouteMatched: function (oEvent) {
            this.oBusyDialog.open();
            var oArgs = oEvent.getParameter("arguments");
            var MPN = decodeURIComponent(oArgs.MPN);
            this.headerData(MPN);

        },
        headerData: function (MPN) {
            var that = this;
            var oMPNFilter = new sap.ui.model.Filter("Material", sap.ui.model.FilterOperator.EQ, MPN);
            var sPath = "/MasterDataDetails";
            this.oDataModel = this.getOwnerComponent().getModel();
            var oPromise = new Promise(function (resolve, reject) {
                that.oDataModel.read(sPath, {
                    filters: [oMPNFilter],
                    success: function (oData) {
                        resolve(oData);
                    },
                    error: function (oError) {
                        reject(oError);
                    }
                });
            });
            oPromise.then(function (oData) {
                var oModel = new JSONModel(oData);
                that.getView().setModel(oModel, "masterModel");
                that.oBusyDialog.close();
            }, function (oError) {
                that.oBusyDialog.close();
            });
        },
        navigateToHome: function () {
            this.getRouter().navTo("MasterData");
        },

    });
});