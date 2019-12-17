var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => setTimeout(resolve, ms));
    });
}
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
    static main(selector) {
        let p = new Palette();
        p.setLength(512);
        let c = document.querySelector(selector);
        let t = new TIRCanvas(c, p);
        t.draw();
    }
}
export class Histogram {
    constructor(svg, num_bins, max_height) {
        this.drawHist(svg, num_bins, max_height);
    }
    rect(n, h, fill, max_height) {
        var NS = "http://www.w3.org/2000/svg";
        var SVGObj = document.createElementNS(NS, "rect");
        SVGObj.id = "r_" + n;
        SVGObj.width.baseVal.value = 17;
        SVGObj.height.baseVal.value = h;
        SVGObj.x.baseVal.value = 1;
        SVGObj.style.fill = fill;
        SVGObj.setAttribute("transform", "translate(" + (n * 18) + "," + (max_height - h) + ")");
        return SVGObj;
    }
    setheight(n, h, fill, max_height) {
        var SVGObj = document.getElementById("r_" + n);
        //SVGObj.width.baseVal.value=17;
        SVGObj.height.baseVal.value = h;
        //SVGObj.x.baseVal.value=1;
        SVGObj.style.fill = fill;
        SVGObj.setAttribute("transform", "translate(" + (n * 18) + "," + (max_height - h) + ")");
    }
    drawHist(svg, num_bins, max_height) {
        this.num_bins = num_bins;
        this.max_height = max_height;
        for (let i = 0; i < num_bins; i++) {
            let r1 = this.rect(i, 1, "black", max_height);
            svg.appendChild(r1);
        }
    }
    redraw() {
        return __awaiter(this, void 0, void 0, function* () {
            yield sleep(200);
            let response = yield fetch("histjson.jsp?bins=" + this.num_bins + "&height=" + this.max_height);
            let tir = yield response.json();
            for (let i = 0; i < tir.length; i++) {
                this.setheight(i, tir[i], this.palette[i], this.max_height);
            }
            // use requestAnimationFrame() so we don't update when the browser page
            // is not visible.
            window.requestAnimationFrame(() => this.redraw());
        });
    }
    setPalette(palette) {
        this.palette = palette.data;
    }
    static main(selector) {
        let svg = document.querySelector(selector);
        let num_bins = 50;
        let max_height = 460;
        let h = new Histogram(svg, num_bins, max_height);
        let p = new Palette();
        p.setLength(50);
        h.setPalette(p);
        h.redraw();
    }
}
