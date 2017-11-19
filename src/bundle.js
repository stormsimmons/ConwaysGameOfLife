(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.GameOfLife = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function buildGrid(x, y) {
    var grid = [];
    for (var i = 0; i < x; i++)
        grid[i] = [];
    for (var j = 0; j < y; j++)
        grid[i] = [j];
    return grid;
}
exports.buildGrid = buildGrid;
function buildTable() {
    var row = 60;
    var col = 60;
    var grid = buildGrid(row, col);
    var htmlTable = document.getElementById("table");
    for (var i = 0; i < grid.length; i++) {
        var trTag = document.createElement("tr");
        trTag.setAttribute("id", `trid-${i}`);
        trTag.setAttribute("class", "row");
        htmlTable.appendChild(trTag);
        for (var j = 0; j < grid.length; j++) {
            grid[i][j] = 1;
            var tdTag = document.createElement("td");
            tdTag.setAttribute("id", `trid-${i}-tdid-${j}`);
            tdTag.setAttribute("style", "background-color: white;");
            tdTag.setAttribute("class", "column");
            tdTag.setAttribute("onclick", `GameOfLife.clickAlive(this)`);
            trTag.appendChild(tdTag);
        }
    }
}
exports.buildTable = buildTable;
function clickAlive(cell) {
    var style = cell.getAttribute("style");
    if (style === "background-color: white;") {
        cell.setAttribute("style", "background-color: black;");
    }
    else if (style === "background-color: black;") {
        cell.setAttribute("style", "background-color: white;");
    }
}
exports.clickAlive = clickAlive;
function clearGrid(table) {
    var rows = table.children;
    for (var i = 0; i < rows.length; i++) {
        var row = rows.item(i);
        for (var j = 0; j < row.children.length; j++) {
            var cell = row.children.item(j);
            if (cell.getAttribute("style") === "background-color: black;")
                cell.setAttribute("style", "background-color: white;");
        }
    }
}
exports.clearGrid = clearGrid;
function gridState() {
    var grid = document.getElementById("table");
    return grid;
}
exports.gridState = gridState;
function gridNextGen() {
    var grid = gridState();
    var rows = grid.children;
    var cellsToKill = [];
    var cellsToResurrect = [];
    for (var i = 0; i < rows.length; i++) {
        var row = rows.item(i);
        for (var j = 0; j < row.children.length; j++) {
            var cell = row.children.item(j);
            var isAlive = isCellAlive(cell);
            var neighbours = getNeighbours(cell);
            if (isAlive) {
                if (neighbours < 2) {
                    cellsToKill.push(cell);
                }
                else if (neighbours > 3) {
                    cellsToKill.push(cell);
                }
            }
            else {
                if (neighbours === 3)
                    cellsToResurrect.push(cell);
            }
        }
    }
    killCells(cellsToKill);
    resurrectCells(cellsToResurrect);
}
exports.gridNextGen = gridNextGen;
function getNeighbours(cell) {
    var grid = gridState();
    let neighbours = 0;
    var cellId = cell.id;
    var splitId = cellId.split('-');
    var cellRow = parseInt(splitId[1]);
    var cellCol = parseInt(splitId[3]);
    var neighbourArray = [];
    neighbourArray[0] = document.getElementById(`trid-${cellRow - 1}-tdid-${cellCol}`);
    neighbourArray[1] = document.getElementById(`trid-${cellRow - 1}-tdid-${cellCol + 1}`);
    neighbourArray[2] = document.getElementById(`trid-${cellRow}-tdid-${cellCol + 1}`);
    neighbourArray[3] = document.getElementById(`trid-${cellRow + 1}-tdid-${cellCol + 1}`);
    neighbourArray[4] = document.getElementById(`trid-${cellRow + 1}-tdid-${cellCol}`);
    neighbourArray[5] = document.getElementById(`trid-${cellRow + 1}-tdid-${cellCol - 1}`);
    neighbourArray[6] = document.getElementById(`trid-${cellRow}-tdid-${cellCol - 1}`);
    neighbourArray[7] = document.getElementById(`trid-${cellRow - 1}-tdid-${cellCol - 1}`);
    neighbourArray.forEach(neighbour => {
        if (neighbour)
            if (neighbour.getAttribute("style") === "background-color: black;")
                neighbours++;
    });
    return neighbours;
}
exports.getNeighbours = getNeighbours;
function isCellAlive(cell) {
    if (cell.getAttribute("style") === "background-color: black;") {
        return true;
    }
    else {
        return false;
    }
}
exports.isCellAlive = isCellAlive;
function killCells(cells) {
    cells.forEach(cell => {
        if (cell.getAttribute("style") === "background-color: black;")
            cell.setAttribute("style", "background-color: white;");
    });
}
exports.killCells = killCells;
function resurrectCells(cells) {
    cells.forEach(cell => {
        if (cell.getAttribute("style") === "background-color: white;")
            cell.setAttribute("style", "background-color: black;");
    });
}
exports.resurrectCells = resurrectCells;
let generationIteration;
function startGame() {
    generationIteration = setInterval(function () { gridNextGen(); }, 100);
}
exports.startGame = startGame;
function stopGame() {
    clearInterval(generationIteration);
}
exports.stopGame = stopGame;

},{}]},{},[1])(1)
});