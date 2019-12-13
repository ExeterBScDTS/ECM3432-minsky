// See https://journal.artfuldev.com/unit-testing-node-applications-with-typescript-using-mocha-and-chai-384ef05f32b2

import {Palette} from './tircanvas';

import { expect } from 'chai';
import 'mocha';

let p = new Palette();

console.log(p.getColour(0));
console.log(p.getColour(0.1));
console.log(p.getColour(0.9));
console.log(p.getColour(1));

describe('Hello function', () => {

  it('should return hello world', () => {
    const result = "Hello world!";
    expect(result).to.equal('Hello world!');
  });

});
