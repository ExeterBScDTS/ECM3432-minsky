var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var mint = 12.0;
var maxt = 35.0;
var ctx;
class Palette {
    getColour(v) {
        const color = [[0, 0, 0], [0, 0, 1], [0, 1, 0], [1, 1, 0], [1, 0, 0], [1, 0, 1], [1, 1, 1]];
        let NUM_COLORS = color.length;
        let idx1;
        let idx2;
        let fractBetween = 0.0;
        let vmin = 5.0;
        let vmax = 50.0;
        let vrange = vmax - vmin;
        let rawpix = v;
        v -= vmin;
        v /= vrange;
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
        let ir, ig, ib;
        ir = ((((color[idx2][0] - color[idx1][0]) * fractBetween) + color[idx1][0]) * 255.0);
        ig = ((((color[idx2][1] - color[idx1][1]) * fractBetween) + color[idx1][1]) * 255.0);
        ib = ((((color[idx2][2] - color[idx1][2]) * fractBetween) + color[idx1][2]) * 255.0);
    }
}
function main() {
    var c = document.getElementById('canvas');
    ctx = c.getContext('2d');
    var updateInterval = window.setInterval("draw()", 200);
}
function draw() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('tirjson.jsp');
        const tir = yield response.json();
        for (var row = 0; row < 32; row++) {
            var y = row * 10;
            for (var col = 0; col < 24; col++) {
                var x = (23 - col) * 10;
                var v = tir[col * 32 + row];
                if (v < mint)
                    v = mint;
                if (v > maxt)
                    v = maxt;
                var p = (v - mint) * (255 / (maxt - mint));
                ctx.fillStyle = 'rgb(' + p + ',' + p + ',' + p + ')';
                ctx.fillRect(x, y, 10, 10);
            }
        }
    });
}
