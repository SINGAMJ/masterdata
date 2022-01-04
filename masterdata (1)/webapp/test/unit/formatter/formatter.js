/*global QUnit*/

sap.ui.require([
    "com/apple/scp/masterdata/formatter/formatter"
],
    function (formatter) {
        "use strict";

        QUnit.module("Formatting functions");

        function dateFormatTestCase(assert, sValue, fExpectedDate) {
            var msg = "The date format expected was " + fExpectedDate;
            var fDate = formatter.formatDate(sValue);
            assert.strictEqual(fDate, fExpectedDate, msg);
        }

        QUnit.test("Should return correct formatted Date", function (assert) {
            dateFormatTestCase.call(this, assert, "20000101", "Jan 01 , 2000");
            dateFormatTestCase.call(this, assert, "20120828", "Aug 28 , 2012");
            dateFormatTestCase.call(this, assert, "19901231", "Dec 31 , 1990");
        });

        QUnit.test("Invalid Date test", function (assert){
            dateFormatTestCase.call(this, assert, "20000199", "20000199");
            dateFormatTestCase.call(this, assert, undefined, undefined);
        });

    }
);