<%@page import="minskyone.*,javax.json.*" language="java" contentType="text/html" %>


<html>
<head>
<style type="text/css">
canvas {
  border: 2px solid #000;
  position: absolute;
  left: 33%;
  margin-left: 10px;
}
</style>

<script type="text/javascript">

    var tir =
   <%
  String fltpath = Utils.getPath(request, "minsky.camera.tir.fltpath"); 
  String[] tir = TemperatureData.getData(fltpath);
  out.print("[" + String.join(",",tir) + "]");
   %> ;

   var mint = 12.0;
   var maxt = 25.0;

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

function draw(){
    for(var row=0; row<32; row++){
        y=row*10;
        for(var col=0; col<24; col++){
            x=(23-col)*10;
            var v = tir[col*32 + row];
            if (v < mint) v=mint;
            if (v > maxt) v=maxt;
            var p = (v-mint) * (255/maxt);
            ctx.fillStyle = 'rgb('+ p +',' + p +',' + p + ')';
            ctx.fillRect(x, y, 10, 10);
        }
      }
}
</script>
</head>

<body onload="main();" onkeydown="press(event);" onkeyup="release(event);">
<canvas id="canvas" width="240" height="320"></canvas>

</body>
</html>