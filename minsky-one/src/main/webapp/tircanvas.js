var mint = 12.0;
var maxt = 35.0;
var ctx;

function main() {
    var c = document.getElementById('canvas');
    if (c.getContext) {
      //initializeCanvas(c);
      ctx = canvas.getContext('2d'); 
      updateInterval = window.setInterval("draw()", 200);

      //draw();
    }

    else {
      trace('Sorry.. you need a browser that supports the canvas tag.');
    }
  }

async function draw(){

  const response = await fetch('tirjson.jsp');
  const tir = await response.json();

  for(var row=0; row<32; row++){
        y=row*10;
        for(var col=0; col<24; col++){
            x=(23-col)*10;
            var v = tir[col*32 + row];
            if (v < mint) v=mint;
            if (v > maxt) v=maxt;
            var p = (v-mint) * (255/(maxt-mint));
            ctx.fillStyle = 'rgb('+ p +',' + p +',' + p + ')';
            ctx.fillRect(x, y, 10, 10);
        }
    }
}
