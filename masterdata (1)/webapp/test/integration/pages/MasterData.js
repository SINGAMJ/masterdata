sap.ui.define([
    "sap/ui/test/Opa5",
    "sap/ui/test/actions/EnterText",
    "sap/ui/test/matchers/AggregationLengthEquals",
    "sap/ui/test/actions/Press",
    "sap/ui/test/matchers/PropertyStrictEquals"

], function (opa5, EnterText, AggregationLengthEquals, Press, PropertyStrictEquals) {
    "use strict";
    var sViewName = "MasterData";
    var sMaterialInputId = "container-masterdata---MasterData--smartFilterBar-filterItemControl_BASIC-Material";
    var sTableId = "innerTable";

    opa5.createPageObjects({
        onTheMaterialPage: {

            actions: {
                iClickOnSearchAndTableItemByFieldValue: function (fValue) {
                    return this.waitFor({
                        id: sMaterialInputId,
                        viewName: sViewName,
                        actions: [new EnterText({ text: fValue, pressEnterKey: true })],
                        success: function () {
                            this.waitFor({
                                viewName: sViewName,
                                id: "idSearch",
                                actions: new Press(),
                                success: function () {
                                    this.waitFor({
                                        controlType: "sap.m.ColumnListItem",
                                        // Retrieve all list items in the table
                                        matchers: [function (oCandidateListItem) {
                                            var oTableLine = {};
                                            oTableLine = oCandidateListItem.getBindingContext().getObject();
                                            var sFound = false;

                                            // Iterate through the list items until the specified cell is found
                                            for (var sName in oTableLine) {
                                                if ((sName === "Material") && (oTableLine[sName].toString() === fValue)) {
                                                    opa5.assert.ok(true, "Material " + fValue + " found and cicked successfully");
                                                    sFound = true;
                                                    break;
                                                }
                                            }
                                            return sFound;
                                        }],

                                        // Click on the specified item
                                        actions: new Press(),
                                        errorMessage: "Cell could not be found in the table"
                                    });
                                },
                                errorMessage: "Did not find the search Button"
                            });
                        },
                        errorMessage: "The Material Number cannot be entered"
                    });
                },

                iEnterMaterialForSearchAndPressEnter: function (matNum) {
                    return this.waitFor({
                        id: sMaterialInputId,
                        viewName: sViewName,
                        actions: [new EnterText({ text: matNum, pressEnterKey: true })],
                        errorMessage: "The Material Number cannot be entered"
                    });
                }
            },

            assertions: {
                iShouldSeeMaterialPage: function () {
                    return this.waitFor({
                        viewName: sViewName,
                        success: function () {
                            opa5.assert.ok(true, "The " + sViewName + " view is displayed");
                        },
                        errorMessage: "Did not find the " + sViewName + " view"
                    });
                },

                iShouldSeeItemCount: function (iItemCount) {
                    return this.waitFor({
                        id: sTableId,
                        viewName: sViewName,
                        matchers: [new AggregationLengthEquals({
                            name: "items",
                            length: iItemCount
                        })],
                        success: function () {
                            opa5.assert.ok(true, "The table has " + iItemCount + " item(s)");
                        },
                        errorMessage: "Table does not have expected number of items '" + iItemCount + "'."
                    });
                }

            }
        }
    });

});
