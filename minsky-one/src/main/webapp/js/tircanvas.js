var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Palette {
    setLength(n) {
        this.data = this.getPalette(n);
    }
    getLength() {
        return this.data.length;
    }
    getColour(v) {
        const color = [[0, 0, 0], [0, 0, 1], [0, 1, 0], [1, 1, 0], [1, 0, 0], [1, 0, 1], [1, 1, 1]];
        let NUM_COLORS = color.length;
        let idx1;
        let idx2;
        let fractBetween = 0.0;
        if (v <= 0) {
            idx1 = idx2 = 0;
        }
        else if (v >= 1) {
            idx1 = idx2 = NUM_COLORS - 1;
        }
        else {
            v *= (NUM_COLORS - 1);
            idx1 = Math.floor(v);
            idx2 = idx1 + 1;
            fractBetween = v - idx1;
        }
        let rgb = [~~((((color[idx2][0] - color[idx1][0]) * fractBetween) + color[idx1][0]) * 255),
            ~~((((color[idx2][1] - color[idx1][1]) * fractBetween) + color[idx1][1]) * 255),
            ~~((((color[idx2][2] - color[idx1][2]) * fractBetween) + color[idx1][2]) * 255)];
        return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
    }
    getPalette(len) {
        let pal = [];
        for (let i = 0; i < len; i++) {
            let v = (1.0 / (len - 1)) * i;
            pal.push(this.getColour(v));
        }
        return pal;
    }
}
export class TIRCanvas {
    constructor(canvas, palette) {
        this.mint = 12.0;
        this.maxt = 35.0;
        this.ctx = canvas.getContext('2d');
        this.pal = palette;
    }
    palIdx(v) {
        if (v < this.mint)
            v = this.mint;
        if (v > this.maxt)
            v = this.maxt;
        let p = (v - this.mint) * (this.pal.getLength() / (this.maxt - this.mint));
        return ~~p;
    }
    getColour(v) {
        return this.pal.data[this.palIdx(v)];
    }
    draw() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('tirjson.jsp');
            const tir = yield response.json();
            for (let row = 0; row < 32; row++) {
                let y = row * 10;
                for (let col = 0; col < 24; col++) {
                    let x = (23 - col) * 10;
                    let v = tir[col * 32 + row];
                    this.ctx.fillStyle = this.getColour(v);
                    this.ctx.fillRect(x, y, 10, 10);
                }
            }
            window.requestAnimationFrame(() => this.draw());
        });
    }
}
export function main() {
    let p = new Palette();
    p.setLength(512);
    let c = document.getElementById('canvas');
    let t = new TIRCanvas(c, p);
    t.draw();
}
