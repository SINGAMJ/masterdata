sap.ui.define([
    "sap/ui/test/Opa5",
    "sap/ui/test/actions/Press",
    "sap/ui/test/matchers/Properties"
], function (Opa5, Press, Properties) {
    "use strict";
    var sViewName = "MasterDetails";
    Opa5.createPageObjects({
        onTheMaterialDetailsPage: {

            actions: {
                iClickOnBack: function () {
                    return this.waitFor({
                        id: "idBack",
                        viewName: sViewName,
                        actions: new Press(),
                        errorMessage: "Back button not found"
                    });
                }
            },

            assertions: {
                iShouldSeeTheMaterialDetails: function () {
                    return this.waitFor({
                        viewName: sViewName,
                        success: function () {
                            Opa5.assert.ok(true, "The " + sViewName + " view is displayed");
                        },
                        errorMessage: "Did not find the " + sViewName + " view"
                    });
                }
            }
        }
    });

});
