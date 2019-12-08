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
