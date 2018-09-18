import { expect } from "chai";
import "mocha";
import * as sinon from "sinon";
import  "ts-mockito";
import { Cell } from "../model/cell";
import {CellService} from "../service/cell-service";
import {Grid} from "../model/grid";
import {GridService} from "../service/grid-service";
import { mock, when } from "ts-mockito";


describe("Cell Service", () => {

    let cellService: CellService;
    let grid:Grid;

    beforeEach(() => {
        cellService = new CellService();
        grid = new Grid(10,10);
    });


    describe("getNeighbours", () => {

        it("Should return an array of cells sourrounding the cell in question", () => {

            let neighbours: Cell[]  = cellService.getNeighbourCells(grid.cellArray[5][5] , grid);

            expect(neighbours).to.be.not.null.and.not.undefined;
        });

        it("Should return an array of cells with count of 8", () => {

            let neighbours: Cell[]  = cellService.getNeighbourCells(grid.cellArray[5][5] ,grid);

            expect(neighbours.length).to.equal(8);
        });

        it("Should return an array of cells with count of 3 on zero edge", () => {

            let neighbours: Cell[]  = cellService.getNeighbourCells(grid.cellArray[0][0] ,grid);
            expect(neighbours.length).to.equal(3);
        });

        it("Should return an array of cells with count of 3 on non-zero edge", () => {

            let neighbours: Cell[]  = cellService.getNeighbourCells(grid.cellArray[9][9] ,grid);
            expect(neighbours.length).to.equal(3);
        });


        it("Should return an array of cells with count of 3 on non-zero edge with non-square grid", () => {
            let testGrid:Grid = new Grid(10,15);
            let neighbours: Cell[]  = cellService.getNeighbourCells(testGrid.cellArray[9][14] ,testGrid);
            expect(neighbours.length).to.equal(3);
        });
        it("Should return an array of cells with count of 3 on non-zero edge with non-square grid reversed", () => {
            let testGrid:Grid = new Grid(15,10);
            let neighbours: Cell[]  = cellService.getNeighbourCells(testGrid.cellArray[14][9] ,testGrid);
            expect(neighbours.length).to.equal(3);
        });
    });

});