
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
  mint = 12.0;
  maxt = 35.0;

  constructor(canvas: HTMLCanvasElement, palette: Palette ) {
    this.ctx = canvas.getContext('2d');
    this.pal = palette;
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
    const response = await fetch('tirjson.jsp');
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

  static main(selector:string) {

    let p = new Palette();
    p.setLength(512);
    let c = <HTMLCanvasElement> document.querySelector(selector);
    let t = new TIRCanvas(c,p);
    t.draw();
  }
}
