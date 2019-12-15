// Unit-tests for tircanvas.ts TIRCanvas class.
import {Palette, TIRCanvas} from './tircanvas';
import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import 'mocha';

const dom = new JSDOM('<!doctype html><html><body><div><canvas id="canvas" width="240" height="320"></canvas></div></body></html>');

let p = new Palette();
p.setLength(100);

let c = <HTMLCanvasElement> dom.window.document.getElementById('canvas');
let tircanv = new TIRCanvas(c,p);


describe('TIRCanvas.palIdx()', () => {

  it('10 should return 0', () => {
    const result = tircanv.palIdx(0);
    expect(result).to.equal(0);
  });

  it('20 should return 13', () => {
    const result = tircanv.palIdx(20);
    expect(result).to.equal(34);
  });

});
