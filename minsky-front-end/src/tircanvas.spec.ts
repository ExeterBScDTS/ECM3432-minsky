// See https://journal.artfuldev.com/unit-testing-node-applications-with-typescript-using-mocha-and-chai-384ef05f32b2

import {Palette} from './tircanvas';

import { expect } from 'chai';
import 'mocha';

let p = new Palette();

console.log(p.getPalette(10));

describe('Palette.getColour()', () => {

  it('0.0 should return [0,0,0]', () => {
    const result = p.getColour(0);
    expect(result).to.equal('rgb(0,0,0)');
  });

  it('1.0 should return [255,255,255]', () => {
    const result = p.getColour(1);
    expect(result).to.equal('rgb(255,255,255)');
  });

});
