import {Palette} from 'tircanvas';

class Histogram{

   palette:Array<string>;

   rect(n:number,h:number,fill:string,max_height:number){
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
  

  drawHist(svg:SVGSVGElement,num_bins:number,max_height:number){
    for(let i=0; i<num_bins; i++){
       let r1 = this.rect(i,1,"black",max_height); 
       svg.appendChild(r1);
    }
  }

  async redrawHist(num_bins:number,max_height:number):Promise<void>{
    let response = await fetch("histjson.jsp?bins=" + num_bins + "&height=" + max_height);
    let tir = await response.json();
    for(let i=0; i<tir.length; i++){
       //this.setheight(i,tir[i],"rgb(255,255,0)",max_height); 
       this.setheight(i,tir[i],this.palette[i],max_height); 
    }
  }

  setPalette(palette:Palette){
     this.palette=palette.data;
  }
}


export function main() {
  let svg = <SVGSVGElement><any>document.getElementById('svg-hist');
  let num_bins = 50;
  let max_height = 460;

  let h = new Histogram();
  let p = new Palette();
  p.setLength(50);

  h.setPalette(p);
  h.drawHist(svg,num_bins,max_height);

  var updateInterval = window.setInterval("h.redrawHist(num_bins,max_height)", 200);

}