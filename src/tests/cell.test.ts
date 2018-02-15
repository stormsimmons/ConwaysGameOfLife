import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { Cell } from '../model/cell';

describe('Cell Tests', () => {

    let cell: Cell;

    beforeEach(() => {
        cell = new Cell(10, 10);
        cell.isAlive = true;
    });

    describe('kill', () => {

        it('should set isAlive to false when true', () => {
            cell.kill();
            expect(cell.isAlive).to.be.false;
        });

        it('should set isAlive to false when false', () => {
            let trueCell: Cell = new Cell(10, 10)

            trueCell.kill();
            expect(trueCell.isAlive).to.be.false;
        });
    })

    describe('resurrect', () => {

        it('should set isAlive to true when true', () => {
            cell.resurrect();
            expect(cell.isAlive).to.be.true;
        });

        it('should set isAlive to true when false', () => {
            let trueCell: Cell = new Cell(10, 10)

            trueCell.resurrect();
            expect(trueCell.isAlive).to.be.true;
        });
    });
});
