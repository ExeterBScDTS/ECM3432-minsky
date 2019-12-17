// Unit-tests for Histogram class.
import {Palette, Histogram} from './minsky-tir';
import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import 'mocha';

const dom = new JSDOM('<!doctype html><html><body><div><svg id="svg" width="100" height="100"></svg></div></body></html>');

let p = new Palette();
p.setLength(50);

let svg = <SVGSVGElement> dom.window.document.querySelector('#svg');

let hist = new Histogram(svg,10,50);

/*
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
*/