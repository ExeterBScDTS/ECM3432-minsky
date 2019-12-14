
export class Palette{

    data: Array<String>;

    setLength(n:number){
      this.data = this.getPalette(n);
    }

    getColour(v:number) : String{
      
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

    getPalette(len:number) : Array<String>
    { 
      let pal: Array<String> = [];
      for(let i=0; i<len; i++){
        let v = (1.0 / (len-1)) * i;
        pal.push(this.getColour(v));
      }

      return pal;
    }
}

export class TIRCanvas {
  private readonly ctx: CanvasRenderingContext2D;
  mint = 12.0;
  maxt = 35.0;

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.ctx = this.canvas.getContext('2d');
  }

  async draw() {
    const response = await fetch('tirjson.jsp');
    const tir = await response.json();

    for(var row=0; row<32; row++){
      var y=row*10;
      for(var col=0; col<24; col++){
          var x=(23-col)*10;
          var v = tir[col*32 + row];
          if (v < this.mint) v=this.mint;
          if (v > this.maxt) v=this.maxt;
          var p = (v-this.mint) * (255/(this.maxt-this.mint));
          this.ctx.fillStyle = 'rgb('+ p +',' + p +',' + p + ')';
          this.ctx.fillRect(x, y, 10, 10);
      }
    }
    window.requestAnimationFrame(() => this.draw());
  }
}

export function main() {

  let p = new Palette();
  p.setLength(10);
  let c = <HTMLCanvasElement> document.getElementById('canvas');

  let t = new TIRCanvas(c);
  t.draw();
}
