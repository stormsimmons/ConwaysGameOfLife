import { GridService } from "./service/grid-service";
import { CellService } from "./service/cell-service";
import {Grid} from "./model/grid";
import {Cell} from "./model/cell";

const  cellService:CellService = new CellService();
const gridService:GridService = new GridService(cellService);

let generationIteration : any;

// public functions
   export function buildTable(): void {
        let grid:Grid = gridService.getGrid();

        const htmlDiv: HTMLElement = document.getElementById("gridDiv");

        const htmlTable: HTMLElement = getHtmlTabel();

        htmlDiv.appendChild(htmlTable);

        for (var i:number = 0; i < grid.width; i++) {
            var trTag: HTMLElement = document.createElement("tr");
            trTag.setAttribute("id", `trid-${i}`);
            trTag.setAttribute("class", "row");
            htmlTable.appendChild(trTag);

            for (var j: number = 0; j < grid.height; j++) {
                let cell:Cell = grid.cellArray[i][j];
                var tdTag: HTMLElement = document.createElement("td");
                tdTag.setAttribute("id", `trid-${cell.x}-tdid-${cell.y}`);
                if(cell.isAlive) {
                    tdTag.setAttribute("style", "background-color: black;");
                } else {
                    tdTag.setAttribute("style", "background-color: white;");
                }
                tdTag.setAttribute("class", "column");
                tdTag.setAttribute("onclick", `GameOfLife.clickAlive(this)`);
                trTag.appendChild(tdTag);
            }
        }
    }

    export function clickAlive(element:HTMLElement): void {
       let cell:Cell =  getCellByHtmlId(element.id);
       if(cell.isAlive) {
       cell.isAlive = false;
       } else {
           cell.isAlive = true;
       }
       processGrid();
    }

    export function clearGrid(): void {
        gridService.resetGrid();
        processGrid();
    }


    export function startGame():void {
            generationIteration = setInterval(() => {
                gridService.nextGeneration();
                processGrid();
            }, 10);
    }
    export function stopGame(): void {
            clearInterval(generationIteration);
    }

    // private functions
    function processGrid(): void {
        let htmlTable: HTMLElement = getHtmlTabel();
        let grid:Grid = gridService.getGrid();

        for(var i: number = 0 ; i < grid.width; i++) {
            for(var j : number =0 ; j< grid.height; j++) {
                if(grid.cellArray[i][j].isAlive) {
                    document.getElementById(`trid-${i}-tdid-${j}`).setAttribute("style", "background-color: black;");
                } else {
                    document.getElementById(`trid-${i}-tdid-${j}`).setAttribute("style", "background-color: white;");
                }
            }
        }

    }

    function getCellByHtmlId(id:string):Cell {
        var splitId:string[] = id.split("-");
        var cellRow:number = parseInt(splitId[1] ,10);
        var cellCol:number = parseInt(splitId[3] ,10);

        return gridService.getGrid().cellArray[cellRow][cellCol];
    }

     function getHtmlTabel():HTMLElement {
        const htmlDiv:HTMLElement = document.getElementById("gridDiv");

        let htmlTable:HTMLElement = document.createElement("table");
        htmlTable.setAttribute("id","gridTable");

        if(!document.getElementById("gridTable")) {
        htmlDiv.appendChild(htmlTable);
        }

        return htmlTable;
    }
