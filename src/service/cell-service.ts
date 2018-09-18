import { Cell } from "../model/cell";
import { Grid } from "../model/grid";

export class CellService {

    getNeighbourCells(cell: Cell, gridState: Grid): Cell[] {
        let neighbours: Cell[] = [];

        let keys :any = [
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