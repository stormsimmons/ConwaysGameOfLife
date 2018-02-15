(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.GameOfLife = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grid_service_1 = require("./service/grid-service");
const cell_service_1 = require("./service/cell-service");
const cellService = new cell_service_1.CellService();
const gridService = new grid_service_1.GridService(cellService);
let generationIteration;
function buildTable() {
    let grid = gridService.getGrid();
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
            if (cell.isAlive) {
                tdTag.setAttribute("style", "background-color: black;");
            }
            else {
                tdTag.setAttribute("style", "background-color: white;");
            }
            tdTag.setAttribute("class", "column");
            tdTag.setAttribute("onclick", `GameOfLife.clickAlive(this)`);
            trTag.appendChild(tdTag);
        }
    }
}
exports.buildTable = buildTable;
function clickAlive(element) {
    let cell = getCellByHtmlId(element.id);
    if (cell.isAlive) {
        cell.isAlive = false;
    }
    else {
        cell.isAlive = true;
    }
    processGrid();
}
exports.clickAlive = clickAlive;
function clearGrid() {
    gridService.resetGrid();
    processGrid();
}
exports.clearGrid = clearGrid;
function startGame() {
    generationIteration = setInterval(function () {
        gridService.nextGeneration();
        processGrid();
    }, 10);
}
exports.startGame = startGame;
function stopGame() {
    clearInterval(generationIteration);
}
exports.stopGame = stopGame;
function processGrid() {
    let htmlTable = getHtmlTabel();
    let grid = gridService.getGrid();
    for (var i = 0; i < grid.width; i++) {
        for (var j = 0; j < grid.height; j++) {
            if (grid.cellArray[i][j].isAlive) {
                document.getElementById(`trid-${i}-tdid-${j}`).setAttribute("style", "background-color: black;");
            }
            else {
                document.getElementById(`trid-${i}-tdid-${j}`).setAttribute("style", "background-color: white;");
            }
        }
    }
}
function getCellByHtmlId(id) {
    var splitId = id.split('-');
    var cellRow = parseInt(splitId[1]);
    var cellCol = parseInt(splitId[3]);
    return gridService.getGrid().cellArray[cellRow][cellCol];
}
function getHtmlTabel() {
    const htmlDiv = document.getElementById("gridDiv");
    let htmlTable = document.createElement("table");
    htmlTable.setAttribute("id", "gridTable");
    if (!document.getElementById('gridTable'))
        htmlDiv.appendChild(htmlTable);
    return htmlTable;
}

},{"./service/cell-service":4,"./service/grid-service":5}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isAlive = false;
    }
    kill() {
        if (this.isAlive) {
            this.isAlive = false;
        }
    }
    resurrect() {
        if (!this.isAlive) {
            this.isAlive = true;
        }
    }
}
exports.Cell = Cell;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cell_1 = require("./cell");
class Grid {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.initalizeGrid();
    }
    initalizeGrid() {
        if (!this.height || !this.width) {
            throw new Error('Please make sure both height and width have values');
        }
        this.cellArray = [];
        for (let i = 0; i < this.width; i++) {
            this.cellArray[i] = [];
            for (let j = 0; j < this.height; j++) {
                this.cellArray[i][j] = new cell_1.Cell(i, j);
            }
        }
    }
}
exports.Grid = Grid;

},{"./cell":2}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CellService {
    constructor() {
    }
    getNeighbourCells(cell, gridState) {
        let neighbours = [];
        let keys = [
            { x: cell.x - 1, y: cell.y },
            { x: cell.x - 1, y: cell.y + 1 },
            { x: cell.x, y: cell.y + 1 },
            { x: cell.x + 1, y: cell.y + 1 },
            { x: cell.x + 1, y: cell.y },
            { x: cell.x + 1, y: cell.y - 1 },
            { x: cell.x, y: cell.y - 1 },
            { x: cell.x - 1, y: cell.y - 1 },
        ];
        keys.forEach(key => {
            if (key.x >= 0 && key.y >= 0 &&
                key.x < gridState.width && key.y < gridState.height) {
                if (gridState.cellArray[key.x][key.y]) {
                    neighbours.push(gridState.cellArray[key.x][key.y]);
                }
            }
        });
        return neighbours;
    }
}
exports.CellService = CellService;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grid_1 = require("../model/grid");
class GridService {
    constructor(cellService) {
        this._cellService = cellService;
        this._grid = new grid_1.Grid(60, 60);
    }
    getGrid() {
        return this._grid;
    }
    resetGrid() {
        for (var i = 0; i < this._grid.width; i++) {
            for (var j = 0; j < this._grid.height; j++) {
                this._grid.cellArray[i][j].kill();
            }
        }
    }
    nextGeneration() {
        let cellsToKill = [];
        let cellsToResurect = [];
        for (var i = 0; i < this._grid.width; i++) {
            for (var j = 0; j < this._grid.height; j++) {
                let currentCell = this._grid.cellArray[i][j];
                let neighbours = this._cellService.getNeighbourCells(currentCell, this._grid);
                let aliveNeighbours = this.getAliveNeighbours(neighbours);
                if (currentCell.isAlive) {
                    if (aliveNeighbours < 2) {
                        cellsToKill.push(currentCell);
                    }
                    else if (aliveNeighbours > 3) {
                        cellsToKill.push(currentCell);
                    }
                }
                else {
                    if (aliveNeighbours === 3) {
                        cellsToResurect.push(currentCell);
                    }
                }
            }
        }
        this.killCells(cellsToKill);
        this.resurectCells(cellsToResurect);
        return this._grid;
    }
    getAliveNeighbours(neighbours) {
        let counter = 0;
        neighbours.forEach(neighbour => {
            if (neighbour.isAlive)
                counter++;
        });
        return counter;
    }
    killCells(cellArray) {
        cellArray.forEach(cell => {
            cell.kill();
        });
    }
    resurectCells(cellArray) {
        cellArray.forEach(cell => {
            cell.resurrect();
        });
    }
}
exports.GridService = GridService;

},{"../model/grid":3}]},{},[1])(1)
});