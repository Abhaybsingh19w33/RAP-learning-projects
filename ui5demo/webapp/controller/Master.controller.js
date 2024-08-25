sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment"
],
    function (Controller, ODataModel, MessageBox, Fragment) {
        "use strict";

        return Controller.extend("nw.ui5demo.controller.Master", {
            onInit: function () {
                console.log("onInit is called");
                var oDataModel = new ODataModel("/V2/(S(lh3xqgck15u1ra0e4mhjabsu))/OData/OData.svc/");
                oDataModel.read("/Categories", {
                    success: (oData, oResponse) => {
                        console.log("OdataModel read suceess");
                        MessageBox.success("Success");

                        oData.results.forEach(element => {
                            console.log(element);
                        });

                        this.getView().setModel(oDataModel, "nwModel");
                        // sap.ui.getCore().setModel(oDataModel, "nwModel");
                        // console.log("Setting model");
                    },
                    error: (oError) => {
                        MessageBox.error("Error");
                    }
                });

                this.getView().setModel(oDataModel, "nwModel");
                console.log("Setting model");
            },
            updateData: function (oEvent) {
                MessageBox.show("Update button pressed");
            },
            createData: function (oEvent) {
                // var oDataModel = sap.ui.getCore().getModel("nwModel");
                var oDataModel = this.getView().getModel("nwModel");
                oDataModel.create("/Categories", { ID: 1, Name: "Abhay" }, {
                    headers: {
                        "Content-ID": "1"
                    },
                    success: (oData, oResponse) => {
                        MessageBox.success("Success");
                    },
                    error: (oError) => {
                        // MessageBox.error("Error");
                        MessageBox.error(oError.responseText);
                    }
                });
                // MessageBox.show("Create button pressed");
            },
            deleteData: function (oEvent) {
                MessageBox.show("Delete button pressed");
            },
            onOpenDialog: function (oEvent) {
                if (!this.pDialog) {
                    this.pDialog = sap.ui.xmlfragment("hello", "nw.ui5demo.view.fragments.HelloDialog", this);
                    this.getView().addDependent(this.pDialog);
                }
                this.pDialog.open();
            },
            onCloseDialog: function (oEvent) {
                Fragment.byId("hello", "helloDialog").close();
            }
        });
    });
