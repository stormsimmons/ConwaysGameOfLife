import { GridService } from './service/grid-service';
import { CellService } from './service/cell-service';
import {Grid} from './model/grid';
import {Cell} from './model/cell';

   
const  cellService = new CellService();
const gridService = new GridService(cellService);
let generationIteration;
   
// public functions 
   export function buildTable() {
        let grid:Grid = gridService.getGrid();

        const htmlDiv = document.getElementById("gridDiv");

        const htmlTable = getHtmlTabel();

        htmlDiv.appendChild(htmlTable);

        for (var i = 0; i < grid.width; i++) {
            var trTag = document.createElement("tr");
            trTag.setAttribute("id", `trid-${i}`);
            trTag.setAttribute("class", "row");
            htmlTable.appendChild(trTag);

            for (var j = 0; j < grid.height; j++) {
                let cell = grid.cellArray[i][j];
                var tdTag = document.createElement("td");
                tdTag.setAttribute("id", `trid-${cell.x}-tdid-${cell.y}`);
                if(cell.isAlive){
                    tdTag.setAttribute("style", "background-color: black;");
                }else{
                    tdTag.setAttribute("style", "background-color: white;");
                }
                tdTag.setAttribute("class", "column");
                tdTag.setAttribute("onclick", `GameOfLife.clickAlive(this)`);
                trTag.appendChild(tdTag);
            }
        }
    }

    export function clickAlive(element:HTMLElement){
       let cell:Cell =  getCellByHtmlId(element.id)
       cell.isAlive = true;
       buildTable();
    }

    export function clearGrid(){
        gridService.resetGrid()
        buildTable();    
    }


    export function startGame() {
            generationIteration = setInterval(function () {
                gridService.nextGeneration();
                buildTable();
            }, 100);
    }
    export function stopGame() {
            clearInterval(generationIteration);
    }

    //private functions 
    function getCellByHtmlId(id:string):Cell{
        var splitId = id.split('-');
        var cellRow = parseInt(splitId[1]);
        var cellCol = parseInt(splitId[3]);

        return gridService.getGrid().cellArray[cellRow][cellCol];
    }

     function getHtmlTabel():HTMLElement{
        const htmlDiv = document.getElementById("gridDiv");

        let htmlTable = document.createElement("table");
        htmlTable.setAttribute("id","gridTable");

        if(document.getElementById('gridTable')){
            htmlDiv.removeChild(document.getElementById('gridTable'));
        }

        htmlDiv.appendChild(htmlTable);

        return htmlTable;
    }
