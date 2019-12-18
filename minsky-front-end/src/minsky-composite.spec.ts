// Unit-tests for Composite class.

import { Composite } from './minsky-composite';
import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import 'mocha';

const dom = new JSDOM('<!doctype html><html><body><div><canvas id="canvas" width="240" height="320"></canvas></div></body></html>');

var document = dom.window.document;
let c = new Composite(<HTMLCanvasElement>document.getElementById("canvas"),
<HTMLImageElement>document.getElementById("colour"),
<HTMLImageElement>document.getElementById("thermal"),
);


describe('Composite()', () => {

/*
  it('0.0 should return [0,0,0]', () => {
    const result = p.getColour(0);
    expect(result).to.equal('rgb(0,0,0)');
  });

  it('1.0 should return [255,255,255]', () => {
    const result = p.getColour(1);
    expect(result).to.equal('rgb(255,255,255)');
  });
  */

});
