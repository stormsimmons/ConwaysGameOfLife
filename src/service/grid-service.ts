import { Grid } from '../model/grid';
import { CellService } from "../service/cell-service";
import {Cell} from '../model/cell';

export class GridService {

    private _grid: Grid;
    private _cellService: CellService

    constructor(cellService: CellService) {
        this._cellService = cellService;
        this._grid = new Grid(60, 60);
    }

    getGrid(): Grid {
        return this._grid;
    }

    resetGrid() {
        for (var i = 0; i < this._grid.width; i++) {
            for (var j = 0; j < this._grid.height; j++) {
                this._grid.cellArray[i][j].kill();
            }
        }
    }

    public nextGeneration():Grid{
        let cellsToKill:Cell[] = [];
        let cellsToResurect:Cell[] = [];
        
        for(var  i= 0 ; i < this._grid.width; i++ ){
            for(var j = 0; j < this._grid.height; j++){
                let currentCell:Cell = this._grid.cellArray[i][j]; 
                
                let neighbours:Cell[] = this._cellService.getNeighbourCells(currentCell, this._grid);

                let aliveNeighbours:number = this.getAliveNeighbours(neighbours);
                if(currentCell.isAlive){
                    if(aliveNeighbours < 2){
                        cellsToKill.push(currentCell)
                    }else if(aliveNeighbours > 3){
                        cellsToKill.push(currentCell)
                    }
              }else{
                    if(aliveNeighbours === 3){
                        cellsToResurect.push(currentCell);
                    } 
              }
            }
        }
        this.killCells(cellsToKill);
        this.resurectCells(cellsToResurect);

        return this._grid;
    }
    
    private getAliveNeighbours(neighbours:Cell[]):number{
        let counter:number = 0;
        neighbours.forEach(neighbour => {
           if (neighbour.isAlive)
            counter++;
        });
        return counter
    }


    private killCells(cellArray:Cell[]):void{
        cellArray.forEach(cell => {
            cell.kill();
        });
    }

    private resurectCells(cellArray:Cell[]):void{
        cellArray.forEach(cell => {
            cell.resurrect();
        });
    }
}