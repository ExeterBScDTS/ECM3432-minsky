var mint = 12.0;
var maxt = 35.0;
var ctx;

function main() {
    var c = <HTMLCanvasElement> document.getElementById('canvas');
      ctx = c.getContext('2d'); 
      var updateInterval = window.setInterval("draw()", 200);
  }

async function draw(){

  const response = await fetch('tirjson.jsp');
  const tir = await response.json();

  for(var row=0; row<32; row++){
        var y=row*10;
        for(var col=0; col<24; col++){
            var x=(23-col)*10;
            var v = tir[col*32 + row];
            if (v < mint) v=mint;
            if (v > maxt) v=maxt;
            var p = (v-mint) * (255/(maxt-mint));
            ctx.fillStyle = 'rgb('+ p +',' + p +',' + p + ')';
            ctx.fillRect(x, y, 10, 10);
        }
    }
}
