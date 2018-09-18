import { Grid } from "../model/grid";

export class GridFactory {

    private _grid:Grid;

    public getGrid():Grid {
        if(!this._grid) {
            this._grid = new Grid(50,50);
        }
        return this._grid;
    }
}