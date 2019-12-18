

async function sleep(ms:number):Promise<number> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export class Composite{
    private readonly ctx: CanvasRenderingContext2D;
    private readonly colour: HTMLImageElement;
    private readonly thermal: HTMLImageElement;

    constructor(canvas:HTMLCanvasElement,colour:HTMLImageElement,thermal:HTMLImageElement){
        this.ctx = canvas.getContext('2d');
        this.colour = colour;
        this.thermal = thermal;
    }

    update(){  
 
        let mov_x:number = 69;
        let mov_y:number = 20; //, scale:number
        this.colour.src = "colourcam.jsp#" + new Date().getTime();
        //this.thermal.src = "";
        //let colour = <HTMLCanvasElement>document.getElementById("colour");
        //let thermal = <HTMLCanvasElement>document.getElementById("thermal");

        this.ctx.save();
        this.ctx.clearRect(0, 0, 640, 480);
        this.ctx.rotate(-Math.PI/2);
        this.ctx.translate(-400,80);
        this.ctx.scale(1.5, 1.5);
        this.ctx.drawImage(this.thermal, mov_x/10.0, mov_y/10.0);
        this.ctx.restore();
        this.ctx.save();
        this.ctx.globalAlpha = 0.3;
        this.ctx.drawImage(this.colour, 0, 0);
        this.ctx.restore();

        sleep(200);
        window.requestAnimationFrame(() => this.update());
      }

    static main(canvas:string, colour:string, thermal:string){

        let comp = new Composite(
            <HTMLCanvasElement> document.querySelector(canvas),
            <HTMLImageElement> document.querySelector(colour),
            <HTMLImageElement> document.querySelector(thermal));

        comp.update();
     }
}