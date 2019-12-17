
async function sleep(ms:number):Promise<number> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

export class Palette{

    data: Array<string>;

    setLength(n:number){
      this.data = this.getPalette(n);
    }

    getLength():number{
      return this.data.length;
    }

    getColour(v:number) : string{
      
      const color: number[][] = [[0,0,0], [0,0,1], [0,1,0], [1,1,0], [1,0,0], [1,0,1], [1,1,1]];
      let NUM_COLORS:number = color.length;
      let idx1:number; 
      let idx2:number;
      let fractBetween:number = 0.0;

      if(v <= 0){
        idx1=idx2=0;
      }
      else if(v >= 1){
        idx1=idx2=NUM_COLORS-1;
      }
      else{
        v *= (NUM_COLORS-1);
        idx1 = Math.floor(v);
        idx2 = idx1+1;
        fractBetween = v - idx1;
      }

      let rgb = [~~((((color[idx2][0] - color[idx1][0]) * fractBetween) + color[idx1][0]) * 255),
        ~~((((color[idx2][1] - color[idx1][1]) * fractBetween) + color[idx1][1]) * 255),
        ~~((((color[idx2][2] - color[idx1][2]) * fractBetween) + color[idx1][2]) * 255)];

      return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
    }

    getPalette(len:number) : Array<string>
    { 
      let pal: Array<string> = [];
      for(let i=0; i<len; i++){
        let v = (1.0 / (len-1)) * i;
        pal.push(this.getColour(v));
      }

      return pal;
    }
}

export class TIRCanvas {
  private readonly ctx: CanvasRenderingContext2D;
  private readonly pal: Palette;
  private readonly uri: string;
  mint = 12.0;
  maxt = 35.0;

  constructor(canvas: HTMLCanvasElement, palette: Palette , uri: string) {
    this.ctx = canvas.getContext('2d');
    this.pal = palette;
    this.uri = uri;
  }

  palIdx(v:number):number{
    if (v < this.mint) v=this.mint;
    if (v > this.maxt) v=this.maxt;
    let p = (v-this.mint) * (this.pal.getLength()/(this.maxt-this.mint));
    return ~~p;
  }

  getColour(v:number):string{
    return this.pal.data[this.palIdx(v)];
  }

  async draw() {
    const response = await fetch(this.uri);
    const tir = await response.json();

    for(let row=0; row<32; row++){
      let y=row*10;
      for(let col=0; col<24; col++){
          let x=(23-col)*10;
          let v = tir[col*32 + row];
          this.ctx.fillStyle = this.getColour(v);
          this.ctx.fillRect(x, y, 10, 10);
      }
    }
    window.requestAnimationFrame(() => this.draw());
  }

  static main(selector:string, uri:string) {

    let p = new Palette();
    p.setLength(512);
    let c = <HTMLCanvasElement> document.querySelector(selector);
    //let uri:string = 'tirjson.jsp';
    let t = new TIRCanvas(c,p,uri);
    t.draw();
  }
}

export class Histogram{

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
     await sleep(200);
     let response = await fetch("histjson.jsp?bins=" + this.num_bins + "&height=" + this.max_height);
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
    let p = new Palette();
    p.setLength(50);
    h.setPalette(p);
    h.redraw();
  }
 
 }
 
 