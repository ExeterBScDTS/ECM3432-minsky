var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Palette } from 'tircanvas';
class Histogram {
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
        for (let i = 0; i < num_bins; i++) {
            let r1 = this.rect(i, 1, "black", max_height);
            svg.appendChild(r1);
        }
    }
    redrawHist(num_bins, max_height) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch("histjson.jsp?bins=" + num_bins + "&height=" + max_height);
            let tir = yield response.json();
            for (let i = 0; i < tir.length; i++) {
                //this.setheight(i,tir[i],"rgb(255,255,0)",max_height); 
                this.setheight(i, tir[i], this.palette[i], max_height);
            }
        });
    }
    setPalette(palette) {
        this.palette = palette.data;
    }
    static main() {
        let svg = document.getElementById('svg-hist');
        let num_bins = 50;
        let max_height = 460;
        let h = new Histogram();
        let p = new Palette();
        p.setLength(50);
        h.setPalette(p);
        h.drawHist(svg, num_bins, max_height);
        var updateInterval = window.setInterval("h.redrawHist(num_bins,max_height)", 200);
    }
}
