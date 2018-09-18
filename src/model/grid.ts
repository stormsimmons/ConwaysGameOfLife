import { Cell } from "./cell";

export class Grid {

    constructor(public width: number, public height: number) {
        this.initalizeGrid();
     }

    public cellArray: Cell[][];

    private initalizeGrid(): void {
        if (!this.height || !this.width) {
            throw new Error("Please make sure both height and width have values");
        }

        this.cellArray = [];

        for (let i:number = 0; i < this.width; i++) {
            this.cellArray[i] = [];
            for (let j:number = 0; j < this.height; j++) {
                this.cellArray[i][j] = new Cell(i, j);
            }
        }
    }
}