
import {Palette} from './tircanvas';

import { expect } from 'chai';
import 'mocha';

console.log("Can you hear me?");

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
