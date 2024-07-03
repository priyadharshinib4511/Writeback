"use strict";
import powerbi from "powerbi-visuals-api";

import DataView = powerbi.DataView;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import * as React from "react";
import * as ReactDOM from "react-dom";


import "./../style/visual.less";
import AppStart from "./component";

export class Visual implements IVisual {
    private target: HTMLElement;
    private reactRoot: any;
    private data: DataView

    constructor(options: VisualConstructorOptions) {
        // let dataView: DataView = options
        this.target = options.element;
        console.log("sample data", this.data)

    }

    public update(options: VisualUpdateOptions) {
        console.log("sample data 2", options.dataViews, options.dataViews[0].categorical)
        let columns = options.dataViews[0].metadata.columns

        let columnsNew = []
        columns.map((item, index) => {
            columnsNew.push({
                field: item?.displayName,
                headerName: item?.displayName,
                width: 80,
                editable: false,
            })
        })

        //adding forecasting columns

        columnsNew.push({
            field: "Forecast value 2025",
            headerName: "Forecast value 2025",
            width: 120,
            editable: true,
        })

        columnsNew.push({
            field: "Forecast % 2025",
            headerName: "Forecast % 2025",
            width: 120,
            editable: true,
        })



        let rows = options.dataViews[0].categorical.categories
        let rowsNewObject = {}
        rows.map((item1, index) => {
            item1.values.map((item, index) => {
                if (index in rowsNewObject) {
                    rowsNewObject[index][item1?.source.displayName] = item
                } else {
                    rowsNewObject[index] = { "id": index }
                    rowsNewObject[index][item1?.source.displayName] = item
                }


            })

        })

        let rowsNew = Object.keys(rowsNewObject).map(key => {
            return rowsNewObject[key];
        })

        //forecast

        rowsNew.map((item,index)=>{
            columnsNew.map((col,colI)=>{
                if(colI > 0){
                    item[col?.headerName] = (colI+1) * 200
                }
            })
        })

        rowsNew.map((item,index)=>{
            columnsNew.map((col,colI)=>{
                if(colI > columnsNew?.length - 3){
                    item[col?.headerName] = (colI-1) * 200
                }
            })
        })

        console.log("print rows", rowsNew)
        // this.reactRoot = React.createElement(DataGridDemo, { columns: columnsNew, rows: rowsNew });
        this.reactRoot = React.createElement(AppStart, { columns: columnsNew, rows: rowsNew });


        ReactDOM.render(this.reactRoot, this.target);

    }
}