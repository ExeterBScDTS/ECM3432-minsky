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
export class Composite {
    constructor(canvas, colour, thermal) {
        this.ctx = canvas.getContext('2d');
        this.colour = colour;
        this.thermal = thermal;
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            yield sleep(200).then(() => {
                let mov_x = 69;
                let mov_y = 20; //, scale:number
                this.ctx.save();
                this.ctx.clearRect(0, 0, 640, 480);
                this.ctx.rotate(-Math.PI / 2);
                this.ctx.translate(-400, 80);
                this.ctx.scale(1.5, 1.5);
                this.ctx.drawImage(this.thermal, mov_x / 10.0, mov_y / 10.0);
                this.ctx.restore();
                this.ctx.save();
                this.ctx.globalAlpha = 0.3;
                this.ctx.drawImage(this.colour, 0, 0);
                this.ctx.restore();
                window.requestAnimationFrame(() => this.update());
            });
        });
    }
    static main({ canvas, colour, thermal, adjust }) {
        let comp = new Composite(document.querySelector(canvas), document.querySelector(colour), document.querySelector(thermal));
        comp.adjust = adjust;
        comp.update();
    }
}
