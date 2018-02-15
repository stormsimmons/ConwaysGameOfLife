import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { Cell } from '../model/cell';
import { GridService } from '../service/grid-service';
import { CellService } from '../service/cell-service';
import { Grid } from '../model/grid';

describe('Grid Service', () => {

    let gridService: GridService = new GridService(new CellService());

    describe('resetGrid', () => {

        it('should kill all cells in the grid', () => {

            let grid: Grid = gridService.getGrid();

            grid.cellArray[5][5].resurrect();
            grid.cellArray[4][6].resurrect();
            grid.cellArray[7][5].resurrect();
            grid.cellArray[2][9].resurrect();

            expect(grid.cellArray[5][5].isAlive).to.be.true;
            expect(grid.cellArray[4][6].isAlive).to.be.true;
            expect(grid.cellArray[7][5].isAlive).to.be.true;
            expect(grid.cellArray[2][9].isAlive).to.be.true;
           
            gridService.resetGrid();

            for (var i = 0; i < grid.width; i++) {
                for (var j = 0; j < grid.height; j++) {
                    expect(grid.cellArray[i][j].isAlive).to.be.false;
                }
            }
        });
    })

    describe('nexGeneration', () => {
        it('should return a grid to get the next iteration of the game', () => {

            let grid: Grid = gridService.getGrid();

            grid.cellArray[5][5].resurrect();
            grid.cellArray[5][4].resurrect();
            grid.cellArray[6][4].resurrect();
            grid.cellArray[6][3].resurrect();

            // this cell should die
            grid.cellArray[8][8].resurrect();
          
            expect(grid.cellArray[6][5].isAlive).to.be.false;
            expect(grid.cellArray[5][3].isAlive).to.be.false;
            expect(grid.cellArray[8][8].isAlive).to.be.true;
           
           let newGrid:Grid =  gridService.nextGeneration();
            
            expect(newGrid.cellArray[6][5].isAlive).to.be.true;
            expect(newGrid.cellArray[5][3].isAlive).to.be.true;
            expect(grid.cellArray[8][8].isAlive).to.be.false;
        });
    })
});