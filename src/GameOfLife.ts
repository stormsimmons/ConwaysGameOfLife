export function buildGrid(x: number, y: number): number[][] {

        var grid: number[][] = [];

        for (var i = 0; i < x; i++)
                grid[i] = [];
        for (var j = 0; j < y; j++)
                grid[i] = [j];

        return grid;
}

export function buildTable() {

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


export function clickAlive(cell: HTMLElement) {

        var style = cell.getAttribute("style");

        if (style === "background-color: white;") {
                cell.setAttribute("style", "background-color: black;");
        } else if (style === "background-color: black;") {
                cell.setAttribute("style", "background-color: white;");
        }
}

export function clearGrid(table: HTMLElement) {
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

export function gridState(): HTMLElement {
        var grid = document.getElementById("table");
        return grid;
}
export function gridNextGen() {
        var grid = gridState();
        var rows = grid.children;
        var cellsToKill: Element[] = [];
        var cellsToResurrect: Element[] = [];

        for (var i = 0; i < rows.length; i++) {
                var row = rows.item(i);
                for (var j = 0; j < row.children.length; j++) {
                        var cell: Element = row.children.item(j);
                        var isAlive = isCellAlive(cell);

                        var neighbours = getNeighbours(cell);

                        if (isAlive) {
                                if (neighbours < 2) {
                                        cellsToKill.push(cell)
                                } else if (neighbours > 3) {
                                        cellsToKill.push(cell)
                                }

                        } else {
                                if (neighbours === 3)
                                        cellsToResurrect.push(cell);
                        }
                }
        }

        killCells(cellsToKill);
        resurrectCells(cellsToResurrect);
}

export function getNeighbours(cell: Element): number {

        var grid = gridState();

        let neighbours = 0;

        var cellId = cell.id;

        var splitId = cellId.split('-');
        var cellRow = parseInt(splitId[1]);
        var cellCol = parseInt(splitId[3]);
        var neighbourArray: HTMLElement[] = [];
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
                                neighbours++
        });

        return neighbours;
}

export function isCellAlive(cell: Element): boolean {
        if (cell.getAttribute("style") === "background-color: black;") {
                return true;
        } else {
                return false;
        }
}

export function killCells(cells: Element[]) {

        cells.forEach(cell => {
                if (cell.getAttribute("style") === "background-color: black;")
                        cell.setAttribute("style", "background-color: white;");
        });

}
export function resurrectCells(cells: Element[]) {
        cells.forEach(cell => {
                if (cell.getAttribute("style") === "background-color: white;")
                        cell.setAttribute("style", "background-color: black;");
        })
}

let generationIteration;

export function startGame() {
        generationIteration = setInterval(function () { gridNextGen() }, 100);
}
export function stopGame() {
        clearInterval(generationIteration);
}