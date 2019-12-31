import * as React from "react"

import {Palette} from "./palette"
import {TIRCanvas} from "./tircanvas"


// See https://blog.cloudboost.io/using-html5-canvas-with-react-ff7d93f5dc76
// And https://www.gatsbyjs.org/docs/static-folder/

class TirCanv extends React.Component {

    componentDidMount() {
        const canvas:HTMLCanvasElement = this.refs.canvas as HTMLCanvasElement;

        let p = new Palette(512);
        let t:TIRCanvas = new TIRCanvas(canvas, p, "/tir.json");
        t.draw();
    }

    render() { 
        return(
        <canvas ref="canvas" width={320} height={240} />
        )
    }
}

export default TirCanv