import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import {Grid} from '../model/grid';

describe('Grid Tests' , () => {

    let grid:Grid;

    beforeEach(() => {
         grid = new Grid(10,10)
    })

    describe('InitalizeGrid' , () => {

        it('should populate the prop of cellArray',() => {
            expect(grid.cellArray).to.be.not.undefined.and.not.null;
        });
        
    });
});
