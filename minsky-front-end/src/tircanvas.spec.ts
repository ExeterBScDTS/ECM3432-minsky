// See https://journal.artfuldev.com/unit-testing-node-applications-with-typescript-using-mocha-and-chai-384ef05f32b2

import {Palette, TIRCanvas} from './tircanvas';
import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import 'mocha';

const dom = new JSDOM('<!doctype html><html><body><div><canvas id="canvas" width="240" height="320"></canvas></div></body></html>');

let p = new Palette();
p.setLength(100);

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

let c = <HTMLCanvasElement> dom.window.document.getElementById('canvas');
let tircanv = new TIRCanvas(c,p);

console.log(tircanv.palIdx(10));
console.log(tircanv.palIdx(15));
console.log(tircanv.palIdx(20));
console.log(tircanv.palIdx(25));
console.log(tircanv.palIdx(30));
