import {Palette} from "./palette"

async function sleep(ms:number):Promise<number> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Histogram{

    palette:Array<string>;
    num_bins:number;
    max_height:number;

    constructor(svg:SVGSVGElement, num_bins:number,max_height:number) {
        this.num_bins=num_bins;
        this.max_height=max_height;
        for(let i=0; i<num_bins; i++){
            let r1 = this.rect(i,1,"white",max_height); 
                svg.appendChild(r1);
            }
    }

    rect(n:number,h:number,fill:string,max_height:number):SVGRectElement{
      var NS="http://www.w3.org/2000/svg";
      var SVGObj= <SVGRectElement><any>document.createElementNS(NS,"rect");
      SVGObj.id="r_" + n;
      SVGObj.width.baseVal.value=17;
      SVGObj.height.baseVal.value=h;
      SVGObj.x.baseVal.value=1;
      SVGObj.style.fill=fill;
      SVGObj.setAttribute("transform","translate(" + (n * 18) + "," + (max_height - h) + ")");
      return SVGObj;
   }
 
   setheight(n:number,h:number,fill:string,max_height:number){
      var SVGObj= <SVGRectElement><any>document.getElementById("r_" + n);
      //SVGObj.width.baseVal.value=17;
      SVGObj.height.baseVal.value=h;
      //SVGObj.x.baseVal.value=1;
      SVGObj.style.fill=fill;
      SVGObj.setAttribute("transform","translate(" + (n * 18) + "," + (max_height - h) + ")");
   }
 
   async redraw():Promise<void>{
     await sleep(200).then(()=>{});
     let response = await fetch("/hist.json?bins=" + this.num_bins + "&height=" + this.max_height);
     let tir = await response.json();
     for(let i=0; i<tir.length; i++){
        this.setheight(i,tir[i],this.palette[i],this.max_height); 
     }
     // use requestAnimationFrame() so we don't update when the browser page
     // is not visible.
     window.requestAnimationFrame(() => this.redraw());
   }
 
   setPalette(palette:Palette){
      this.palette=palette.data;
   }
 
   static main(selector:string) {
    let svg = <SVGSVGElement><any>document.querySelector(selector);
    let num_bins = 50;
    let max_height = 460;
  
    let h = new Histogram(svg,num_bins,max_height);
    let p = new Palette(50);
    h.setPalette(p);
    h.redraw();
  }
 
 }

 export {Histogram}
 
 