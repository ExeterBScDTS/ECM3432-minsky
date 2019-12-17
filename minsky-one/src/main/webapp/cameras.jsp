<%@page import="java.security.Principal,minskyone.*"%>
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="bootstrap/4.1.3/css/bootstrap.min.css">
    <!-- Custom styles for this template -->
    <link href="bootstrap/starter-template.css" rel="stylesheet">

    <title>Minsky One</title>
  </head>
  <%
  String user = "Log In";
  Principal prin = request.getUserPrincipal();
  if(prin != null){
    user = prin.getName();
  }

  // Start the TIR camera
  String cmd1 = Utils.getParameter(request, "minsky.process.camera.tir");
  Processes.launch("minsky.process.camera.tir", cmd1);

  // Start the colour camera
  String cmd2 = Utils.getParameter(request, "minsky.process.camera.colour");
  Processes.launch("minsky.process.camera.colour", cmd2);
  
  %>
  <body>
      <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <a class="navbar-brand" href="#">Minsky One</a>
          <div class="collapse navbar-collapse justify-content-end" id="navbarsExampleDefault">
            <form class="form-inline my-2 my-lg-0" method="get" action="authorised">
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit"><%= user %></button>
            </form>
          </div>
        </nav>
        <main role="main" class="container">

            <div class="starter-template">
              <div>
                <img id="colour" src="camera/1/" width="256" height="192">
                <canvas id="canvas" width="240" height="320"></canvas>
                  <script type="module">
                    import {TIRCanvas} from "./js/minsky-tir.js";
                    TIRCanvas.main('#canvas');
                  </script>
             </div>
              <div>
                <canvas id="composite" width="640" height="480">
              </div>
              <span id="temp-val"></span>
              <div>
                  Set X [<span id="val-x"></span>]
                  <input type="range" id="range-x">
                  Set Y [<span id="val-y"></span>]
                  <input type="range" id="range-y">
                  Set scale [<span id="val-scale"></span>]
                  <input type="range" id="range-scale">
                </div>
              <a href="authorised/status.jsp">Sensor status</a>
            </div>
      
          </main>
          <script>
          function updateComposite(mov_x, mov_y, scale){
            var ctx = document.getElementById('composite').getContext('2d');
            var img = new Image();
            var colour = document.getElementById("colour");

            ctx.save();
            ctx.clearRect(0, 0, 640, 480);
            var s = 15 + (scale-50) / 20;
            ctx.scale(s, s);
            ctx.drawImage(thermal, mov_x/10.0, mov_y/10.0);
            ctx.restore();
            ctx.save();
            ctx.globalAlpha = 0.3;
            ctx.drawImage(colour, 0, 0);
            ctx.restore();
          }

          window.onload = function() {
            var thermal = document.getElementById("thermal");
            var colour = document.getElementById("colour");

            var range_x = document.getElementById("range-x");
            var val_x = document.getElementById("val-x");
            var shift_x = 69;

            range_x.onchange = function(e){
              val_x.innerHTML = e.target.value;
              shift_x = Number(e.target.value);
            }

            var range_y = document.getElementById("range-y");
            var val_y = document.getElementById("val-y");
            var shift_y = 20;

            range_y.onchange = function(e){
              val_y.innerHTML = e.target.value;
              shift_y = Number(e.target.value);
            }

            var range_scale = document.getElementById("range-scale");
            var val_scale = document.getElementById("val-scale");
            var tir_scale = 50;

            range_scale.onchange = function(e){
              val_scale.innerHTML = e.target.value;
              tir_scale = Number(e.target.value);
            }

            var request = new XMLHttpRequest();

            var temp_val = document.getElementById("temp-val");

            function updateTemperature() {
              request.open('GET', "tirjson.jsp");
              request.responseType = 'json';
              request.send();
              request.onload = function() {
                var tirdata = request.response;
                var centre_t = Number(tirdata[tirdata.length/2]).toFixed(1);
                temp_val.innerHTML = centre_t;
                //console.log(centre_t);
              }
            }

            setInterval(updateTemperature, 1000);
            
            function updateImages() {
                colour.src =  "camera" + "/1/" + new Date().getTime();
                //thermal.src =  "camera" + "/0/" + new Date().getTime();
                updateComposite(shift_x,shift_y,tir_scale);
            }
        
            setInterval(updateImages, 800);
        }
        </script>       
  </body>
</html>