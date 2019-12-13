var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function rect(n, h, fill, max_height) {
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
function setheight(n, h, fill, max_height) {
    var SVGObj = document.getElementById("r_" + n);
    //SVGObj.width.baseVal.value=17;
    SVGObj.height.baseVal.value = h;
    //SVGObj.x.baseVal.value=1;
    SVGObj.style.fill = fill;
    SVGObj.setAttribute("transform", "translate(" + (n * 18) + "," + (max_height - h) + ")");
}
function drawHist(svg, num_bins, max_height) {
    for (let i = 0; i < num_bins; i++) {
        let r1 = rect(i, 1, "black", max_height);
        svg.appendChild(r1);
    }
}
function redrawHist(num_bins, max_height) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch("histjson.jsp?bins=" + num_bins + "&height=" + max_height);
        let tir = yield response.json();
        for (let i = 0; i < tir.length; i++) {
            setheight(i, tir[i], "black", max_height);
        }
    });
}
var svg = document.getElementById('svg-hist');
var num_bins = 50;
var max_height = 460;
drawHist(svg, num_bins, max_height);
var updateInterval = window.setInterval("redrawHist(num_bins,max_height)", 200);
// For OO approach see https://codeburst.io/canvas-animations-in-typescript-97ba0163cb19
