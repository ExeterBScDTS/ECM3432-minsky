import * as React from "react"

async function sleep(ms:number):Promise<number> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export interface MyProps {
    id: string
  }

class Composite extends React.Component<MyProps>{

    private ctx: CanvasRenderingContext2D;
    private rgb:HTMLImageElement;
    private uri:string;

    private async draw() {
        await sleep(200).then(()=>{});
        this.ctx.drawImage(this.rgb, 0, 0, 640, 480);
        window.requestAnimationFrame(() => this.draw());
      }
    
    componentDidMount() {
        const canvas:HTMLCanvasElement = this.refs.canvas as HTMLCanvasElement;
        this.ctx = canvas.getContext("2d")
        this.rgb = document.getElementById("rgb") as HTMLImageElement;
        this.draw();
    }

    render() { 
        return(
        <canvas ref="canvas" width={640} height={480}/>
        )
    }
}

export default Composite